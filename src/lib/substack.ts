import { fallbackPosts, type Post } from "@/data/journal";

/* The Journal reads her Substack.

   She already writes at rawonearth.substack.com and the brief says new
   articles must be "easy to upload". Mirroring the feed means she publishes
   the way she already publishes and this site grows on its own. The handover
   recommends it for launch; MDX in the repo is the escape hatch if she later
   wants the SEO on her own domain. Either answer is one file away - swap what
   getPosts() returns, the page does not care.

   Two decisions that are not taste:

   - `cache: "force-cache"` so the fetch resolves once at BUILD time and the
     built site never makes a runtime request. Production is Hostinger Web
     Apps, not Vercel: no ISR, no revalidation, no runtime fetch budget. New
     posts appear on the next deploy.

   - It must never break the build. Hostinger may build without outbound
     network access, and Substack is a third party that can be slow or down.
     So: a 6s timeout, try/catch around the fetch AND the parse, and the
     static topic cards from src/data/journal.ts on any failure. A build that
     fails because somebody else's server is slow is not acceptable.

   ponytail: regex parser, not an XML library. This reads one known feed with
   a known shape, and a dependency for it would have to be audited and kept.
   Ceiling: it assumes well-formed Substack RSS. If the feed ever needs real
   XML handling, that is the moment to add a parser - not before. */

const FEED_URL = "https://rawonearth.substack.com/feed";
const EXCERPT_MAX = 200;

/** Named entities Substack actually emits, plus numeric escapes. */
function decodeEntities(input: string): string {
  return input
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&(?:quot|#34);/g, '"')
    .replace(/&(?:apos|#39);/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    // Ampersand last, or "&amp;lt;" would decode twice.
    .replace(/&amp;/g, "&");
}

/** Inner text of the first <tag> in `xml`, CDATA unwrapped and decoded. */
function tag(xml: string, name: string): string {
  const match = new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`).exec(xml);
  if (!match) return "";
  const raw = match[1].trim();
  const cdata = /^<!\[CDATA\[([\s\S]*?)\]\]>$/.exec(raw);
  return decodeEntities((cdata ? cdata[1] : raw).trim());
}

function toExcerpt(html: string): string {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= EXCERPT_MAX) return text;
  const cut = text.slice(0, EXCERPT_MAX);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 60 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:\-\s]+$/, "")}…`;
}

function toIso(pubDate: string): string | null {
  const time = Date.parse(pubDate);
  return Number.isNaN(time) ? null : new Date(time).toISOString();
}

function parseFeed(xml: string): Post[] {
  return xml
    .split("<item>")
    .slice(1)
    .map((chunk): Post | null => {
      const item = chunk.split("</item>")[0];
      const title = tag(item, "title");
      const url = tag(item, "link");
      if (!title || !url) return null;

      const body = tag(item, "content:encoded");
      const summary = tag(item, "description");
      // Substack's <description> is the post subtitle - a better standfirst
      // than the first 200 characters of the article. Fall back to the body.
      const excerpt = toExcerpt(summary || body);

      // Only an image inside the article body. The <enclosure> on a Substack
      // item is the publication's avatar, not the post's picture.
      const image = /<img[^>]+src\s*=\s*["']([^"']+)["']/i.exec(body)?.[1] ?? null;

      return { title, url, date: toIso(tag(item, "pubDate")), excerpt, image };
    })
    .filter((post): post is Post => post !== null);
}

export async function getPosts(): Promise<Post[]> {
  try {
    const response = await fetch(FEED_URL, {
      cache: "force-cache",
      signal: AbortSignal.timeout(6000),
    });
    if (!response.ok) return fallbackPosts;
    const posts = parseFeed(await response.text());
    return posts.length > 0 ? posts : fallbackPosts;
  } catch {
    // Offline build, timeout, or a feed shape this parser does not understand.
    return fallbackPosts;
  }
}
