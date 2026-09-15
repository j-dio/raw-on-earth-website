import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import ClassFinder from "@/components/ClassFinder";
import { Section, SectionHead, LeafRule, Button, CtaBand } from "@/components/ui";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { stats } from "@/data/home";
import { workshops, pastFormats, kindLabels, modeLabels } from "@/data/workshops";
import { site } from "@/data/site";

/* Workshops.

   The design brief asks this page for "upcoming and past workshops, retreat
   calendar, corporate workshops, school workshops, with description, date,
   duration, location and registration". The 27 July notes add regular classes,
   one-to-one, and the online / offline dropdown. There is no Events tab; this
   page is it.

   The awkward fact this page is built around: NOT ONE date, price, venue or
   registration link has been supplied. So the page never prints one. Every
   card says "Dates announced soon" and every CTA goes to the contact page.
   That is not a placeholder to be prettied up later - it is the honest state,
   and it stays until she sends the real calendar.

   Registration links carry the slug: /contact?about=<slug>, so an enquiry
   arrives with context. The contact page may not read `about` yet; if it does
   not, nothing breaks - the visitor simply lands on the form. Whoever builds
   /contact should pick the param up and pre-fill the message. */

export const metadata: Metadata = pageMeta({
  title: "Workshops",
  description:
    "Regular yoga classes, one-to-one sessions, day workshops, immersions and retreats with Rajalakshmi V, online and in Bangalore, and for organisations.",
  path: "/workshops",
});

/* The three figures that are real, from her credentials. The fourth entry in
   `stats` is the lineage count, which is not a thing to count up. */
const counts = stats.slice(0, 3);
const digits = (v: string) => Number(v.replace(/[^\d]/g, ""));
const suffix = (v: string) => v.replace(/[\d,]/g, "");

/* Each offering appears in exactly ONE section. The finder used to be fed all
   eleven, which meant a visitor scrolled past the same seven rows three times
   in three near-identical list shapes. It now carries the recurring commitments
   only - which is what its own heading promises - and the longer formats and
   the organisational work keep their own treatment further down. */
const current = workshops.filter((w) => w.status !== "past");
const classes = workshops.filter(
  (w) => w.kind === "regular-class" || w.kind === "one-to-one",
);
const immersions = workshops.filter((w) => w.kind === "workshop" || w.kind === "retreat");
const forOrganisations = workshops.filter((w) => w.kind === "corporate" || w.kind === "schools");

export default function WorkshopsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow="Workshops"
          title="Classes, workshops and immersions"
          standfirst="An hour a week, a day given over to breath, or a weekend away from a screen. Same practice, different amounts of time."
          figure={{
            src: "/media/hero/workshops.webp",
            alt: "A monk in maroon robes shares a blessing ritual with a man and a woman over a small bowl, in a bright room with yoga mats stacked in the background.",
            width: 2400,
            height: 1028,
          }}
        />

        {/* INTRO - what a session with her is actually like, and the only three
            numbers on this page that are verified. */}
        <Section className="bg-linen py-24 md:py-32">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHead
                eyebrow="What to expect"
                title="Small groups, watched closely"
                standfirst="Nothing here is a video you follow along with. Numbers are kept low enough that alignment is corrected rather than assumed, and a session ends with rest, not with a rush for the door."
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

            <div className="lg:col-span-5">
              <img
                src="/media/gallery/teaching-02.webp"
                alt="A teacher adjusts a student's hips during a wheel pose on a mat beneath a large tree in a park."
                width={1500}
                height={2666}
                loading="lazy"
                decoding="async"
                data-parallax="40"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Section>

        {/* THE WORKING PART OF THE PAGE - the online / offline dropdown the
            client asked for, plus a type filter. Given room and its own ground. */}
        <Section id="find-a-class" className="tex tex-stone bg-sand/45 py-24 md:py-32">
          <SectionHead
            eyebrow="Regular classes and one-to-one"
            title="Find a class"
            standfirst="Weekly group classes and private sessions, taught online and in JP Nagar. Filter by how you want to attend. The longer formats, and the work run inside organisations, are further down the page."
          />
          <div className="mt-14" data-reveal>
            <ClassFinder items={classes} />
          </div>
        </Section>

        {/* WORKSHOPS AND IMMERSIONS - deliberately not another row list. A
            single feature figure and cards with a rule and a number. */}
        <Section className="bg-linen py-24 md:py-32">
          <SectionHead
            eyebrow="Workshops and immersions"
            title="When an hour is not enough"
            standfirst="Longer formats, run a few times a year. The retreat calendar is set with each venue, so dates are confirmed with everyone who has registered interest."
          />

          <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <img
                src="/media/gallery/raji-06.webp"
                alt="The founder arches into full wheel pose on a mat beneath the trunk of a large tree in a public park."
                width={1500}
                height={2666}
                loading="lazy"
                decoding="async"
                data-scrub-scale
                className="w-full object-cover"
              />
            </div>

            <ul className="lg:col-span-7" data-reveal-stagger>
              {immersions.map((w, i) => (
                <li key={w.slug} className="border-t border-ink/15 py-10 first:border-t-0 first:pt-0">
                  <p className="label text-[0.66rem] text-moss">
                    {String(i + 1).padStart(2, "0")} &middot; {kindLabels[w.kind]}
                  </p>
                  <h3 className="mt-4 font-display text-[1.6rem] font-light leading-tight text-moss md:text-[2rem]">
                    {w.title}
                  </h3>
                  <p className="mt-4 max-w-[54ch] leading-relaxed text-ink/80">{w.description}</p>
                  {/* A fixed grid, not flex-wrap: with wrapping, "Two days"
                      and "Bangalore and nearby" fitted one row on a phone while
                      the next card's longer values did not, so the three cards
                      lost their shared rhythm. */}
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
                      {/* No invented date. See the head of this file. */}
                      <dd className="mt-1">Announced soon</dd>
                    </div>
                  </dl>
                  {/* The workshop title stays in the accessible name - eleven
                      links reading "Register interest" would be useless out of
                      context - but it is not printed, because set in tracked
                      caps it ran to two shouting lines on a phone. The 44px box
                      is the tap target; the rule stays tight to the text. */}
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
          </div>
        </Section>

        {/* FOR ORGANISATIONS AND SCHOOLS. Mist ground since 2026-09-15: this was
            walnut, and a page that runs pale, drops into a dark brown band and
            comes back is the switching the client asked us to stop (call,
            00:46:22). Moss 8.19:1 on mist, ink 12.72:1. */}
        <section className="bg-mist text-ink">
          <Section className="py-24 md:py-32">
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-16 lg:items-center">
              <div className="lg:col-span-6">
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
                <LeafRule  className="mt-12" />
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Button href="/mentorship" variant="solid">
                    See the full programmes
                  </Button>
                  <Button href={site.whatsapp} variant="ghost" external>
                    Ask on WhatsApp
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-6">
                <img
                  src="/media/gallery/kids-26.webp"
                  alt="A student holds crow pose on a mat while an instructor in a mauve t-shirt observes and corrects alignment nearby, large windows and potted plants behind."
                  width={1440}
                  height={1440}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover"
                />
              </div>
            </div>
          </Section>
        </section>

        {/* PAST WORK - quiet, small, no photographs. Formats, not invented
            events: 35+ workshops have been run and not one title or date
            reached us. */}
        <Section className="bg-linen py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="eyebrow">Previously run</h2>
              <p className="mt-5 max-w-[38ch] text-sm leading-relaxed text-ink/70">
                A record of the formats already taught, in India and online. Individual dates and
                venues are not listed here.
              </p>
            </div>
            {/* Stacked on a phone. Justified rows only wrapped when a title and
                its note happened to fit together, so one row in seven sat side
                by side and the other six did not. */}
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

      {/* An ItemList, NOT schema.org Event objects.

          Event requires a startDate. We have none, for any of these, and an
          invented one is not a white lie in structured data: Google puts it in
          the results, people plan around it, and it is wrong. An ItemList
          describes the same offerings truthfully and needs no date. Swap in
          real Event objects the day she sends the real calendar - not before. */}
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
