import Reveal from "@/components/Reveal";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { offerings, pillars, stats, testimonials } from "@/data/home";

/* Home. Section order follows the reference one-page yoga template:
   hero -> practices -> about -> offerings -> quote -> stats -> testimonials -> CTA.
   Every image is a CSS placeholder (.ph / .ph-dark). No photography has been
   supplied yet; the slots below are sized for the real thing. */

export default function Home() {
  return (
    <>
      <Reveal />
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
          {/* The brief's vertical-line motif, doing an actual job: it lands in the
              gutter between her column and the type column. */}
          <div
            aria-hidden
            className="hero-in-rule absolute left-1/2 top-0 h-28 w-px origin-top md:h-36 lg:h-[44vh]"
            style={{ "--d": "420ms" } as React.CSSProperties}
          >
            <div className="hero-rule absolute inset-0 left-1/2 h-full w-px" />
          </div>


          {/* The section owns the height. Repeating min-h here and adding
              padding on top of it grew the hero past the viewport and pushed
              her below the fold. */}
          <div className="relative z-10 mx-auto flex h-full min-h-[100svh] max-w-[1400px] items-start px-6 pt-28 pb-16 md:px-10 lg:grid lg:grid-cols-12 lg:items-center lg:gap-8 lg:pt-20 lg:pb-20">
            <div className="hero-copy w-full text-center lg:col-span-6 lg:col-start-7 lg:text-left">
              <p className="eyebrow hero-in" style={{ "--d": "520ms" } as React.CSSProperties}>
                Real &middot; Awakening &middot; Wellbeing
              </p>

              <h1
                className="hero-in-title mt-5 font-display text-[3.2rem] font-light leading-[0.9] tracking-[0.02em] text-ink sm:text-[4.4rem] lg:text-[5.6rem] xl:text-[6.4rem]"
                style={{ "--d": "600ms" } as React.CSSProperties}
              >
                Raw on Earth
              </h1>

              <p
                className="hero-in mx-auto mt-7 max-w-xl font-display text-xl italic leading-snug text-moss sm:text-2xl lg:mx-0 lg:text-[1.75rem]"
                style={{ "--d": "760ms" } as React.CSSProperties}
              >
                {/* verbatim client copy - her strapline, runs through everything */}
                &ldquo;Work on yourself before you work for somebody else.&rdquo;
              </p>

              <div
                className="hero-in mt-12 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
                style={{ "--d": "880ms" } as React.CSSProperties}
              >
                <a
                  href="/contact"
                  className="rounded-full bg-moss px-8 py-4 text-[0.7rem] uppercase tracking-[0.24em] text-linen transition-colors hover:bg-ink lg:px-7 xl:px-9"
                >
                  Book a Session
                </a>
                <a
                  href="/workshops"
                  className="rounded-full border border-ink/35 px-8 py-4 text-[0.7rem] uppercase tracking-[0.24em] text-ink transition-colors hover:border-ink hover:bg-ink/5 lg:px-7 xl:px-9"
                >
                  Explore Workshops
                </a>
              </div>

              <ul
                className="hero-in mt-14 hidden flex-wrap items-center gap-x-6 gap-y-2 border-t border-ink/15 pt-6 lg:flex"
                style={{ "--d": "1000ms" } as React.CSSProperties}
              >
                {pillars.map((p) => (
                  <li key={p.slug} className="text-[0.62rem] uppercase tracking-[0.2em] text-moss">
                    {p.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* WHO SHE IS
            Lifted out of the hero on 2026-08-22: in portrait it was the block
            that squeezed the figure down to a stamp. On its own it can breathe,
            and the hero is left as a pure visual hook. Client copy, verbatim. */}
        <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <p
            className="mx-auto max-w-[34ch] text-center font-display text-2xl font-light leading-snug text-ink sm:max-w-[46ch] sm:text-[1.75rem] md:text-[2rem]"
            data-reveal
          >
            Rajalakshmi V is a Wellness Architect in Bangalore. Thirteen years of
            classical Hatha and Ashtanga Vinyasa, trained in Rishikesh and
            Dharamshala, taught to over 5,000 people and to teams at some of
            India&rsquo;s hardest-working organisations. Come here to put yourself
            back together before the week takes another piece.
          </p>
        </section>

        {/* PRACTICES MARQUEE */}
        <section id="practices" className="border-y border-ink/10 bg-moss py-6 text-linen">
          {/* Decoration only. The same five practices are readable as real text
              in the grid below, so screen readers lose nothing here. */}
          <h2 className="sr-only">What Raw On Earth teaches</h2>
          <div className="flex overflow-hidden" aria-hidden>
            <div className="marquee-track flex shrink-0 gap-14 whitespace-nowrap pr-14">
              {[...pillars, ...pillars].map((p, i) => (
                <span key={`${p.slug}-${i}`} className="font-display text-2xl tracking-[0.12em] md:text-3xl">
                  {p.name}
                  <span className="px-14 text-sand">&#10022;</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* PRACTICES GRID */}
        <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div data-reveal>
              <p className="eyebrow">Five practices</p>
              <p className="mt-6 font-display text-4xl font-light leading-tight md:text-5xl">
                One practice, taught five ways.
              </p>
              <p className="mt-6 max-w-md leading-relaxed text-ink/75">
                Whether you arrive on a mat, at a desk, or with a child on your hip,
                the work is the same. Slow down, breathe on purpose, and notice what
                is actually happening.
              </p>
            </div>

            <ul className="border-t border-ink/15">
              {pillars.map((p, i) => (
                <li
                  key={p.slug}
                  className="border-b border-ink/15 py-7"
                  data-reveal
                  style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
                >
                  <div className="flex items-baseline gap-5">
                    <span className="eyebrow shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl">{p.name}</h3>
                      <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-ink/70">{p.line}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* YOUR HOME OF WELLNESS - image on the right, per the brief */}
        <section className="bg-sand/45">
          <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-2">
            <div data-reveal>
              <p className="eyebrow">Your home of wellness</p>
              <h2 className="mt-6 font-display text-4xl font-light leading-[1.05] md:text-6xl">
                Strength, balance,
                <br />
                flexibility, breath,
                <br />
                <span className="italic text-moss">focus.</span>
              </h2>
              {/* PLACEHOLDER copy. The ~100-word block is on the outstanding
                  "RJ to share" list and must be replaced with her own words. */}
              <p className="mt-8 max-w-lg leading-relaxed text-ink/75">
                Classical Hatha builds the frame. Ashtanga Vinyasa gives it heat and
                rhythm. Mindful movement, meditation and mindfulness teach the rest:
                how to stay in a hard moment without leaving your body. Classes run
                online and in person, for one person or a room of them, and the pace
                is set by whoever is actually there.
              </p>
              <p className="mt-8 font-display text-3xl tracking-[0.06em] text-moss md:text-4xl">
                Move. Breathe. Become.
              </p>
              <a
                href="/about"
                className="mt-9 inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.24em] text-ink transition-opacity hover:opacity-60"
              >
                Read her story
                <span aria-hidden className="h-px w-10 bg-ink" />
              </a>
            </div>

            <div className="relative" data-reveal style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>
              <div
                className="ph ph-tag aspect-[4/5] w-full rounded-[2px]"
                role="img"
                aria-label="Placeholder for a photograph of Rajalakshmi teaching a class"
              />
              <div
                className="ph-dark absolute -bottom-10 -left-8 hidden aspect-square w-40 rounded-[2px] shadow-[0_18px_48px_rgba(36,30,25,0.28)] md:block lg:w-52"
                role="img"
                aria-label="Placeholder for a close detail photograph from a session"
              />
            </div>
          </div>
        </section>

        {/* OFFERINGS */}
        <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <div className="max-w-2xl" data-reveal>
            <p className="eyebrow">Offerings</p>
            <h2 className="mt-6 font-display text-4xl font-light leading-tight md:text-6xl">Six ways in.</h2>
            <p className="mt-6 leading-relaxed text-ink/75">
              Start where you are. Every offering below leads to the same place, at a
              different door.
            </p>
          </div>

          {/* gap-px over a dark parent draws the hairline grid. No borders to
              double up on adjacent cells. */}
          <ul className="mt-16 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-3">
            {offerings.map((o, i) => (
              <li key={o.n} data-reveal style={{ "--reveal-delay": `${(i % 3) * 110}ms` } as React.CSSProperties}>
                <a
                  href={o.href}
                  className="group flex h-full flex-col justify-between gap-10 bg-linen p-8 transition-colors duration-500 hover:bg-moss hover:text-linen md:p-10"
                >
                  <span className="eyebrow group-hover:!text-sand">{o.n}</span>
                  <span>
                    <span className="block font-display text-[1.75rem] leading-tight md:text-3xl">{o.title}</span>
                    <span className="mt-3 block text-[0.92rem] leading-relaxed opacity-75">{o.body}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* QUOTE PANEL - vertical line motif from the brief */}
        <section className="relative overflow-hidden bg-moss py-28 text-linen md:py-40">
          <div aria-hidden className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-linen/20" />
          <figure className="relative mx-auto max-w-3xl px-8 text-center" data-reveal>
            <blockquote className="font-display text-[1.7rem] font-light italic leading-[1.35] sm:text-4xl md:text-[2.9rem]">
              {/* verbatim client copy - one of the two quotes she offered for this
                  panel. Which one runs here is still hers to confirm. */}
              &ldquo;Listening to your own breath draws your attention inward and takes
              it away from external sounds. This is a meditation aid.&rdquo;
            </blockquote>
            <figcaption className="eyebrow mt-10 !text-sand">Rajalakshmi V</figcaption>
          </figure>
        </section>

        {/* STATS */}
        <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-28">
          <dl className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} data-reveal style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-6xl font-light leading-none text-moss md:text-7xl">
                    {s.value}
                  </span>
                  <span className="mt-4 block text-[0.72rem] uppercase tracking-[0.2em] text-ink/70">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* TESTIMONIALS */}
        <section className="bg-sand/45">
          <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
            <div className="max-w-xl" data-reveal>
              <p className="eyebrow">In their words</p>
              <h2 className="mt-6 font-display text-4xl font-light leading-tight md:text-5xl">
                Real moments, real people.
              </h2>
            </div>

            <ul className="mt-16 grid gap-10 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <li
                  key={t.name}
                  className="flex flex-col gap-6 border-t border-ink/25 pt-8"
                  data-reveal
                  style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
                >
                  <p className="font-display text-2xl italic leading-snug">&ldquo;{t.quote}&rdquo;</p>
                  <p className="mt-auto text-[0.72rem] uppercase tracking-[0.2em] text-ink/70">
                    {t.name} &mdash; {t.context}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="relative overflow-hidden">
          <div className="ph-dark absolute inset-0" aria-hidden />
          <div className="relative mx-auto max-w-3xl px-6 py-28 text-center md:py-40">
            <p className="eyebrow hero-in !text-sand" style={{ "--d": "520ms" } as React.CSSProperties}>
              Begin your journey inward
            </p>
            <h2
              className="mt-7 font-display text-4xl font-light leading-tight text-linen md:text-6xl"
              data-reveal
              style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            >
              Come as you are. <span className="italic text-sand">Raw.</span>
            </h2>
            <div
              className="mt-11 flex flex-wrap items-center justify-center gap-4"
              data-reveal
              style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
            >
              <a
                href="/contact"
                className="rounded-full bg-linen px-9 py-4 text-[0.7rem] uppercase tracking-[0.24em] text-ink transition-colors hover:bg-sand"
              >
                Book a Session
              </a>
              <a
                href="/workshops"
                className="rounded-full border border-linen/60 px-9 py-4 text-[0.7rem] uppercase tracking-[0.24em] text-linen transition-colors hover:border-linen hover:bg-linen/10"
              >
                Explore Workshops
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}


