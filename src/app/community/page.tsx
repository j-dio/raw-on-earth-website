import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { Section, SectionHead, LeafRule, Button, CtaBand } from "@/components/ui";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { site } from "@/data/site";
import { strands, snaps } from "@/data/community";
import { testimonials } from "@/data/home";

/* Community. The design brief's theme is "Grow Together" and its success test
   is emotional, not informational: a visitor should finish this page wanting
   in. So the page is built round the three things a brochure page usually
   skips - faces, a cadence you can actually turn up to, and a way in that
   costs nothing.

   Order:

     1. Masthead        four practitioners under a banyan. Adults, so no
                        consent question, and it is the one frame in the
                        library that reads as a group rather than a class.
     2. The strands     the seven things the brief names, as one mosaic. Not
                        seven equal cards: the ones with a photograph run
                        larger, which is also the honest hierarchy - those are
                        the ones we can show actually happen.
     3. Stories         PLACEHOLDER. See the section comment: no real
                        testimonials exist yet and none are invented here.
     4. Photo strip     a horizontal scroll of community frames, into /gallery.
     5. Retreats        the one quiet dark block on the page.
     6. How to join     the low-friction close. WhatsApp, Instagram, contact.
     7. CtaBand         community-flavoured, not the default booking line.

   Grounds alternate linen -> sand -> linen -> moss -> linen -> moss, so the
   page has a pulse and no two tinted bands touch. Three moving ideas: the
   masthead push-in (PageHero), the staggered strand grid, and a slow drift on
   alternate photo tiles. */

export const metadata: Metadata = pageMeta({
  title: "Community",
  description:
    "Nature walks, a running club, a book club, volunteer teaching, retreats and community events with Raw On Earth. No membership, and no fee to turn up.",
  path: "/community",
});

/* Layout, not content, so it lives here rather than in the data file.

   The spans MUST tile the grid exactly, on both the two-column and the
   six-column arrangement. The `<ul>` is `bg-ink/15` showing through a 1px gap,
   so any track the items fail to fill does not read as white space - it reads
   as a grey rectangle. An earlier set of spans summed to 3.5 rows and printed
   two of them.

   Six-column rows: 2+4, 2+2+2, 3+3. Two-column rows: three pairs, then the
   last strand across both. Photographed strands sit with photographed
   neighbours (src/data/community.ts is ordered to match) so a text-only panel
   is never stretched to the height of an image beside it.

   Move a strand in the data file and the spans here have to move with it. */
const SPAN: Record<string, string> = {
  "nature-walks": "lg:col-span-2",
  "volunteer-work": "lg:col-span-4",
  "running-club": "lg:col-span-2",
  "book-club": "lg:col-span-2",
  donations: "lg:col-span-2",
  retreats: "lg:col-span-3",
  /* Seventh of seven: full width at two columns, or the row is half empty. */
  "community-events": "sm:col-span-2 lg:col-span-3",
};

/* PLACEHOLDER - the `testimonials` array in src/data/home.ts is three stub
   objects waiting on the client ("RJ to share"). Rather than print
   "Placeholder testimonial." at 3rem on a public page, or invent a quote and
   attach a person's name to it, the section renders an honest waiting state
   and asks the reader for theirs. When the real quotes replace the stubs in
   home.ts this filter goes non-empty and the pull-quote treatment below turns
   on with no further edit here. */
const stories = testimonials.filter((t) => !t.quote.startsWith("Placeholder"));

export default function CommunityPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow="Community"
          title="Grow together"
          standfirst="A practice is easier to keep when somebody else is expecting you. This is the part of Raw On Earth that happens off the mat."
          figure={{
            src: "/media/hero/community.webp",
            alt: "Four practitioners kneel on mats in child's pose and cat-cow stretches under a sprawling banyan tree in a park.",
            width: 2400,
            height: 1030,
          }}
        />

        {/* THE STRANDS */}
        <Section className="py-24 md:py-32">
          <SectionHead
            eyebrow="Grow together"
            title="Seven things that keep going"
            standfirst="None of these are classes. Nobody signs up, nobody registers, and nobody minds if you miss three in a row and come back."
          />

          {/* gap-px over a dark parent draws the hairline grid - the same
              construction the Offerings block on Home uses, so the two pages
              share a mark rather than inventing two. Rows size to their own
              content: forcing them equal (auto-rows-fr) left a text-only panel
              carrying ~280px of nothing above its cadence line. */}
          <ul
            className="mt-16 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-6"
            data-reveal-stagger
          >
            {strands.map((s) => (
              <li key={s.slug} id={s.slug} className={`flex flex-col bg-linen ${SPAN[s.slug] ?? ""}`}>
                {s.image ? (
                  <img
                    src={s.image.src}
                    alt={s.image.alt}
                    width={s.image.width}
                    height={s.image.height}
                    loading="lazy"
                    decoding="async"
                    className="h-56 w-full object-cover lg:h-64"
                  />
                ) : null}
                <div className="flex flex-1 flex-col p-8 md:p-10">
                  <h3 className="font-display text-[1.6rem] font-light leading-tight text-moss md:text-[2rem]">
                    {s.name}
                  </h3>
                  <p className="mt-4 max-w-[46ch] flex-1 leading-relaxed text-ink/80">{s.summary}</p>
                  {/* Cadence, set apart from the description because it is the
                      line a reader scans for. It says where a date will appear,
                      not what the date is - see the PLACEHOLDER note in the
                      data file. */}
                  <p className="mt-6 border-t border-ink/15 pt-4 text-[0.82rem] leading-relaxed text-ink/70">
                    {s.cadence}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        {/* STUDENT STORIES - see the PLACEHOLDER note above `stories`.
            About renders the same testimonials as a quiet stacked list; here
            they are large pull quotes on a tinted band, so the two pages do not
            read as the same component twice. */}
        <Section className="tex tex-stone bg-sand/45 py-24 md:py-32">
          <SectionHead
            eyebrow="Student stories"
            title="What people say once they have been coming a while"
            align="centre"
          />

          {stories.length > 0 ? (
            <div className="mt-16 grid gap-px bg-ink/15 md:grid-cols-2">
              {stories.map((t) => (
                <figure
                  key={t.quote}
                  className="flex flex-col justify-between gap-8 bg-linen p-10 md:p-14"
                >
                  <blockquote className="font-display text-[1.7rem] font-light italic leading-[1.3] text-moss md:text-[2.2rem]">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="text-[0.9rem] text-ink/75">
                    <span className="label block text-[0.7rem] text-moss">{t.name}</span>
                    <span className="mt-2 block">{t.context}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className="mx-auto mt-14 max-w-[54ch] text-center" data-reveal>
              <LeafRule className="mx-auto max-w-xs" />
              <p className="mt-10 font-display text-[1.6rem] font-light italic leading-snug text-balance text-moss md:text-[2rem]">
                We are collecting these properly rather than writing them ourselves.
              </p>
              <p className="mt-6 leading-relaxed text-ink/80">
                If you have practised with us, online or in Bangalore, we would like to
                hear how it went - the honest version. Send it on WhatsApp and it may
                appear here, with your name or without it, whichever you prefer.
              </p>
              <div className="mt-10 flex justify-center">
                <Button href={site.whatsapp} external>
                  Send yours on WhatsApp
                </Button>
              </div>
            </div>
          )}
        </Section>

        {/* PHOTO STRIP - horizontal scroll, so a wide band of photographs costs
            one screen of height rather than five. A real overflow container
            with scroll-snap works with a trackpad and a thumb; `tabIndex={0}`
            is what gives a keyboard user the scroll, and the group is named so
            a screen reader announces what it is.

            The drift is on alternate tiles only. Six moving photographs would
            be a carousel; three slow ones are a band that breathes. */}
        <section className="overflow-hidden py-24 md:py-32" aria-labelledby="snaps-head">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
              <div className="max-w-2xl">
                <p className="eyebrow">In the room</p>
                <h2
                  id="snaps-head"
                  className="mt-5 font-display text-[clamp(2.1rem,4.4vw,3.4rem)] font-light leading-[1.06] text-balance text-moss"
                >
                  Group photographs, mostly unposed
                </h2>
              </div>
              {/* py-3/-mb-3: a 14px label is a 19px tap target. The padding
                  takes it to ~43px and the negative margin cancels the visual
                  shift, so it still sits on the heading's bottom edge. */}
              <Link
                href="/gallery"
                className="link label -mb-3 py-3 text-[0.72rem] whitespace-nowrap"
              >
                See the full gallery
              </Link>
            </div>
          </div>

          {/* scroll-pl matches the horizontal padding. Without it a mandatory
              snap aligns the first tile to the scrollport edge, not to the
              padding edge, so the browser scrolls the gutter away on load and
              the strip lands flush against the viewport, looking clipped. */}
          <div
            tabIndex={0}
            role="group"
            aria-label="Community photographs, scroll sideways"
            className="mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-6 px-6 pb-6 md:gap-6 md:scroll-pl-10 md:px-10"
          >
            {snaps.map((s, i) => (
              <figure
                key={s.src}
                {...(i % 2 === 1 ? { "data-parallax": "40" } : {})}
                className="w-[76vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw] xl:w-[24vw]"
              >
                <img
                  src={s.src}
                  alt={s.alt}
                  width={s.width}
                  height={s.height}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
                <figcaption className="mt-4 text-[0.82rem] leading-relaxed text-ink/70">
                  {s.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* RETREAT MEMORIES - the quiet block. One dark panel, one large frame
            and one small offset one. No grid, because this section is a pause
            between two grids. */}
        <section className="bg-moss py-24 text-linen md:py-32">
          <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 md:px-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <div data-reveal>
              <p className="eyebrow !text-sage">Retreat memories</p>
              <h2 className="mt-5 font-display text-[clamp(2.1rem,4.4vw,3.4rem)] font-light leading-[1.06] text-balance text-linen">
                What people remember is rarely the practice
              </h2>
              <div className="mt-8 max-w-[54ch] space-y-6 leading-relaxed text-linen/75">
                <p>
                  It is the walk to breakfast, the person you sat next to without
                  planning to, the afternoon nobody filled. The sessions hold the days
                  together, but the days are the point.
                </p>
                <p>
                  Retreats have run in thatched pavilions and in borrowed halls, in the
                  hills and closer to home. Each one is put together for the people who
                  are coming, so no two have been the same.
                </p>
              </div>
              <div className="mt-10">
                <Button href="/workshops" variant="light">
                  Retreats and workshops
                </Button>
              </div>
            </div>

            <div className="relative" data-reveal>
              <img
                src="/media/gallery/teaching-04.webp"
                alt="A teacher assists a student into a supported bow pose on a purple mat inside a wooden, thatch-roofed pavilion."
                width={1500}
                height={2000}
                loading="lazy"
                decoding="async"
                className="aspect-[3/4] w-full object-cover"
              />
              {/* The small frame overlaps the large one from below left, the
                  offset pair the reference site uses. Hidden below sm: at phone
                  width it lands on top of the main image rather than beside it,
                  and the container has no room to hold it clear. */}
              <img
                src="/media/thumb/community-06.webp"
                alt="Two Buddhist monks in maroon robes stand with two guests beside a golden Buddha statue in a bright, minimal room."
                width={760}
                height={1350}
                loading="lazy"
                decoding="async"
                className="absolute -bottom-10 -left-10 hidden w-[38%] border-4 border-moss object-cover sm:block"
              />
            </div>
          </div>
        </section>

        {/* HOW TO JOIN */}
        <Section className="py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center" data-reveal>
            <p className="eyebrow">How to join</p>
            {/* The one data-lines heading on this page. Plain text child only -
                the attribute replaces the element's content. */}
            <h2
              data-lines
              className="mt-5 font-display text-[clamp(2.1rem,4.4vw,3.4rem)] font-light leading-[1.06] text-balance text-moss"
            >
              You turn up. That is the whole process.
            </h2>
            <p className="mx-auto mt-6 max-w-[54ch] leading-relaxed text-ink/80">
              There is no membership and no fee to come on a walk, to a run, or to the
              book club. Ask where and when, then come. Paid classes and retreats are a
              separate thing, and they live on the other pages.
            </p>
          </div>

          <ul className="mx-auto mt-16 grid max-w-4xl gap-px bg-ink/15 sm:grid-cols-3" data-reveal-stagger>
            <li className="bg-linen p-8 text-center">
              <h3 className="label text-[0.72rem] text-moss">WhatsApp</h3>
              <p className="mt-4 text-[0.92rem] leading-relaxed text-ink/75">
                The fastest way in. Ask about the next walk and you will be told.
              </p>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="link mt-2 inline-block py-3 text-[0.92rem]"
              >
                Message on WhatsApp
              </a>
            </li>
            <li className="bg-linen p-8 text-center">
              <h3 className="label text-[0.72rem] text-moss">Instagram</h3>
              <p className="mt-4 text-[0.92rem] leading-relaxed text-ink/75">
                Where dates and meeting points are announced first.
              </p>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="link mt-2 inline-block py-3 text-[0.92rem]"
              >
                Follow on Instagram
              </a>
            </li>
            <li className="bg-linen p-8 text-center">
              <h3 className="label text-[0.72rem] text-moss">Write to us</h3>
              <p className="mt-4 text-[0.92rem] leading-relaxed text-ink/75">
                For volunteering, donations, or bringing a session to your group.
              </p>
              <Link href="/contact" className="link mt-2 inline-block py-3 text-[0.92rem]">
                Use the contact form
              </Link>
            </li>
          </ul>
        </Section>

        <CtaBand
          eyebrow="Grow together"
          title="Come to the next one"
          body="Walks, runs, the book club and volunteer sessions are open to anybody. Tell us which one you would like to hear about and we will let you know when it is on."
          primary={{ href: "/contact", label: "Get in touch" }}
          secondary={{ href: "/gallery", label: "See the gallery" }}
        />
      </main>
      <SiteFooter />
      <JsonLd
        data={[
          breadcrumbLd([{ name: "Community", path: "/community" }]),
          /* An ItemList of the strands, and nothing else. No Event objects -
             not one date exists. No AggregateRating and no member count -
             nobody has counted, and a schema is not the place to guess. */
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Raw On Earth community",
            description:
              "The regular community strands of Raw On Earth: nature walks, running club, book club, volunteer work, donations, retreats and community events.",
            itemListOrder: "https://schema.org/ItemListUnordered",
            numberOfItems: strands.length,
            itemListElement: strands.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.name,
              description: s.summary,
              url: `${site.url}/community#${s.slug}`,
            })),
          },
        ]}
      />
    </>
  );
}
