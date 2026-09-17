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

          {/* The section owns the height (see above). The type column stops at
              col 11, not 12: running it to the container edge is what made the
              headline look jammed against the right of the frame. One spare
              column of air reads as composition rather than overflow. */}
          {/* The hero grid holds only the copy - she is an absolute layer behind it -
              so the container's own padding IS the type's position. From lg up
              the left and right padding are deliberately lopsided: 96/16 at lg
              and xl against the old 56/56, 160/0 at 2xl against 80/80. Each pair
              sums to what it replaced, so the column keeps its width and the
              headline stays on one line at 641-654px - it fills the column
              almost exactly, so any pair that does not sum will wrap it. Change
              them as a pair.

              That is 40px right below 1536 and 80px from 1536 up, where the
              container is capped at 1500 and centred, so a zero right padding
              still leaves 200px of air beside the type on a 1912 screen. The
              tablet range was judged right at 40px and is left alone. */}
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

                  Weight is 300, the same as every other Cormorant on the site.
                  It was 400 on the argument that dark-on-light needs less weight
                  than the reference's white-on-photograph - true in isolation,
                  but it left the page running two display weights, because the
                  type roles in globals.css are all 300. One face, one weight.

                  Re-measure on a real phone, not with `chrome --window-size`:
                  Chrome on Windows will not open a window under 500px, so a
                  390px screenshot is a crop of a 500px page. Use scripts/shot.mjs. */}
              <h1
                className="hero-in-title font-display text-[clamp(2.4rem,4.6vw,3.6rem)] font-light uppercase leading-[1.1] tracking-[0.094em] text-moss"
                style={{ "--d": "600ms" } as React.CSSProperties}
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
                style={{ "--d": "760ms" } as React.CSSProperties}
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
                style={{ "--d": "880ms" } as React.CSSProperties}
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
          /* Linen, not sand. Measured on ouranoyoga.com 2026-09-17, which is the
             site she keeps naming: its whole page runs on two grounds, #FFFFFF
             and #F5F5F5 - a four-point step - and nothing moves on scroll. Our
             page ran linen, sand, mist, linen, mist, which is four changes of
             ground and steps of up to 26 points of luminance. That, not the
             hardness of the edges, is what made it read as a stack of panels.
             Dropping sand takes the page to two grounds and one change. */
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

            {/* Stacked, a phone got three paragraphs and no picture on the
                screen straight after the hero - the measured drop-off point of
                the visit. The photograph leads on a phone: `.wellness-grid`
                under lg makes this column `display: contents`, so its children
                are ordered against the copy directly (globals.css). From lg up
                nothing changes - two columns, picture beside the words, which is
                the brief's layout.

                Her closing line sits under the picture in this column, so on a
                phone it lands after the copy rather than before the heading -
                the child ordering below is what keeps that true. */}
            <div className="wellness-media relative" data-reveal>
              {/* Plain <img>, not next/image: the optimiser is off for
                  Hostinger. Dimensions are on the tag so the column reserves
                  its height before the file lands.

                  A9, "zoom in where the photo has empty space top and bottom"
                  (call, 00:58:25). The source is 1500x2666, so `aspect-square`
                  plus `object-cover` crops 28% off each end and the subject
                  stays centred. Square, not taller: her closing line sits under
                  this picture and the two share the column's height. If a future
                  photograph puts the subject off centre, re-crop the file rather
                  than reaching for object-position: a CSS crop still ships the
                  whole tall file. */}
              <img
                src="/media/gallery/raji-28.webp"
                width={1500}
                height={2666}
                loading="lazy"
                decoding="async"
                alt="A practitioner sits in padmasana with eyes closed on a woven mat, surrounded by dry autumn leaves and forest trees."
                className="aspect-square w-full object-cover object-center"
              />

              {/* Her closing line, and her own placement for it. Two records
                  from 6 September say the same thing: the raw notes read "Move
                  breathe and become, below the photo", and at 00:33:42 she puts
                  it at the transition into the next section - "in this place
                  maybe we can write move breathe and become" - which is the seam
                  the continuity rule below straddles.

                  The same notes also say "remove move, breathe, become" one line
                  earlier. That is not a contradiction: it comes off the middle
                  of the wellness block, where it used to be a fourth paragraph,
                  and goes under the photograph. Set as display type it reads as
                  a caption on the image rather than as copy nobody finishes.

                  Cut on 2026-09-17 and restored the same day once the transcript
                  was checked. Do not remove it again without her. */}
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
          /* Same rhythm as every other band: 96/128. It ran 112/160, which was
             the only band on a different beat. The reference runs 75.875px top
             and bottom on nearly every section - one number, repeated - and the
             evenness is half of why it reads as one page. */
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
            <div className="max-w-2xl" data-reveal>
              <h2 className="t-h2 text-moss">Offerings</h2>
              <p className="t-body mt-6 text-ink/75">
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
            <ul
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-ink/15 pt-8 md:gap-x-12"
              data-reveal
            >
              {pillars.map((pillar) => (
                <li key={pillar.slug} className="label label-sm text-moss">
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


