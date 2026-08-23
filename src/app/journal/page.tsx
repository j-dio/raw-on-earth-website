import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { Section, SectionHead, LeafRule, Button, CtaBand } from "@/components/ui";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { getPosts } from "@/lib/substack";
import { topics, type Post } from "@/data/journal";
import { site } from "@/data/site";

/* Journal. The design brief calls it "the strongest long-term asset of the
   website", so it is the most important page after Home.

   Where the posts come from: her Substack RSS, read once at build time
   (src/lib/substack.ts). If that fetch fails the page falls back to topic
   cards - subjects, not invented articles - and says plainly that the writing
   lives on Substack. Either way nothing on this page pretends to be an
   article she did not write.

   Shape: one lead post given a full editorial spread, then a hairline list,
   then the subjects, then a short honest band about where the writing lives.
   Every link out is target="_blank" and says so in the visible text - a
   visitor should never be surprised by a new tab. */

export const metadata: Metadata = pageMeta({
  title: "Journal",
  description:
    "Essays by Rajalakshmi V on mindfulness, human behaviour, conscious living, slow living, stress and the breath. Read the latest here, in full on Substack.",
  path: "/journal",
});

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function PostDate({ iso, className = "" }: { iso: string; className?: string }) {
  return (
    <time dateTime={iso} className={`label ${className}`}>
      {dateFormat.format(new Date(iso))}
    </time>
  );
}

/* The one link pattern on this page. The accessible name is the post title
   plus "Read on Substack", so the destination is clear from the link alone
   and from the visible text. */
function PostLink({ post, children }: { post: Post; children: React.ReactNode }) {
  return (
    <a href={post.url} target="_blank" rel="noreferrer noopener" className="group block">
      {children}
      <span className="label mt-5 inline-flex items-center gap-2 text-moss transition-colors group-hover:text-gold">
        Read on Substack
        <span aria-hidden>↗</span>
      </span>
    </a>
  );
}

export default async function JournalPage() {
  const posts = await getPosts();
  /* Topic cards are not articles: they get their own quieter treatment and are
     kept out of the Blog schema entirely. */
  const articles = posts.filter((post) => !post.placeholder);
  const [lead, ...rest] = articles;

  return (
    <>
      <SiteHeader />

      <main id="main">
        <PageHero
          eyebrow="Journal"
          title="Notes from the practice"
          standfirst="Short essays on the things a practice keeps turning up: attention, habit, stress, and the breath underneath all of it."
          figure={{
            src: "/media/gallery/raji-28.webp",
            alt: "A practitioner sits in padmasana with eyes closed on a woven mat, surrounded by dry autumn leaves and forest trees.",
            width: 1500,
            height: 2666,
          }}
        />

        {lead ? (
          /* THE LEAD - the newest piece, and the page's one big move. */
          <Section className="bg-linen py-24 md:py-32">
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7" data-reveal>
                <p className="eyebrow">Latest</p>
                <PostLink post={lead}>
                  <h2 className="mt-5 font-display text-[clamp(2.4rem,5.2vw,4rem)] font-light leading-[1.03] text-balance text-moss">
                    {lead.title}
                  </h2>
                  {lead.date ? <PostDate iso={lead.date} className="mt-6 block text-ink/70" /> : null}
                  <span className="mt-6 block max-w-[52ch] leading-[1.75] text-ink/80">
                    {lead.excerpt}
                  </span>
                </PostLink>
              </div>

              <figure className="lg:col-span-5" data-reveal>
                {lead.image ? (
                  /* A feed image, so its real dimensions are unknown at build
                     time. The fixed aspect box reserves the space instead, which
                     is what width/height would have bought us. */
                  <div className="aspect-[4/5] overflow-hidden bg-sand/60">
                    <img
                      src={lead.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <img
                    src="/media/gallery/meditation-01.webp"
                    alt="Crossed bare feet rest beneath an open yoga anatomy book, lit by a warm shaft of afternoon sun on a tiled floor."
                    width={1500}
                    height={2666}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/5] w-full object-cover"
                  />
                )}
              </figure>
            </div>
          </Section>
        ) : (
          /* HONEST EMPTY STATE. Reached when the feed could not be read at
             build time, or when there is nothing published yet. It says so
             rather than showing an empty grid. */
          <Section className="bg-linen py-24 md:py-32">
            <SectionHead
              eyebrow="The writing"
              title="The full journal lives on Substack"
              standfirst="Her posts are not listed here at the moment. They are all on Substack, where she writes, and the list here fills in again at the next update of the site."
            />
            <div className="mt-10">
              <Button href={site.social.substack} external>
                Read the journal on Substack
              </Button>
            </div>
          </Section>
        )}

        {rest.length > 0 ? (
          /* THE REST - one hairline row per piece. Date, title, one line. */
          <Section className="tex tex-stone bg-sand/45 py-24 md:py-32">
            <SectionHead eyebrow="More writing" title="Earlier pieces" />
            <ul className="mt-14 border-t border-ink/15" data-reveal-stagger>
              {rest.map((post) => (
                <li key={post.url} className="border-b border-ink/15">
                  <PostLink post={post}>
                    <div className="grid gap-4 py-10 md:grid-cols-12 md:gap-10">
                      <div className="md:col-span-3">
                        {post.date ? <PostDate iso={post.date} className="text-ink/70" /> : null}
                      </div>
                      <div className="md:col-span-9">
                        <h3 className="font-display text-[1.6rem] font-light leading-tight text-moss md:text-[2rem]">
                          {post.title}
                        </h3>
                        <span className="mt-3 block max-w-[62ch] leading-relaxed text-ink/75">
                          {post.excerpt}
                        </span>
                      </div>
                    </div>
                  </PostLink>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {/* BROWSE BY SUBJECT - the seven subjects the brief names. */}
        <Section className="bg-linen py-24 md:py-32">
          <SectionHead
            eyebrow="Browse by subject"
            title="What she writes about"
            standfirst="Seven threads run through the journal. They overlap, because in practice they are the same subject looked at from different sides."
          />
          <LeafRule className="mt-14" />
          <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" data-reveal-stagger>
            {topics.map((topic) => (
              <li key={topic.name} className="border-t border-ink/15 pt-6">
                <h3 className="font-display text-[1.6rem] font-light leading-tight text-moss">
                  {topic.name}
                </h3>
                <p className="mt-3 max-w-[38ch] leading-relaxed text-ink/75">{topic.blurb}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* WHERE IT LIVES - said plainly, once. No email capture form: nothing
            on this site is wired up to send email, and a box that silently
            does nothing is worse than no box. */}
        <Section className="bg-moss py-20 text-linen md:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end" data-reveal>
            <div className="lg:col-span-7">
              <p className="eyebrow !text-sand">Where it lives</p>
              <h2 className="mt-5 font-display text-[clamp(2.1rem,4.4vw,3.4rem)] font-light leading-[1.06] text-balance">
                Published on Substack
              </h2>
              <p className="mt-6 max-w-[52ch] leading-relaxed text-linen/75">
                Every piece opens on Substack in a new tab, where you can read it in full and
                subscribe if you would like the next one by email. Subscriptions are handled
                there, not here.
              </p>
            </div>
            <div className="lg:col-span-5 lg:justify-self-end">
              <Button href={site.social.substack} variant="linen" external>
                Subscribe on Substack
              </Button>
            </div>
          </div>
        </Section>

        <CtaBand
          eyebrow="Keep reading"
          title="Words are one half of it"
          body="The other half happens on the mat. If something here landed, come and practise."
          primary={{ href: site.social.substack, label: "Read on Substack", external: true }}
          secondary={{ href: "/contact", label: "Get in touch" }}
        />
      </main>

      <SiteFooter />

      <JsonLd
        data={[
          breadcrumbLd([{ name: "Journal", path: "/journal" }]),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": `${site.url}/journal#blog`,
            name: `${site.name} Journal`,
            url: `${site.url}/journal`,
            description:
              "Essays on mindfulness, human behaviour, conscious living, wellness, slow living, stress and the breath.",
            inLanguage: "en-GB",
            publisher: { "@id": `${site.url}#business` },
            author: { "@id": `${site.url}#founder` },
            /* Only real posts are described as posts. If the feed could not be
               read, the Blog object is emitted without any - the topic cards on
               the page are subjects, not articles. */
            ...(articles.length > 0
              ? {
                  blogPost: articles.map((post) => ({
                    "@type": "BlogPosting",
                    headline: post.title,
                    url: post.url,
                    ...(post.date ? { datePublished: post.date } : {}),
                    author: { "@id": `${site.url}#founder` },
                  })),
                }
              : {}),
          },
        ]}
      />
    </>
  );
}
