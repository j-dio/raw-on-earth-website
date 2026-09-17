import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import ClassFinder from "@/components/ClassFinder";
import { Section, SectionHead, LeafRule, Button, CtaBand } from "@/components/ui";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { stats } from "@/data/home";
import { workshops, pastFormats, kindLabels, modeLabels } from "@/data/workshops";
import { site } from "@/data/site";

/* Workshops.

   Redesigned 2026-09-17: gallery-style hero with background photo, then the
   content is organised in a clean card grid layout (matching the home-page
   Offerings block) instead of scattered image-text pairs.

   The awkward fact this page is built around: NOT ONE date, price, venue or
   registration link has been supplied. So the page never prints one. Every
   card says "Dates announced soon" and every CTA goes to the contact page. */

export const metadata: Metadata = pageMeta({
  title: "Workshops",
  description:
    "Regular yoga classes, one-to-one sessions, day workshops, immersions and retreats with Rajalakshmi V, online and in Bangalore, and for organisations.",
  path: "/workshops",
});

const counts = stats.slice(0, 3);
const digits = (v: string) => Number(v.replace(/[^\d]/g, ""));
const suffix = (v: string) => v.replace(/[\d,]/g, "");

const current = workshops.filter((w) => w.status !== "past");
const classes = workshops.filter(
  (w) => w.kind === "regular-class" || w.kind === "one-to-one",
);
const immersions = workshops.filter((w) => w.kind === "workshop" || w.kind === "retreat");
const forOrganisations = workshops.filter((w) => w.kind === "corporate" || w.kind === "schools");

/* The five practice pillars, displayed as a tracked row above the offerings
   grid — same treatment as the home page. */
const pillarNames = ["Yoga", "Mindfulness", "Corporate Well-being", "Conscious Living", "Chanting for Kids"];

/* Offerings cards for the grid. Each card maps to a kind of workshop
   and links to the relevant section or contact page. No images. */
const offeringCards = [
  {
    n: "01",
    title: "Weekly Classes",
    body: "Classical Hatha and Ashtanga Vinyasa. Small groups, watched closely, taught at the pace of a body that is listening.",
    href: "#find-a-class",
  },
  {
    n: "02",
    title: "Private Sessions",
    body: "One-to-one teaching built around your body, your history and your week. Online and in person.",
    href: "#find-a-class",
  },
  {
    n: "03",
    title: "Day Workshops",
    body: "A full day given to breath, held posture and the quiet in between. Run a few times a year.",
    href: "#immersions",
  },
  {
    n: "04",
    title: "Immersions & Retreats",
    body: "Weekend practice, nature retreats and residential stays. The group is kept small on purpose.",
    href: "#immersions",
  },
  {
    n: "05",
    title: "Corporate Well-being",
    body: "Programmes for teams under load. Desk yoga, resilience, leadership mindfulness — on site or online.",
    href: "#organisations",
  },
  {
    n: "06",
    title: "Schools & Children",
    body: "Sound, rhythm and stillness, offered to children and staff in a form they take to easily.",
    href: "#organisations",
  },
];

export default function WorkshopsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">

        {/* HERO — gallery-style: image as full background, text overlaid */}
        <div className="relative bg-linen text-moss overflow-hidden flex flex-col items-center justify-center">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/media/hero/workshops.webp"
              alt="A monk in maroon robes shares a blessing ritual with a man and a woman over a small bowl, in a bright room with yoga mats stacked in the background."
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay matching gallery / mentorship hero */}
            <div className="absolute inset-0 bg-gradient-to-b from-linen/60 via-linen/80 to-linen" />
          </div>

          {/* Text overlaid on top */}
          <div className="relative z-10 max-w-[1280px] mx-auto w-full text-left px-6 pt-40 pb-24 md:px-10 lg:px-20 xl:px-32 md:pt-52 md:pb-32">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-6 h-px bg-moss/40" />
              <p className="eyebrow tracking-widest text-sm uppercase">Workshops</p>
            </div>
            <h1 className="font-display text-[4rem] md:text-[6rem] lg:text-[7rem] font-light leading-tight text-moss mb-8">
              Classes, workshops<br />and immersions
            </h1>
            <p className="t-body text-ink/80 max-w-md text-lg md:text-xl font-light leading-relaxed">
              An hour a week, a day given over to breath, or a weekend away from a screen. Same practice, different amounts of time.
            </p>
          </div>
        </div>

        {/* OFFERINGS GRID — matching home-page layout: pillar labels, then
            a 3-column card grid with hairline gutters. No images. */}
        <section className="relative bg-linen/75">
          <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32 lg:px-20 xl:px-32">
            <div className="max-w-2xl" data-reveal>
              <p className="eyebrow">What to expect</p>
              <h2 className="t-h2 mt-5 text-moss">Small groups, watched closely</h2>
              <p className="mt-6 leading-relaxed text-ink/75">
                Start where you are. Every offering below leads to the same place, at a different door.
              </p>
            </div>

            {/* Five pillar names as a tracked row */}
            <ul
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-ink/15 pt-8 md:gap-x-12"
              data-reveal
            >
              {pillarNames.map((name) => (
                <li key={name} className="label text-[0.75rem] text-moss">
                  {name}
                </li>
              ))}
            </ul>

            {/* Card grid — 3 columns, hairline gaps, same as home offerings */}
            <ul className="offer-grid mt-16 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-3">
              {offeringCards.map((o) => (
                <li key={o.n}>
                  <a
                    href={o.href}
                    className="group flex h-full flex-col bg-linen/[0.92] p-8 transition-colors duration-500 hover:bg-moss hover:text-linen md:p-10"
                  >
                    <span>
                      <span className="block font-display text-[1.75rem] leading-tight md:text-3xl">{o.title}</span>
                      <span className="mt-3 block text-[0.92rem] leading-relaxed opacity-75">{o.body}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* INTRO — what a session with her is actually like, and verified numbers */}
        <Section className="bg-linen py-24 md:py-32">
          <div className="max-w-3xl">
            <SectionHead
              eyebrow="What to expect"
              title="Nothing here is a video you follow along with"
              standfirst="Numbers are kept low enough that alignment is corrected rather than assumed, and a session ends with rest, not with a rush for the door."
            />
            <div className="mt-10 max-w-[58ch] space-y-6 leading-[1.75] text-ink/80">
              <p>
                Sessions are taught in Classical Hatha and Ashtanga Vinyasa, with pranayama and
                meditation carrying the same weight as the movement. Beginners are welcome in
                every format; so is a body that is stiff, tired, or coming back after a long gap.
              </p>
              <p>
                Bring a mat if you have one, wear something you can breathe in, and eat lightly
                beforehand. Everything else is arranged with you once you have written in.
              </p>
            </div>

            <ul
              className="mt-14 grid grid-cols-3 gap-6 border-t border-ink/15 pt-10"
              data-reveal-stagger
            >
              {counts.map((s) => (
                <li key={s.label}>
                  <p
                    className="font-display text-[clamp(2.2rem,5vw,3.4rem)] font-light leading-none text-moss"
                    data-count={digits(s.value)}
                    data-count-suffix={suffix(s.value)}
                  >
                    {s.value}
                  </p>
                  <p className="label mt-4 text-[0.66rem] text-ink/70">{s.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* CLASS FINDER — online / offline dropdown + type filter */}
        <Section id="find-a-class" className="tex tex-stone bg-sand/45 py-24 md:py-32">
          <SectionHead
            eyebrow="Regular classes and one-to-one"
            title="Find a class"
            standfirst="Weekly group classes and private sessions, taught online and in JP Nagar. Filter by how you want to attend."
          />
          <div className="mt-14" data-reveal>
            <ClassFinder items={classes} />
          </div>
        </Section>

        {/* WORKSHOPS AND IMMERSIONS — numbered list, no images */}
        <Section id="immersions" className="bg-linen py-24 md:py-32">
          <SectionHead
            eyebrow="Workshops and immersions"
            title="When an hour is not enough"
            standfirst="Longer formats, run a few times a year. The retreat calendar is set with each venue, so dates are confirmed with everyone who has registered interest."
          />

          <ul className="mt-16 max-w-3xl" data-reveal-stagger>
            {immersions.map((w, i) => (
              <li key={w.slug} className="border-t border-ink/15 py-10 first:border-t-0 first:pt-0">
                <p className="label text-[0.66rem] text-moss">
                  {String(i + 1).padStart(2, "0")} &middot; {kindLabels[w.kind]}
                </p>
                <h3 className="mt-4 font-display text-[1.6rem] font-light leading-tight text-moss md:text-[2rem]">
                  {w.title}
                </h3>
                <p className="mt-4 max-w-[54ch] leading-relaxed text-ink/80">{w.description}</p>
                <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 text-sm text-ink/70 sm:grid-cols-3 sm:gap-x-10">
                  <div>
                    <dt className="label text-[0.6rem] text-ink/70">Duration</dt>
                    <dd className="mt-1">{w.duration}</dd>
                  </div>
                  <div>
                    <dt className="label text-[0.6rem] text-ink/70">Location</dt>
                    <dd className="mt-1">{w.location}</dd>
                  </div>
                  <div>
                    <dt className="label text-[0.6rem] text-ink/70">Dates</dt>
                    <dd className="mt-1">Announced soon</dd>
                  </div>
                </dl>
                <Link
                  href={`/contact?about=${w.slug}`}
                  className="mt-5 inline-flex min-h-11 items-center text-moss"
                >
                  <span className="label border-b border-moss/40 pb-1 text-[0.7rem] transition-colors duration-300 hover:border-moss">
                    Register interest
                  </span>
                  <span className="sr-only"> in {w.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        {/* FOR ORGANISATIONS AND SCHOOLS */}
        <section id="organisations" className="bg-mist-pale text-ink">
          <Section className="py-24 md:py-32">
            <div className="max-w-3xl">
              <SectionHead
                eyebrow="For organisations and schools"
                title="Work that happens on your premises"
                standfirst="Programmes for teams under load, and sessions for children and teaching staff. Run over weeks where that suits, or as a single session for a wellness day."
              />
              <ul className="mt-10 space-y-4" data-reveal-stagger>
                {forOrganisations.map((w) => (
                  <li key={w.slug} className="border-t border-ink/15 pt-4">
                    <h3 className="font-display text-[1.35rem] font-light leading-tight text-moss">
                      {w.title}
                    </h3>
                    <p className="mt-2 max-w-[52ch] leading-relaxed text-ink/75">{w.summary}</p>
                    <p className="label mt-3 text-[0.62rem] text-moss/70">
                      {w.duration} &middot; {modeLabels[w.mode]}
                    </p>
                  </li>
                ))}
              </ul>
              <LeafRule className="mt-12 max-w-[240px]" />
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button href="/mentorship" variant="solid">
                  See the full programmes
                </Button>
                <Button href={site.whatsapp} variant="ghost" external>
                  Ask on WhatsApp
                </Button>
              </div>
            </div>
          </Section>
        </section>

        {/* PAST WORK — quiet, small, no photographs */}
        <Section className="bg-linen py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="eyebrow">Previously run</h2>
              <p className="mt-5 max-w-[38ch] text-sm leading-relaxed text-ink/70">
                A record of the formats already taught, in India and online. Individual dates and
                venues are not listed here.
              </p>
            </div>
            <ul className="lg:col-span-8">
              {pastFormats.map((p) => (
                <li
                  key={p.title}
                  className="flex flex-col gap-y-1 border-t border-ink/15 py-4 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-8"
                >
                  <span className="text-ink/80">{p.title}</span>
                  <span className="text-sm text-ink/70">{p.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <CtaBand
          body="Tell her which format you are after and she will answer with dates as soon as they are set."
          secondary={{ href: "/mentorship", label: "Explore Mentorship" }}
        />
      </main>
      <SiteFooter />

      <JsonLd
        data={[
          breadcrumbLd([{ name: "Workshops", path: "/workshops" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Classes, workshops and immersions",
            url: `${site.url}/workshops`,
            numberOfItems: current.length,
            itemListElement: current.map((w, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: w.title,
              description: w.summary,
              url: `${site.url}/contact?about=${w.slug}`,
            })),
          },
        ]}
      />
    </>
  );
}
