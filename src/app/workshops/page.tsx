import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import ClassFinder from "@/components/ClassFinder";
import { Section, SectionHead, Button, CtaBand } from "@/components/ui";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import {
  workshops,
  pastFormats,
  corporateClients,
  kindLabels,
  SAMPLE_SCHEDULE,
} from "@/data/workshops";
import { site } from "@/data/site";

/* Workshops.

   The design brief asks this page for "upcoming and past workshops, retreat
   calendar, corporate workshops, school workshops, with description, date,
   duration, location and registration". The 27 July notes add regular classes,
   one-to-one, and the online / offline dropdown. There is no Events tab; this
   page is it.

   Reworked 2026-09-17 into the diary her brief asks for. What stood here was a
   second copy of the services catalogue - the same corporate, schools, retreats
   and one-to-one that /mentorship already sets out by audience. Her brief draws
   the line clearly: Services is WHAT she offers, Workshops is WHEN it runs. The
   catalogue is linked once now, not repeated.

   The awkward fact this page is built around: NOT ONE real date, price, venue
   or registration link has ever been supplied. `SAMPLE_SCHEDULE` in
   src/data/workshops.ts fills the timetable and the cards so the page can be
   designed and reviewed as a finished thing, and the page prints a visible
   notice saying so while it is on. Turn it off before this reaches the client;
   with it off every row falls back to "Dates announced soon" and nothing on
   the page claims a date. Every CTA goes to the contact page either way.

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

/* Each offering appears in exactly ONE section. The finder used to be fed all
   eleven, which meant a visitor scrolled past the same seven rows three times
   in three near-identical list shapes. It now carries the recurring commitments
   only - which is what its own heading promises - and the longer formats and
   the organisational work keep their own treatment further down. */
const current = workshops.filter((w) => w.status !== "past");
const classes = workshops.filter(
  (w) => w.kind === "regular-class" || w.kind === "one-to-one",
);
/* The diary: the one-off formats, soonest first. A dated entry outranks an
   undated one so the page opens on something a visitor can actually put in a
   calendar, rather than on whichever object happens to be first in the file. */
const upcoming = workshops
  .filter((w) => (w.kind === "workshop" || w.kind === "retreat") && w.status !== "past")
  .sort((a, b) => (a.date ?? "9999").localeCompare(b.date ?? "9999"));

/* Dates are printed two ways from one ISO string, so a card can never disagree
   with itself. `formatDots` is the reference's own device - 18 . 10 . 2026 on
   half an em of tracking - and `formatLong` is the line a person reads.
   en-GB and a fixed UTC timezone: the site is British-spelled throughout, and
   without the timezone a build machine west of Greenwich renders yesterday. */
const DOTS = { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" } as const;
const LONG = { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" } as const;
const formatDots = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", DOTS).format(new Date(iso)).replace(/\//g, " . ");
const formatLong = (iso: string) => new Intl.DateTimeFormat("en-GB", LONG).format(new Date(iso));

export default function WorkshopsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow="Workshops"
          title="Classes, workshops and immersions"
          /* Rewritten 2026-09-17, twice. It read "An hour a week, a day given
             over to breath, or a weekend away from a screen. Same practice,
             different amounts of time." - a riddle with no verb and no reader
             in it. The first rewrite opened "Join a weekly class, spend a day
             on breath and stillness..." and read like a list of instructions.

             ouranoyoga.com/mentoring sets its standfirst as a fragment of
             parallel clauses that all land on the reader: "Mentoring to guide,
             nurture, and support you." That is the shape copied here - three
             clauses, one sentence, every one of them ending on what it does
             FOR you, and not a verb aimed at you. */
          standfirst="Classes to steady you, workshops to take you deeper, and retreats to take you away."
          /* `workshops.webp` is a 21:9 crop of `kids-32` - her crouched among
             a yard of school children, steadying one of them.

             It replaced a monk conducting a blessing ceremony: a real
             photograph from her practice, but not a class, on the one page
             that has to show what turning up looks like.

             kids-30 was tried first and did not survive the band. It is a 3:2
             frame of her standing, so at 21:9 she filled the whole height and
             the children were cut away below - "doesn't show the image as a
             whole", which is exactly right. kids-32 is the same session shot
             WIDE: the scene spreads horizontally, so a 21:9 window holds all
             of it and nothing has to be invented to make it fit.

             Cropped to 16:9 (1500:844:0:80), NOT the 21:9 the other heroes
             use, and the reason is the small screens rather than the large
             one. PageHero runs a 16:9 box below `lg` and 21:9 above it, so a
             21:9 master hits `object-cover` on a phone and it trims the SIDES:
             measured at 390px the band shows 449px of a 1500px frame - 70% of
             the picture gone, and on this photograph the sides are where the
             children are. Tablet lost 34% the same way.

             A 16:9 master inverts that. The phone box is 16:9 exactly, so
             nothing is cropped at all; desktop trims height instead, 27% at
             1440 and 32% at 1920, out of sky and empty mat. y=80 keeps her
             head and the front row.

             (CLAUDE.md says the /media/hero files are pre-cropped to 21:9 "so
             object-cover only has to trim the sides on a phone rather than
             discard two thirds of the picture". Measured, it discards two
             thirds anyway. That is true of every page and wants looking at
             properly, not just here.)

             1500px wide against the other heroes' 2400, so it upscales about
             1.13x at the 1700px container. Ask her for the full-resolution
             original.

             GATE BEFORE LAUNCH: this frame shows identifiable children's
             faces, and "whether the 27 children's faces may be published" is
             still on the open list in docs/CLIENT-BRIEF.md. It is fine on a
             dev server; it is not fine on a live domain until she answers.
             If the answer is no, `/media/hero/gallery.webp` is a class
             mid-session and is unused. */
          figure={{
            src: "/media/hero/workshops.webp",
            alt: "The founder crouches among a yard full of school children, steadying one of them in a seated forward fold, a wire fence and trees behind.",
            width: 1500,
            height: 844,
          }}
        />

        {/* The "What you will practise" section stood here and is removed.

            It had already been cut back once, from a version that promised
            small groups, watched alignment and a mat to bring - none of which
            she has ever told us. What was left was true but it was three
            blocks of prose between the masthead and the timetable, which is
            the thing a visitor came for.

            One sentence out of it was worth keeping and is now the standfirst
            below: Classical Hatha and Ashtanga Vinyasa with pranayama and
            meditation, which is the only place this page names what she
            actually teaches, and is sourced from her own credentials.

            The full copy is in git and in the project memory note
            `raw-on-earth-workshops-intro-copy`, because it is the best version
            that section has had and she may want it back. */}

        {/* THE WORKING PART OF THE PAGE - the online / offline dropdown the
            client asked for, plus a type filter. Given room and its own ground. */}
        <Section id="find-a-class" className="tex tex-stone bg-sand/45 py-24 md:py-32">
          <SectionHead
            eyebrow="Regular classes and one-to-one"
            title="Find a class"
            standfirst="Classical Hatha and Ashtanga Vinyasa, with pranayama and meditation carrying the same weight as the movement. Taught online and in JP Nagar, Bangalore — choose how you want to attend and write in for a place."
          />
          <div className="mt-14" data-reveal>
            <ClassFinder items={classes} />
          </div>
        </Section>

        {/* UPCOMING - the calendar the brief actually asks this page for.

            Her brief: "Display upcoming and past workshops, retreat calendar,
            corporate workshops, school workshops, with description, date,
            duration, location and registration." That is a diary. What stood
            here instead was a second copy of the services catalogue - the same
            one-to-one, corporate, retreats and schools that /mentorship already
            lists by audience, which is the split her brief draws: Services is
            WHAT she offers, Workshops is WHEN it happens. The catalogue is gone
            from this page and linked to once, below.

            The card shape is measured off ouranoyoga.com/events/ (1440px), the
            only page on the reference that does this job: a full-width picture
            with the event name over it in Cormorant at 60px/weight 500/3px of
            tracking, the date under it in Lato at 16px on EIGHT pixels of
            tracking - half an em, and the thing that makes a date read as a
            date at a glance - then the description and Where / When / Cost as
            labelled lines in a column under the picture, and one button.

            Ours keeps that and drops their centring below the image, because
            everything else on this site sets prose on the left rule. */}
        <Section className="bg-linen py-24 md:py-32">
          <SectionHead
            eyebrow="Upcoming"
            title="What is coming up"
            standfirst="Take a whole day, or come away for a weekend. These run a few times a year and numbers are small, so your place is held as soon as you write in."
          />

          {SAMPLE_SCHEDULE ? (
            /* Visible on purpose while SAMPLE_SCHEDULE is on. The data file
               explains the rule: a plausible-looking invented event is the
               worst kind of lie, because somebody turns up for it. This says
               so on the page rather than only in a comment. */
            <p className="label mt-8 inline-block border border-moss/30 px-4 py-3 text-[0.62rem] leading-relaxed text-moss">
              Sample dates, for layout only &mdash; real dates to be confirmed
            </p>
          ) : null}

          <ul className="mt-14 space-y-20 md:space-y-28" data-reveal-stagger>
            {upcoming.map((w) => (
              <li key={w.slug}>
                {w.image ? (
                  <div className="relative overflow-hidden">
                    <img
                      src={w.image.src}
                      alt={w.image.alt}
                      width={1500}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full object-cover md:aspect-[21/9]"
                    />
                    {/* A flat scrim at 60%, not a gradient, and the number is
                        measured rather than chosen. A gradient failed first:
                        over `meditation-08`, a hall of pale concrete, the type
                        sat on the light middle of the ramp.

                        Sampled off the rendered page at 1440x900, reading the
                        brightest background pixel beside the type - at 45% the
                        title came back 3.24:1, which passes for large text but
                        leaves the 11px date under it short of the 4.5:1 small
                        text needs. At 60%: title 4.86:1 and 5.16:1, date
                        5.48:1 and 5.56:1, and 7.01:1 over the outdoor frame.

                        The scrim also means the photographs are left alone
                        rather than darkened in the file - the palette's light
                        greens fail 4.5:1 over an uncontrolled image, so the
                        type carries its own ground. */}
                    <div className="absolute inset-0 bg-ink/60" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                      {/* The format as a label, the NAME as the heading. That
                          is the reference's own division - its bands read "TEA
                          CEREMONY", not "Day workshop: tea ceremony" - and it
                          is why the titles in the data file are short names
                          now. Set as a sentence, "Day workshop: breath and
                          stillness" wrapped to four lines at 72px and ran out
                          of the bottom of a 21:9 band.

                          `.t-h3` rather than `.t-h2`, uppercased and tracked
                          here to match the masthead treatment at a size that
                          fits the frame: the reference sets its event names at
                          60px and `.t-h2` tops out at 72px. */}
                      <p className="label text-[0.62rem] text-linen/75">{kindLabels[w.kind]}</p>
                      <h3 className="t-h3 mt-3 max-w-[16ch] uppercase tracking-[0.055em] text-linen">
                        {w.title}
                      </h3>
                      {w.date ? (
                        /* 0.5em of tracking, which is the reference's own
                           number: 16px Lato on 8px of letter-spacing. It is
                           what makes `18 . 10 . 2026` read as a date at a
                           glance rather than as a line of small type. */
                        <p className="label mt-6 text-[0.7rem] tracking-[0.5em] text-linen">
                          {formatDots(w.date)}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ) : null}

                <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-16">
                  <p className="leading-[1.9] text-ink/80 lg:col-span-7">{w.description}</p>

                  <dl className="space-y-4 lg:col-span-4 lg:col-start-9">
                    <div>
                      <dt className="label text-[0.6rem] text-ink/60">When</dt>
                      <dd className="mt-1 text-ink/85">
                        {w.date ? formatLong(w.date) : "Announced soon"}
                        {w.duration ? ` · ${w.duration}` : ""}
                      </dd>
                    </div>
                    <div>
                      <dt className="label text-[0.6rem] text-ink/60">Where</dt>
                      <dd className="mt-1 text-ink/85">{w.location}</dd>
                    </div>
                    {/* Printed only when there is one. No invented fee. */}
                    {w.price ? (
                      <div>
                        <dt className="label text-[0.6rem] text-ink/60">Cost</dt>
                        <dd className="mt-1 text-ink/85">{w.price}</dd>
                      </div>
                    ) : null}
                    <div className="pt-2">
                      <Button href={`/contact?about=${w.slug}`} variant="solid">
                        Hold me a place
                      </Button>
                      <span className="sr-only"> at {w.title}</span>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        {/* THE CATALOGUE LIVES ON /mentorship. One line and a link, rather than
            the two sections that used to stand here re-listing corporate work,
            schools, retreats and one-to-one - all four of which /mentorship
            already sets out by audience, in the five sections her brief names.
            Her split, kept: what she offers there, when it runs here. */}
        <Section className="bg-mist-pale py-20 md:py-24">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-16">
            <p className="t-h3 text-moss lg:col-span-7">
              Corporate programmes, schools, retreats and one-to-one teaching are set out in
              full on the mentorship page.
            </p>
            <div className="lg:col-span-4 lg:col-start-9">
              <Button href="/mentorship" variant="ghost">
                See every offering
              </Button>
            </div>
          </div>
        </Section>

        {/* CORPORATE CREDENTIALS. Moved here from /about on 2026-09-17.

            She asked for the companies herself and left us the placement -
            "these companies have to be projected somewhere. You think about
            it. I'll leave it to you" (00:55:45). Her own 27 July brief answers
            it: Tab 3 is "Events (regular, one to one) + Gallery ... Photos -
            online session / offline / 1-2 corporate pics". So the credential
            sits directly under the organisations section it is evidence for,
            rather than in the middle of her life story.

            Thirteen names, from the slide she sent on 2026-09-16. They are set
            as a hairline grid rather than as a centred run of text: thirteen
            company names as running type is what made an earlier attempt at
            this the busiest thing on the site. A grid gives each one its own
            cell and the row stays quiet.

            Text only, never their logos, and no context invented around them.
            The list and the two open spellings are in src/data/workshops.ts. */}
        <Section className="bg-linen pt-24 md:pt-32">
          <SectionHead
            eyebrow="Corporate work"
            title="Taken into the workplace"
            standfirst="Programmes and sessions have been run for teams at:"
          />
          <ul
            className="mt-14 grid grid-cols-2 gap-px bg-ink/15 lg:grid-cols-3"
            data-reveal-stagger
          >
            {corporateClients.map((name) => (
              <li
                key={name}
                className="flex items-center bg-linen px-4 py-5 font-display text-[1.05rem] font-light leading-snug text-moss sm:px-6 sm:py-6 sm:text-[1.15rem] md:px-8 md:py-7 md:text-[1.35rem]"
              >
                {name}
              </li>
            ))}
          </ul>
        </Section>

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
