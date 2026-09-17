import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { CtaBand } from "@/components/ui";
import { offerings, pillars } from "@/data/home";
import { site } from "@/data/site";

/* The continuity line the client asked for (call, 00:32:40): "a vertical line
   that takes me to the next page... giving me a feel of continuity". It sits in
   the gap between two sections and draws itself downward on scroll via
   `data-scrub-line`, which is skipped under prefers-reduced-motion.

   Measured off ouranoyoga.com rather than guessed: 2px wide, 130px tall,
   centred on the page, and it STRADDLES the boundary between two sections -
   about 55px sits in the section above and 75px in the one below. That overlap
   is the whole effect. A line that stops at the seam is a divider; a line that
   crosses it carries you over, which is what she described (00:32:40).

   Weight matters as much as length. Theirs is 2px of mid-grey, 3.94:1 against
   its ground - quiet, but unmistakably drawn. Ours was 1px at 30% opacity,
   1.70:1, which read as a printing flaw. moss/70 at 2px lands at about 3.7.

   Not to be confused with the rule down the middle of a panel, which she asked
   to have removed (00:34:38). Used once, between the quote panel and Offerings.
   It was twice until the page lost a section; on a four-block page one is the
   whole point - more and it stops marking a transition and becomes decoration.

   Sits in a zero-height flex row so the line can hang past its own box into the
   next section without reserving space for itself. */
function ContinuityRule() {
  return (
    <div aria-hidden className="relative z-10 flex h-0 justify-center overflow-visible">
      <span
        data-scrub-line
        className="block h-[110px] w-[2px] -translate-y-[45px] bg-moss/70 md:h-[130px] md:-translate-y-[55px]"
      />
    </div>
  );
}

/* Home. Four blocks and a closing band, which is the structure her 27 July
   notes ask for and nothing more:

     hero -> Your Home of Wellness -> a pull quote -> Offerings -> her last line

   Three blocks came off on 2026-09-15, each because it was not in that list and
   read as a second helping of something already on the page: her Journey
   figures (About says them), the five practices as a section of their own (the
   names now sit inside Offerings), and a gallery strip (Community holds the
   gallery).

   Every block carries copy she wrote or a fact she gave us. Nothing here is
   written in her voice by us.

   Testimonials are absent on purpose. The quotes we hold are placeholders, and
   a landing page is the worst place to show scaffolding. */

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="main">
        {/* HERO
            One composed image: she is already placed on the gradient, in
            profile facing right, with the right of the frame left open. So the
            type sits in her eyeline and there is no separate cutout layer. */}
        <section className="hero relative min-h-[100svh] overflow-hidden bg-linen">
          <div
            className="hero-in-figure absolute inset-0"
            style={{ "--d": "60ms" } as React.CSSProperties}
          >
            <div className="hero-atmos absolute inset-0" role="img" aria-label="Rajalakshmi V seated in padmasana with hands at her heart, eyes closed" />
          </div>
          <div
            className="hero-in-soft absolute inset-0"
            aria-hidden
            style={{ "--d": "220ms" } as React.CSSProperties}
          >
            <div className="hero-wash absolute inset-0" />
          </div>

          <div
            aria-hidden
            className="hero-ring brand-mark mark-enso-ring absolute left-1/2 top-[calc(100%_-_var(--med-gap)_-_var(--med)/2)] h-[var(--med)] w-[var(--med)] text-moss lg:left-[26%] lg:top-[46%] lg:h-[min(44vw,660px)] lg:w-[min(44vw,660px)]"
          />

          {/* The section owns the height (see above). The type column is
              `col-start-7 col-span-6`, so it runs to the container's right edge;
              the air on the right of the headline is the column being wider than
              the text, not a reserved column. */}
          {/* The lopsided padding is what moves the type right, off the blurred
              part of the photo. This grid holds only the copy - she is an
              absolute layer behind it - so container padding = type position.

              Keep each pair summing to what it replaced (lg 96+16 = 112, 2xl
              160+0 = 160) and the column keeps the exact width it had under
              symmetric padding. That is the only reason for the odd numbers.
              Measured at 1440: the column is 641px and the headline text inside
              it is 364px, so there is room either way - changing the sum resizes
              the column, it does not wrap the headline. */}
          <div className="relative z-10 mx-auto flex h-full min-h-[100svh] max-w-[1500px] items-stretch px-6 pt-28 pb-16 md:px-10 lg:grid lg:grid-cols-12 lg:items-center lg:gap-8 lg:pl-24 lg:pr-4 lg:pt-20 lg:pb-20 2xl:pl-[10rem] 2xl:pr-0">
            {/* Portrait is a full-height flex column so the link can be pushed
                to the foot of the screen (see the link block below). Desktop
                drops back to normal flow inside the grid cell. */}
            <div className="hero-copy flex w-full flex-col text-center lg:col-span-6 lg:col-start-7 lg:block lg:text-left">
              {/* Same shape as ouranoyoga.com, which is the reference the client
                  named and the one she keeps pointing at: a short display line,
                  a plain sentence under it, then one button. Her content, their
                  format.

                  "Yoga | Life" is her own line from the 6 September call. It
                  replaced the "Real - Awakening - Wellbeing" kicker, which she
                  asked to remove. The brand name is not repeated here because
                  the wordmark is already top-left, which is how the reference
                  handles it too.

                  Size and tracking come from their live page, measured at
                  1280px: 53px, weight 500, 5px of tracking (0.094em). The
                  tracking is the point - it is what makes 53px read as grand
                  rather than merely large, and our old 88px with 0.06em was
                  bigger and blunter.

                  Weight 300, like every type role in globals.css. It was 400,
                  which left the site running two display weights.

                  Re-measure on a real phone, not with `chrome --window-size`:
                  Chrome on Windows will not open a window under 500px, so a
                  390px screenshot is a crop of a 500px page. Use scripts/shot.mjs. */}
              <h1
                className="hero-in-title font-display text-[clamp(2.4rem,4.6vw,3.6rem)] font-light uppercase leading-[1.1] tracking-[0.094em] text-moss"
                style={{ "--d": "240ms" } as React.CSSProperties}
              >
                Yoga <span className="font-light text-moss/40">|</span> Life
              </h1>

              {/* Her tagline, and it is a statement, not a quotation - the quote
                  marks that used to sit around it made it read as somebody
                  else's words. Set in Lato rather than display italic, which is
                  what the reference does under its own headline.

                  Its own role, not body copy: measured on ouranoyoga's hero at
                  1280, their subline is Lato 24px / 33.6 / weight 300 in a 304px
                  measure - bigger and TIGHTER than their 16px/32 body. Ours held
                  16px/2.0 at every width, which was right on a phone and far too
                  small beside a 58px headline on a desktop. Floor stays 1rem so
                  the phone is unchanged. */}
              <p
                className="hero-in mx-auto mt-8 max-w-[26ch] text-[clamp(1rem,1.9vw,1.5rem)] font-light leading-[1.4] text-ink/80 lg:mx-0"
                style={{ "--d": "380ms" } as React.CSSProperties}
              >
                {/* verbatim client copy */}
                Work on yourself before you work for somebody else.
              </p>

              {/* One button, not two. She asked for "Explore Workshops" to go and
                  for a book-now to stay, and the reference carries exactly one
                  pill in the same slot.

                  `mt-auto` pins it to the foot of the hero on a phone, so the
                  order down the screen is type, then her, then the one thing a
                  thumb has to reach. The space it reserves is `--med-gap` in
                  globals.css; the two numbers move together. */}
              <div
                className="hero-in mx-auto mt-auto flex w-full justify-center lg:mx-0 lg:mt-14 lg:justify-start"
                style={{ "--d": "500ms" } as React.CSSProperties}
              >
                <Link
                  href="/contact"
                  className="label inline-flex min-h-12 items-center rounded-full bg-moss px-7 text-linen transition-colors duration-300 hover:bg-moss-deep"
                >
                  Book a session
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* YOUR HOME OF WELLNESS - image on the right, per the brief */}
        <section
          /* Linen, not sand. This page runs two grounds, linen and mist-pale.
             The inner pages still carry `bg-sand/45` bands and have not been
             converted yet. Reasoning and measurements are in globals.css, under
             --color-mist-pale. */
          className="wellness bg-linen"
        >
          {/* `lg:items-center`, not top-aligned: the two columns are different
              heights, and centred the difference splits either side of the copy
              instead of pooling under it as one blank corner of sand. */}
          <div className="wellness-grid mx-auto grid max-w-[1280px] items-start gap-14 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-20 xl:px-32">
            <div className="wellness-copy" data-reveal>
              {/* VERBATIM client copy, the panel the 27 July notes call "Page 1 (t2)". Every
                  word below is hers, including the British "well-being" and
                  "practices" spellings - do not tidy them.

                  The <strong> runs are her own bold marks from that document,
                  not our emphasis. They carry weight AND colour, never colour
                  alone: moss on its own would be invisible to a reader who
                  cannot separate the hues, and the bold is what the client
                  actually wrote.

                  Replaced on 2026-08-23: an invented headline ("Strength,
                  balance, flexibility, breath, focus.") built by lifting her
                  first bold phrase and re-cutting it, plus a one-paragraph
                  paraphrase of all three paragraphs. Her heading is the heading
                  now. */}
              <h2 className="t-h2 text-moss">Your Home of Wellness</h2>

              <div className="t-body mt-10 space-y-7 text-ink/80">
                <p>
                  We bring together a range of classes and practices to help you develop{" "}
                  <strong className="font-bold text-moss">
                    strength, balance and flexibility in both body and mind
                  </strong>
                  , while cultivating healthier breathing, deeper focus and greater
                  awareness.
                </p>
                <p>
                  Our offerings include{" "}
                  <strong className="font-bold text-moss">
                    Hatha Yoga, Ashtanga Vinyasa and mindful movement practices
                  </strong>
                  , thoughtfully designed to encourage conscious movement, physical
                  well-being and a deeper connection with yourself.
                </p>
                <p>
                  Alongside movement, our{" "}
                  <strong className="font-bold text-moss">
                    meditation and mindfulness sessions
                  </strong>{" "}
                  offer a quiet space to slow down, ease everyday stress, support
                  emotional well-being and develop greater self-awareness.
                </p>
              </div>

              {/* The client asked for a book-now here on 6 September. It is the
                  page's one filled button, and it sits at the end of the copy
                  rather than in the hero: by this point a visitor has read what
                  she actually teaches, which is when the ask is fair. The hero
                  link and this one name the same action on purpose - one action
                  said twice, not two choices. */}
              <Link
                href="/contact"
                className="label mt-10 inline-flex min-h-11 items-center rounded-full bg-moss px-8 py-[0.95rem] text-linen transition-colors duration-300 hover:bg-moss-deep"
              >
                Book a session
              </Link>

            </div>

            {/* Careful: under lg this is NOT a column. `.wellness-grid` sets
                `display: contents` on it (globals.css), so the picture and the
                closing line are ordered one by one against the copy.

                Phone order: picture, heading, prose, button, closing line.
                Stacked the other way, a phone got 300 words before any picture.
                From lg up this is an ordinary two-column grid. */}
            <div className="wellness-media relative" data-reveal>
              {/* Plain <img>, not next/image: the optimiser is off for
                  Hostinger. Dimensions are on the tag so the column reserves
                  its height before the file lands.

                  A9, "zoom in where the photo has empty space top and bottom"
                  Source is 1500x2666; `aspect-square` plus `object-cover` keeps
                  the middle 1500 rows, so it crops 21.9% off each end and the
                  subject stays centred. Keep it square - the closing line below
                  shares this column's height with it.

                  New photo off centre? Re-crop the file. Do not reach for
                  object-position: a CSS crop still downloads the whole tall
                  file. */}
              <img
                src="/media/gallery/raji-28.webp"
                width={1500}
                height={2666}
                loading="lazy"
                decoding="async"
                alt="A practitioner sits in padmasana with eyes closed on a woven mat, surrounded by dry autumn leaves and forest trees."
                className="aspect-square w-full object-cover object-center"
              />

              {/* Do not remove without asking the client. Both the line and its
                  position under the photograph are hers, recorded in
                  docs/feedback.

                  One note there reads "remove move, breathe, become". That means
                  remove it from the MIDDLE of this block, not from the page. It
                  has already been cut once by mistake and put back. */}
              <p className="t-statement mt-8 italic text-moss">
                Move. Breathe. Become.
              </p>
            </div>
          </div>
        </section>

        {/* A4b. Her own transition: "Move. Breathe. Become." ends the section
            above and the line carries the eye from it into the next one. */}
        {/* QUOTE PANEL, on mist rather than a full-bleed moss ground. The page
            falling from pale into dark green and back is what she meant by "it's
            confusing my own mind" (00:46:22); moss stays the colour of type and
            buttons, not of whole sections. Measured on mist: moss 8.02:1 through
            the texture, ink 12.46:1.

            The rule down the centre is gone and stays gone - on a panel holding
            one centred quote it was a line through the middle of the sentence. */}
        <section
          /* py-24 md:py-32 (96/128) is the beat every band on the site uses.
             This one ran 112/160 and was the only exception. */
          className="tex tex-paper relative overflow-hidden bg-mist-pale py-24 md:py-32"
        >
          <figure className="quote-figure relative mx-auto max-w-3xl px-8 text-center" data-reveal>
            <blockquote className="t-quote text-moss">
              {/* verbatim client copy - one of the two quotes she offered for this
                  panel. Which one runs here is still hers to confirm. */}
              &ldquo;Listening to your own breath draws your attention inward and takes
              it away from external sounds. This is a meditation aid.&rdquo;
            </blockquote>
            <figcaption className="eyebrow mt-10">Rajalakshmi V</figcaption>
          </figure>
        </section>

        {/* A4b, second and last use: out of the quote and into what she offers. */}
        <ContinuityRule />

        {/* OFFERINGS
            Plain linen, not a photograph. A park frame sat behind this block for
            a while, the way ouranoyoga.com does it, but every wide photograph in
            the library is an indoor hall or a busy lawn, and under the 75% scrim
            the contrast floor demands they all collapse into grey. A backdrop
            you cannot see is a payload with no design in it.

            The client is sending replacement photographs and has already said
            the current ones "do not match" (00:57:25). When a calm wide frame
            arrives, put it back: absolute <img> at -z-10 under a bg-linen/75
            scrim, cards at bg-linen/92. 75% is a measured floor, not taste - at
            70% the standfirst fell to 4.40:1 and failed. */}
        <section className="bg-linen">
          <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32 lg:px-20 xl:px-32">
            {/* "Offerings" is her word and it is the heading, not a kicker over
                an invented headline. */}
            <div data-reveal>
              <h2 className="t-h2 text-moss">Offerings</h2>
              {/* `max-w-none` overrides .t-body's 55ch measure, and the wrapper
                  has no cap either: the sentence is 87 characters and wants
                  about 700px, so both had to go for it to hold one line from lg
                  up. It still wraps on a phone, which is correct. */}
              <p className="t-body mt-6 max-w-none text-ink/75">
                Start where you are. Every offering below leads to the same place, at a
                different door.
              </p>
            </div>

            {/* The brief's Home paragraph asks the page to "Include Yoga,
                Mindfulness, Corporate Well-being, Conscious Living, Chanting for
                Kids". They used to be a tracked row under the hero headline; the
                client had that removed and said to put them "in the last page
                somewhere but not here" (00:27:55), and this is somewhere.

                They sit here rather than in a section of their own because a
                visitor scrolling past two similar lists in a row is the "too
                much" she is trying to remove. These five are the SUBJECTS she
                teaches; the grid below is the WAYS IN. One block, two jobs.

                Names only. The section they came from carried a written line
                under each, and every one of those lines was ours, not hers.

                Full moss, no opacity step. It measured 3.99:1 at moss/85 back
                when a photograph sat behind this block, and small tracked caps
                need 4.5. The photograph is gone but the rule stands. */}
            {/* One per line on a phone, a wrapped row from sm up. The names are
                very different lengths - "Yoga" against "Corporate Well-being" -
                so wrapping them at 390px gave a ragged 2/2/1 block that read as
                a mistake. A single column scans in one pass. */}
            <ul
              className="pillar-row mt-10 border-t border-ink/15 pt-8 sm:flex sm:flex-wrap sm:gap-x-8 sm:gap-y-3 md:gap-x-12"
              data-reveal
            >
              {pillars.map((pillar) => (
                <li key={pillar.slug} className="label label-sm inline text-moss sm:inline-block">
                  {pillar.name}
                </li>
              ))}
            </ul>

            {/* gap-px over a tinted parent draws the hairline grid. Cards are
                linen at 92%, so the photograph reads through them rather than
                only in the gutters; card body text still measures 6.7:1. */}
            <ul className="offer-grid mt-16 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-3">
              {offerings.map((o) => (
                <li key={o.n}>
                  <Link
                    href={o.href}
                    className="group flex h-full flex-col bg-linen p-8 transition-colors duration-500 hover:bg-moss hover:text-linen md:p-10"
                  >
                    <span>
                      <span className="t-h3 block">{o.title}</span>
                      <span className="mt-3 block leading-relaxed opacity-75">{o.body}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* The client's own closing line, 27 July: "Last line - Begin your
            journey Inward - Book your session/ immersion". Home was the only
            page without it. */}
        <CtaBand
          body={`Classes run online and in person from ${site.locality}. Tell her where you are starting from and she will suggest where to begin.`}
          secondary={{ href: "/mentorship", label: "See the mentorship" }}
        />

      </main>

      <SiteFooter />
    </>
  );
}


