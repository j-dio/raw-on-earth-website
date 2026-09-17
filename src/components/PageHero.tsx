
/* The masthead every inner page opens on. Home has its own full-bleed hero;
   the other eight share this one so the site reads as a single publication.

   Shape, and why:

   - Linen ground, not a photograph behind type. Eight pages of text over
     photography is where a calm site turns into a stock-image site, and the
     palette's light greens fail contrast over an uncontrolled image.
   - The page name is set as an .eyebrow above the H1 and doubles as the visible
     breadcrumb, so the trail Google reads (breadcrumbLd) and the trail a person
     reads are the same thing.
   - One H1 per page, and it lives here. Every other heading on an inner page is
     an H2 or lower.
   - `figure`, when given, is a full-bleed band UNDER the type rather than
     behind it. The picture still lands above the fold on a laptop and no text
     ever sits on it. */

import { CONTAINER, CONTAINER_WIDE } from "@/components/ui";

export default function PageHero({
  eyebrow,
  title,
  standfirst,
  figure,
}: {
  eyebrow: string;
  title: string;
  standfirst?: string;
  figure?: { src: string; alt: string; width: number; height: number };
}) {
  return (
    <section className="page-hero tex tex-paper relative overflow-hidden bg-linen pt-36 md:pt-44">
      {/* NO ENSO ON INNER MASTHEADS, and that is deliberate.

          It was a `.page-hero::after` rule until 2026-09-17, then an EnsoMark
          component, and is now nothing. A 620px circle cannot fit a 371px
          block, and this section clips with `overflow: hidden`, so on the
          shorter mastheads the arc was cut by a straight horizontal line -
          measured at 1440px, the circle's bottom sat at 124% of the /about
          masthead, 149% of /contact and 96% of /workshops.

          Two ways of moving it were tried the same day and both looked worse
          than the cut. Sizing it off the masthead's height broke the layout
          outright: percentage heights need a parent with a known height and
          this one is content-sized, so /about grew from 437px to 1877px.
          Anchoring the circle's centre to the bottom edge put the cut at the
          arc's widest point, which is geometrically right and still read
          wrong.

          Dropping it from the two shortest mastheads first left the mark on
          some routes and not others, which is worse than not having it. So it
          is off everywhere here. The home hero keeps its own - see
          EnsoMark - because that block is a full screen tall and has room.

          Bring it back when the mark has a crop that survives a 371px block,
          or when these mastheads get taller. The hero variant in EnsoMark is
          the reference for how it should look.
      {/* The padding-bottom is load-bearing: `.page-hero` sets a top padding
          only, and this block used to end on a LeafRule whose `mt-14 md:mt-20`
          was the gap. With the rule gone the standfirst sat flush against the
          section edge - measured 0px on /about and /contact. Same 56/80px. */}
      {/* CONTAINER, not a container of its own. This block ran
          `max-w-[1400px] px-6 md:px-10` while every Section under it ran the
          measured one, so from `lg` up the H1 sat 148px to the LEFT of every
          heading below it - 60px against 208px at 1440. Measured on /workshops
          once the masthead figure came off and the two headings became
          adjacent; it was on all six inner pages. */}
      <div className={`${CONTAINER} pb-14 md:pb-20`}>
        <div className="max-w-4xl">
          <p className="eyebrow page-hero-in" style={{ "--d": "80ms" } as React.CSSProperties}>
            {eyebrow}
          </p>
          <h1
            className="page-hero-title t-h1 mt-6 text-moss"
            style={{ "--d": "160ms" } as React.CSSProperties}
          >
            {title}
          </h1>
          {standfirst ? (
            <p
              className="page-hero-in t-lead mt-8 max-w-[54ch] text-ink/75"
              style={{ "--d": "320ms" } as React.CSSProperties}
            >
              {standfirst}
            </p>
          ) : null}
        </div>

      </div>

      {figure ? (
        /* Full-bleed and slightly taller than a strip: 21:9 on desktop so it
           reads as a plate rather than a banner. The files in /media/hero are
           pre-cropped to 21:9 from the originals, so `object-cover` only has to
           trim the sides on a phone rather than discard two thirds of the
           picture - which is why the mobile frame is 16:9 and not 4:3. `data-scrub-scale` gives it a
           slow push-in on scroll (Motion.tsx) - the one moving thing at the top
           of an inner page. */
        <div className="page-hero-in mt-12 overflow-hidden md:mt-16">
          {/* CONTAINER_WIDE, deliberately not the text rule. The figure is a
              full-bleed plate rather than a column - the same device the photo
              bands use through `Section wide` - so it runs past the type on
              purpose. Only the TYPE had to move to fix the jog. */}
          <div className={CONTAINER_WIDE}>
            <div className="relative overflow-hidden">
              <img
                src={figure.src}
                alt={figure.alt}
                width={figure.width}
                height={figure.height}
                loading="eager"
                decoding="async"
                data-scrub-scale
                /* Capped at 62vh as well as by ratio. At 1700px wide the 21:9
                   band is 728px tall, taller than a 720px laptop viewport, so
                   the masthead filled a whole screen with photograph and the
                   reader never saw that a page had begun underneath it. */
                className="aspect-[16/9] max-h-[62vh] w-full object-cover lg:aspect-[21/9]"
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
