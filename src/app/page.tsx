import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { offerings, pillars } from "@/data/home";

/* Home. Four blocks, and the order is the client's, not a template's:

     1. Hero              design brief, "Home": name, strapline, the five
                          practices, and the two CTAs, all named explicitly
     2. Your Home of      content PDF "Page 1 - Template 2", image on the right,
        Wellness          closing on "Move. Breathe. Become."
     3. Quote             content PDF "Page 1 Template 3", with the vertical
                          line motif the brief asks for
     4. Offerings         content PDF "Page 1 Template 4", six small tabs,
                          heading marked CINZEL in the PDF

   Both client documents describe the same four, in this order, and describe
   nothing else on this page. Cut on 2026-08-23: a practices marquee, a
   "one practice, taught five ways" grid, an intro paragraph, a stats band, a
   testimonials row and a closing CTA. None appeared in either document, all
   six carried copy nobody at Raw On Earth wrote, and three of them restated the
   five practices the hero already lists.

   Two of those blocks were not wrong, just on the wrong page: the 13+/5,000+/35+
   figures are filed under About -> Journey in the design brief, and the 27 July
   notes put testimonials under "Tab 2 - Second Page: About". Their data is still
   in src/data/home.ts, ready for that page.

   The one image slot on this page now holds a real client photograph. The
   .ph / .ph-dark placeholder system that stood in for it has been deleted from
   globals.css along with it - other pages can bring it back from git history if
   they need it before their photography arrives. */

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

          {/* The section owns the height (see above). The type column stops at
              col 11, not 12: running it to the container edge is what made the
              headline look jammed against the right of the frame. One spare
              column of air reads as composition rather than overflow. */}
          <div className="relative z-10 mx-auto flex h-full min-h-[100svh] max-w-[1500px] items-stretch px-6 pt-28 pb-16 md:px-10 lg:grid lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-14 lg:pt-20 lg:pb-20 2xl:px-20">
            {/* Portrait is a full-height flex column so the buttons can be
                pushed to the foot of the screen (see the button block below).
                Desktop drops back to normal flow inside the grid cell. */}
            <div className="hero-copy flex w-full flex-col text-center lg:col-span-6 lg:col-start-7 lg:block lg:text-left">
              {/* R-A-W is what the brand name stands for, so this is a named
                  kicker rather than a decorative eyebrow. No leading hairline:
                  the divider below is the block's one gold mark and a second
                  rule up here competed with it. */}
              <p className="eyebrow hero-in" style={{ "--d": "520ms" } as React.CSSProperties}>
                Real &middot; Awakening &middot; Wellbeing
              </p>

              {/* Fluid rather than four breakpoint jumps, capped at 5.5rem (88px)
                  because the old 6.4rem ran "Earth" into the right edge at 1440.

                  The 15.8vw ramp is measured on the phone end, where it matters:
                  at 390px the headline fits one line up to 64px, and the old
                  8.5vw/3.1rem floor was serving 49.6px - the hero's one big move,
                  a third smaller than the space allowed. 15.8vw gives 61.6px at
                  390 and still clears the measure at 320 (267px of 272). Above
                  ~560px the 5.5rem cap takes over and nothing changed there. */}
              {/* Moss, not ink. Ink is the neutral default and left the headline
                  reading as body copy set large; moss ties it to the mark and the
                  buttons. Measured 4.93:1 on the worst backdrop pixel under it -
                  clear of 4.5:1, and large text only needs 3:1. */}
              <h1
                className="hero-in-title mt-4 font-display text-[clamp(2.9rem,15.8vw,5.5rem)] font-light leading-[0.92] tracking-[-0.005em] text-balance text-moss"
                style={{ "--d": "600ms" } as React.CSSProperties}
              >
                Raw on Earth
              </h1>

              <p
                className="hero-in mx-auto mt-6 max-w-[30ch] font-display text-[clamp(1.2rem,1.85vw,1.55rem)] italic leading-snug text-balance text-ink/80 lg:mx-0 lg:max-w-none"
                style={{ "--d": "760ms" } as React.CSSProperties}
              >
                {/* verbatim client copy - her strapline, runs through everything */}
                &ldquo;Work on yourself before you work for somebody else.&rdquo;
              </p>

              {/* Tight above (the quote belongs to the headline), generous here:
                  the gap is what marks the switch from reading to acting.

                  Stacked and equal-width on a phone. Side by side they were 183px
                  and 223px, both centred, so neither edge lined up with anything -
                  the label decided the button's width, which is a desktop habit.
                  A column of two matched buttons is also the easier thumb target.
                  Back to a row from lg, where the labels fit side by side.

                  `mt-auto` pins the pair to the foot of the hero on a phone, so
                  the order down the screen is type, then her, then the actions.
                  That puts the two things a thumb has to reach inside the thumb's
                  reach, and gives the figure the middle of the screen instead of
                  the leftovers. The space it reserves is the `--med-gap` in
                  globals.css - the two numbers have to move together. */}
              <div
                className="hero-in mx-auto mt-auto flex w-full max-w-[17rem] flex-col items-stretch gap-3 lg:mx-0 lg:mt-11 lg:max-w-none lg:flex-row lg:items-center lg:justify-start"
                style={{ "--d": "880ms" } as React.CSSProperties}
              >
                <Link
                  href="/contact"
                  className="label rounded-full bg-moss px-8 py-[0.95rem] text-center text-[0.72rem] text-linen transition-colors duration-300 hover:bg-moss-deep"
                >
                  Book a Session
                </Link>
                <Link
                  href="/workshops"
                  className="label rounded-full border border-ink/30 px-8 py-[0.95rem] text-center text-[0.72rem] text-ink transition-colors duration-300 hover:border-moss hover:bg-moss/10"
                >
                  Explore Workshops
                </Link>
              </div>

              {/* Divider, then the five pillars on ONE line - never two.

                  The rule is split either side of a leaf rather than a single
                  border-top: the leaf is the business cards' own motif and it
                  gives the row a centre, which a plain hairline does not.

                  One line is a hard requirement, so the row cannot wrap: it is
                  `flex-nowrap`, and `justify-between` spreads the five labels
                  across exactly the rule's width, so both ends line up with it.
                  Only the type size is fluid; gap-x-2 is the floor the labels
                  never fall below. 1024px is the pinch point (the narrowest
                  width this block shows at) - if a sixth pillar is ever added,
                  re-measure there first. */}
              {/* Capped at 34rem, not the full column. The column is 648px at
                  1440 but the type's ink stops well short of it, so a rule run
                  to the column edge overhangs everything above it and the block
                  reads lopsided. 34rem is just past the strapline's own measure:
                  the rule ends where the longest line above it ends. */}
              <div
                className="hero-in mt-12 hidden lg:block lg:max-w-[34rem]"
                style={{ "--d": "1000ms" } as React.CSSProperties}
              >
                <div aria-hidden className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/55" />
                  {/* Pointed-oval blade with a midrib. Moss, not gold: at 16px
                      the gold blade lost its silhouette against the backdrop and
                      read as a dot. The rule either side stays gold. */}
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-moss/75" fill="none" aria-hidden>
                    <path d="M12 2.5C19.5 8 19.5 16 12 21.5 4.5 16 4.5 8 12 2.5Z" fill="currentColor" />
                    <path d="M12 21.5V4" stroke="var(--color-linen)" strokeWidth="1.1" strokeLinecap="round" opacity="0.55" />
                  </svg>
                  <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/55" />
                </div>

                <ul className="mt-5 flex flex-nowrap items-center justify-between gap-x-2 whitespace-nowrap">
                  {/* Lato, NOT Cinzel, and the one exception to the type roles in
                    globals.css. This row is pinned to one line inside a fixed
                    measure, so its size is decided by the width, not by taste:
                    Cinzel is the wider face and fitting five labels in it drove
                    the computed size to 7.4px, where an inscriptional capital
                    greys out completely. Lato holds the same row at 8-9.6px and
                    stays legible.

                    The ramp is 0.75vw, not 0.62vw. Floor and cap are unchanged;
                    only the slope between them is steeper, because 0.62vw never
                    reached the cap at a width a laptop actually uses - 1280 and
                    1440 both resolved to the 8px floor, and the five labels
                    measure 403px of ink at 8px inside a 544px rule, so a
                    quarter of the row was empty. At the 9.6px cap they measure
                    ~484px and still clear the four 8px gaps. 1024 is the pinch
                    point and is untouched: 0.75vw is 7.7px there, so the floor
                    still wins, which is all the 440px rule at that width can
                    hold. */}
                  {pillars.map((p) => (
                    <li key={p.slug} className="text-[clamp(0.5rem,0.75vw,0.6rem)] uppercase tracking-[0.12em] text-moss">
                      {p.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* YOUR HOME OF WELLNESS - image on the right, per the brief */}
        <section className="wellness bg-sand/45">
          {/* `lg:items-center`, not top-aligned. The photograph is 2:3 and the
              copy is not: at 1280 the column is 572px wide, so the frame is
              858px tall against ~490px of copy. Top-aligned, all 250-odd px of
              the difference pooled under "Move. Breathe. Become." as one blank
              corner of sand, which reads as copy that ran out rather than as
              composition. Centred, the same air splits either side of the copy
              block. The overhang below is unaffected: the image still sets the
              row height and still hangs -mb-28 past it. */}
          <div className="mx-auto grid max-w-[1400px] items-start gap-14 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-2 lg:items-center lg:pb-0">
            <div className="wellness-copy" data-reveal>
              {/* VERBATIM client copy, content PDF "Page 1 - Template 2". Every
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
              <h2 className="font-display text-4xl font-light leading-[1.1] text-moss md:text-5xl lg:text-[3.4rem]">
                Your Home of Wellness
              </h2>

              <div className="mt-8 max-w-[52ch] space-y-6 leading-relaxed text-ink/80">
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

              {/* Her closing line, and the last thing in this template before the
                  image note. It is set as display type rather than a fourth
                  paragraph because that is the job it does. */}
              <p className="mt-10 font-display text-3xl italic text-moss md:text-4xl">
                Move. Breathe. Become.
              </p>
            </div>

            {/* The frame hangs past the tinted band and onto the quote panel
                below, which is the move from ouranoyoga.com: measured there at
                ~106px of a 816px frame, and it lands at 101-106px here.

                Built as a fixed -mb-28 against `lg:pb-0` on the container, NOT
                as a percentage. A percentage margin resolves against the
                column's WIDTH, and at 1024 that shrank the media column below
                the copy column's height - at which point the copy sets the row
                and the overhang silently disappears. The fixed pair holds at
                every width from 1024 up. */}
            <div className="wellness-media relative lg:-mb-28 lg:-mt-8" data-reveal>
              {/* Client photograph, graded to the section - the source frame is
                  a bright green park at golden hour, which fought a palette
                  built on moss type and a sand ground. Desaturated to 45%, the
                  remaining green pulled toward sage, split-toned walnut/linen
                  and lifted to a matte curve. Grade values are in git history.

                  Plain <img>, not next/image: the optimiser is off for
                  Hostinger, so next/image would add a component and give
                  nothing back. Dimensions are on the tag so the column reserves
                  its height before the file lands and the section does not jump.

                  2:3, the photograph's native aspect and the same ratio
                  ouranoyoga.com uses in this block (measured: 544x816), so the
                  full frame is used and nothing is cropped away.

                  The inset placeholder square that sat here is gone. The
                  content PDF asks for one image in this template and one
                  photograph arrived; a lone CSS placeholder beside a real
                  photograph looks like a bug, not a slot. */}
              <img
                src="/wellness/rajalakshmi-practice.jpg"
                width={1400}
                height={2096}
                loading="lazy"
                decoding="async"
                alt="A yoga practitioner in a low crescent lunge on a mat under trees, back arched and face lifted into the morning light."
                className="aspect-[2/3] w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* QUOTE PANEL - vertical line motif from the brief */}
        <section className="tex tex-weave relative overflow-hidden bg-moss py-28 text-linen md:py-40">
          <div aria-hidden className="quote-rule absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-linen/20" />
          <figure className="quote-figure relative mx-auto max-w-3xl px-8 text-center" data-reveal>
            <blockquote className="font-display text-[1.7rem] font-light italic leading-[1.35] sm:text-4xl md:text-[2.9rem]">
              {/* verbatim client copy - one of the two quotes she offered for this
                  panel. Which one runs here is still hers to confirm. */}
              &ldquo;Listening to your own breath draws your attention inward and takes
              it away from external sounds. This is a meditation aid.&rdquo;
            </blockquote>
            <figcaption className="eyebrow mt-10 !text-sand">Rajalakshmi V</figcaption>
          </figure>
        </section>

        {/* OFFERINGS */}
        <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          {/* The content PDF marks this heading, and only this heading, as
              Cinzel. It was running as a 0.78rem kicker over an invented
              headline ("Six ways in.") - which honoured the letter of the note
              in the one place the face is too small to read, and put words in
              her mouth in the other. The word she wrote is the heading now, set
              in the face she asked for, at a size it survives. */}
          <div className="max-w-2xl" data-reveal>
            <h2 className="label text-[clamp(2rem,4.5vw,3.25rem)] leading-tight text-moss">Offerings</h2>
            <p className="mt-6 leading-relaxed text-ink/75">
              Start where you are. Every offering below leads to the same place, at a
              different door.
            </p>
          </div>

          {/* gap-px over a dark parent draws the hairline grid. No borders to
              double up on adjacent cells. */}
          <ul className="offer-grid mt-16 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-3">
            {offerings.map((o) => (
              <li key={o.n}>
                <Link
                  href={o.href}
                  className="group flex h-full flex-col justify-between gap-10 bg-linen p-8 transition-colors duration-500 hover:bg-moss hover:text-linen md:p-10"
                >
                  <span className="eyebrow group-hover:!text-sand">{o.n}</span>
                  <span>
                    <span className="block font-display text-[1.75rem] leading-tight md:text-3xl">{o.title}</span>
                    <span className="mt-3 block text-[0.92rem] leading-relaxed opacity-75">{o.body}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}


