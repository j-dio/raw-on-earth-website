/* The enso, in one place.

   It used to exist twice, in two different technologies: the home hero drew it
   as a `<div>` with a long Tailwind class list in page.tsx, and every inner
   masthead drew it as a `.page-hero::after` pseudo-element in globals.css.
   Same mark, same mask file, two sets of numbers - so tuning one never touched
   the other, and a fix for the inner pages had to be written per route.

   Both variants now size themselves off the BLOCK THEY SIT IN, using
   percentages, rather than off the viewport with `vw`. That is the whole point
   of the rewrite: a `vw` size changes with the browser window, so the same page
   rendered differently on a 1280px laptop and a 1912px one and neither was
   wrong. A percentage of the parent holds its proportion at every width.

   Both are `aria-hidden`. The mark is paper, not a logo - the wordmark in the
   header is the logo, and this is the texture behind the type. */

export type EnsoVariant = "hero" | "masthead";

export default function EnsoMark({
  variant,
  className = "",
}: {
  variant: EnsoVariant;
  className?: string;
}) {
  /* HERO. Bleeds off the right of the home hero, behind the type.

     Below `lg` it is not a ring at all but the medallion the phone hero uses,
     driven by `--med` / `--med-gap` on `.hero` - 196px, measured against where
     her face sits in the crop and where the hero copy ends on a 390x844 phone.
     Do not fold that into a percentage: see CLAUDE.md.

     From `lg` up it is the ring, sized as a share of the hero block and capped
     so it cannot swallow a very wide screen. */
  if (variant === "hero") {
    return (
      <div
        aria-hidden
        className={`hero-ring brand-mark mark-enso-ring absolute left-1/2 top-[calc(100%_-_var(--med-gap)_-_var(--med)/2)] h-[var(--med)] w-[var(--med)] text-[#87a091] opacity-[0.25] lg:left-[85%] lg:top-[50%] lg:h-[min(70vw,1000px)] lg:w-[min(70vw,1000px)] lg:-translate-x-1/2 lg:-translate-y-1/2 2xl:h-[min(70vw,1400px)] 2xl:w-[min(70vw,1400px)] ${className}`}
      />
    );
  }

  /* MASTHEAD. The faint mark on every inner page.

     Sized by WIDTH - `min(46vw, 620px)` - which is the original rule and the
     reason it is already uniform: from 1348px up every route draws the same
     620px circle, whatever that page's masthead contains.

     A height-based version was tried on 2026-09-17 and reverted the same hour.
     `h-[118%]` resolves against a parent whose own height is content-driven,
     so the percentage had nothing to resolve against and the masthead grew
     from 437px to 1877px on /about. Percentage heights need a parent with a
     known height; `.page-hero` does not have one.

     It bleeds off the top and the right, and `.page-hero` clips it. On a short
     masthead - /contact is the shortest - the bottom of the arc is cut. That
     is the trade for one size everywhere, and one size everywhere is what
     makes the routes look related.

     0.06 opacity against the hero's 0.25. This one sits behind dark type on
     linen; that one behind light type on a photograph. */
  return (
    <div
      aria-hidden
      className={`brand-mark mark-enso-ring pointer-events-none absolute right-[-10%] top-[-18%] z-0 aspect-square w-[min(46vw,620px)] text-moss opacity-[0.06] ${className}`}
    />
  );
}
