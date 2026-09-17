import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { Section, SectionHead, Button, CtaBand } from "@/components/ui";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { site } from "@/data/site";
import { strands } from "@/data/community";
import { testimonials } from "@/data/home";

/* Community. "Grow Together" theme.

   Section order:
     1. Hero           gallery-style: full-bleed group photo, linen gradient
                       overlay, large display heading in moss — same visual
                       language as /gallery.
     2. The strands    seven photo cards in a 3-column grid. Each card shows
                       the photograph at ~70 % opacity behind a light linen
                       frosted ground, so the image reads without obscuring
                       the text. Title and cadence line are in moss/ink.
     3. Stories        hidden while testimonials are placeholder.
     4. Retreats
     5. How to join
     6. CtaBand                                                            */

export const metadata: Metadata = pageMeta({
  title: "Community",
  description:
    "Nature walks, a running club, a book club, volunteer teaching, retreats and community events with Raw On Earth. No membership, and no fee to turn up.",
  path: "/community",
});

const stories = testimonials.filter((t) => !t.quote.startsWith("Placeholder"));

export default function CommunityPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">

        {/* ── HERO — gallery style ─────────────────────────────────────────
            Park/greenery photograph (community-03: group on mats under a
            banyan tree) at opacity-80 with a linen gradient overlay.
            Same construction as GallerySection.tsx.                     */}
        <div className="relative bg-linen text-moss overflow-hidden flex flex-col items-center justify-center">
          {/* Background image — lush green park shot */}
          <div className="absolute inset-0 z-0">
            <img
              src="/media/gallery/community-03.webp"
              alt="A small group of practitioners doing yoga on colourful mats in an open park under a massive spreading banyan tree."
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover object-center"
            />
            {/* Linen gradient — same as gallery hero. Heavier at the top so
                the header bar area reads clearly even before scroll.      */}
            <div className="absolute inset-0 bg-gradient-to-b from-linen/80 via-linen/75 to-linen" />
          </div>

          {/* Text — same structure and spacing as gallery hero */}
          <div className="relative z-10 max-w-[1280px] mx-auto w-full text-left px-6 pt-40 pb-24 md:px-10 lg:px-20 xl:px-32 md:pt-52 md:pb-32">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-6 h-px bg-moss/40" />
              <p className="eyebrow tracking-widest text-sm uppercase">Community</p>
            </div>
            <h1 className="font-display text-[4rem] md:text-[6rem] lg:text-[7rem] font-light leading-tight text-moss mb-8">
              Grow together
            </h1>
            <p className="t-body text-ink/80 max-w-md text-lg md:text-xl font-light leading-relaxed">
              A practice is easier to keep when somebody else is expecting
              you. This is the part of Raw On Earth that happens off the mat.
            </p>
          </div>
        </div>

        {/* ── THE STRANDS — 7 photo cards, light treatment ────────────────
            Each card shows the photograph behind a light linen/sand frosted
            overlay so the image is visible but the dark moss/ink text on top
            is easy to read. The card surface reads as pale, the photograph
            shows through as texture and mood.

            Layout: 3 columns on large screens, 2 on medium, 1 on mobile.
            The 7th card spans full width so the last row is never half-empty.
            Hover lifts the card slightly and dims the overlay a little so the
            photo brightens underneath.                                    */}
        <Section className="py-24 md:py-32">
          <SectionHead
            eyebrow="Grow together"
            title="Seven things that keep going"
            standfirst="None of these are classes. Nobody signs up, nobody registers, and nobody minds if you miss three in a row and come back."
          />

          <ul
            className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            data-reveal-stagger
          >
            {strands.map((s, i) => {
              const isLast = i === strands.length - 1;
              return (
                <li
                  key={s.slug}
                  id={s.slug}
                  className={`group relative overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-md${
                    isLast ? " sm:col-span-2 lg:col-span-3" : ""
                  }`}
                >
                  {/* Photo — shown at reduced opacity so it reads as a
                      textured wash beneath the light frosted overlay     */}
                  {s.image && (
                    <img
                      src={s.image.src}
                      alt={s.image.alt}
                      width={s.image.width}
                      height={s.image.height}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}

                  {/* Light linen/sand frosted overlay — sits above the photo
                      and below the text. Opacity eases back a little on hover
                      so the image brightens subtly without losing readability.
                      Bottom-to-top gradient keeps the cadence line legible.  */}
                  <div className="absolute inset-0 bg-gradient-to-b from-linen/82 via-linen/78 to-sand/80 transition-opacity duration-500 group-hover:opacity-90" />

                  {/* Card text — moss headings, ink body, all on the pale ground */}
                  <div
                    className={`relative flex flex-col p-8 md:p-10${
                      isLast
                        ? " min-h-[300px] lg:flex-row lg:items-start lg:gap-16 lg:min-h-[320px]"
                        : " min-h-[340px]"
                    }`}
                  >
                    {/* Main block */}
                    <div className={`flex flex-col h-full${isLast ? " lg:max-w-2xl" : ""}`}>
                      <h3 className="font-display text-[1.65rem] font-light leading-tight text-moss md:text-[2rem]">
                        {s.name}
                      </h3>
                      <p className="mt-3 max-w-[50ch] flex-1 text-[0.92rem] leading-relaxed text-ink/80">
                        {s.summary}
                      </p>
                      <p className="mt-6 border-t border-ink/15 pt-4 text-[0.76rem] uppercase tracking-widest text-ink/55">
                        {s.cadence}
                      </p>
                    </div>

                    {/* Wide last card: subtle number badge */}
                    {isLast && (
                      <span
                        aria-hidden
                        className="hidden lg:block shrink-0 self-end font-display text-[6rem] font-light leading-none text-moss/8 select-none"
                      >
                        07
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </Section>

        {/* STUDENT STORIES — hidden while testimonials are placeholder */}
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

        {/* RETREAT MEMORIES */}
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
              <img
                src="/media/gallery/teaching-04.webp"
                alt="A teacher assists a student into a supported bow pose on a purple mat inside a wooden, thatch-roofed pavilion."
                width={1500}
                height={2000}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover object-[50%_58%]"
              />
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

        {/* Gallery hand-off */}
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
