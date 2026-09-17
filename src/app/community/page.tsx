import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { Section, SectionHead, Button, CtaBand } from "@/components/ui";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { site } from "@/data/site";
import { strands } from "@/data/community";
import { testimonials } from "@/data/home";

/* Community. The design brief's theme is "Grow Together" and its success test
   is emotional, not informational: a visitor should finish this page wanting
   in.

   Order. The gallery grid used to sit at the foot of this page and now has its
   own /gallery route. The section order below stays as it is - the client asked
   for it in its own right, not because of where the gallery sat:

     1. Masthead        four practitioners under a banyan. Adults, so no
                        consent question, and it is the one frame in the
                        library that reads as a group rather than a class.
     2. The strands     the seven things the brief names, as one mosaic.
     3. Stories         renders NOTHING while the testimonials are placeholder.
                        See the note above `stories`.
     4. Retreats
     5. How to join
     6. CtaBand

   Do not bring back the horizontal photo strip that used to tease /gallery from
   here. It showed the same photographs twice.

   Settled: the gallery keeps its own route, and this page hands off to it with
   a line and a link where the grid used to sit. She had asked for the grid
   itself at the end of this page - see docs/feedback - so mention the hand-off
   next time rather than moving the grid a third time.

   Grounds: linen -> mist -> sand -> linen, closing on the CtaBand. One mild
   green (mist), not a page that keeps falling into a dark panel (client,
   00:47:13). */

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

/* PLACEHOLDER - `testimonials` in src/data/home.ts is three stub objects
   waiting on the client, each of whose quote literally reads "Placeholder
   testimonial. Awaiting the real quotes from the client."

   WHAT FLIPS THE SECTION ON: replace those stub quotes in src/data/home.ts
   with the real ones. This filter then goes non-empty and the whole block
   below renders. Nothing else has to change here.

   Until then the section renders nothing at all - not a heading, not a
   waiting state. A heading over three admissions that there is nothing under
   it is worse than no section. */
const stories = testimonials.filter((t) => !t.quote.startsWith("Placeholder"));

/* Only the categories that hold photographs are offered. The data file
   declares all nine the brief names; the client has still sent no Corporate
   and no Retreats frames, so those two carry a count of 0. They reappear on
   their own the day the pictures arrive. A filter button that opens on an
   empty grid is worse than no button. */
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
                  <h3 className="t-h3 text-moss">{s.name}</h3>
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

        {/* STUDENT STORIES - the whole section is behind the guard, so while
            the quotes are placeholder this page renders no trace of it. See
            the note above `stories` for what turns it on. */}
        {stories.length > 0 ? (
          <Section className="tex tex-stone bg-sand/45 py-24 md:py-32">
            <SectionHead
              eyebrow="Student stories"
              title="What people say once they have been coming a while"
              align="centre"
            />
            <div className="mt-16 grid gap-px bg-ink/15 md:grid-cols-2">
              {stories.map((t) => (
                <figure
                  key={t.quote}
                  className="flex flex-col justify-between gap-8 bg-linen p-10 md:p-14"
                >
                  <blockquote className="t-quote text-moss">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="text-[0.9rem] text-ink/75">
                    <span className="label block text-[0.7rem] text-moss">{t.name}</span>
                    <span className="mt-2 block">{t.context}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Section>
        ) : null}

        {/* RETREAT MEMORIES - the quiet block. Was a full-bleed moss panel with
            linen type; it is mist now, because the client could not tell
            whether the site was pale green or dark green (00:46:22). Every
            child that assumed a dark ground was re-toned with it. */}
        <section className="bg-mist-pale py-24 md:py-32">
          <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 md:px-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <div data-reveal>
              <p className="eyebrow">Retreat memories</p>
              <h2 className="t-h2 mt-5 text-moss">
                What people remember is rarely the practice
              </h2>
              <div className="mt-8 max-w-[54ch] space-y-6 leading-relaxed text-ink/80">
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
                <Button href="/workshops">Retreats and workshops</Button>
              </div>
            </div>

            <div className="relative" data-reveal>
              {/* A9 - the source frame carries ~19% of rafters above the room
                  and ~14% of bare floor below it. Square crop held low
                  (object-position 58%) drops both without touching either
                  face. */}
              <img
                src="/media/gallery/teaching-04.webp"
                alt="A teacher assists a student into a supported bow pose on a purple mat inside a wooden, thatch-roofed pavilion."
                width={1500}
                height={2000}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover object-[50%_58%]"
              />
              {/* The small frame overlaps the large one from below left, the
                  offset pair the reference site uses. Hidden below sm: at phone
                  width it lands on top of the main image rather than beside it,
                  and the container has no room to hold it clear. The border is
                  the section ground, so it reads as a cut-out, not a frame. */}
              <img
                src="/media/thumb/community-06.webp"
                alt="Two Buddhist monks in maroon robes stand with two guests beside a golden Buddha statue in a bright, minimal room."
                width={760}
                height={1350}
                loading="lazy"
                decoding="async"
                className="absolute -bottom-10 -left-10 hidden w-[38%] border-4 border-mist object-cover sm:block"
              />
            </div>
          </div>
        </section>

        {/* HOW TO JOIN */}
        <Section className="tex tex-stone bg-sand/45 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center" data-reveal>
            <p className="eyebrow">How to join</p>
            {/* The one data-lines heading on this page. Plain text child only -
                the attribute replaces the element's content. */}
            <h2 data-lines className="t-h2 mt-5 text-moss">
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

        {/* The gallery used to be the end of this page and now has its own
            route. This is the hand-off, in the place the grid used to sit: a
            reader who has got this far is browsing, which is exactly who the
            photographs are for. One line and one link, not a photo strip - a
            strip here showed the same pictures twice. */}
        <Section className="pb-24 pt-4 text-center md:pb-32 md:pt-6">
          <p className="t-statement mx-auto max-w-[24ch] text-moss">
            The practice, as it actually looks.
          </p>
          <Link href="/gallery" className="link mt-6 inline-block py-3">
            See the gallery
          </Link>
        </Section>

        <CtaBand
          eyebrow="Grow together"
          title="Come to the next one"
          body="Walks, runs, the book club and volunteer sessions are open to anybody. Tell us which one you would like to hear about and we will let you know when it is on."
          primary={{ href: "/contact", label: "Get in touch" }}
          secondary={{ href: "/workshops", label: "See Workshops" }}
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
