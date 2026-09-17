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

export default function EnsoMark({ className = "" }: { className?: string }) {
  /* HERO. Bleeds off the right of the home hero, behind the type.

     Below `lg` it is not a ring at all but the medallion the phone hero uses,
     driven by `--med` / `--med-gap` on `.hero` - 196px, measured against where
     her face sits in the crop and where the hero copy ends on a 390x844 phone.
     Do not fold that into a percentage: see CLAUDE.md.

     From `lg` up it is the ring, sized as a share of the hero block and capped
     so it cannot swallow a very wide screen. */
  return (
    <div
      aria-hidden
      className={`hero-ring brand-mark mark-enso-ring absolute left-1/2 top-[calc(100%_-_var(--med-gap)_-_var(--med)/2)] h-[var(--med)] w-[var(--med)] text-[#87a091] opacity-[0.25] lg:left-[85%] lg:top-[50%] lg:h-[min(70vw,1500px)] lg:w-[min(70vw,1500px)] lg:-translate-x-1/2 lg:-translate-y-1/2 ${className}`}
    />
  );
}
