import { LeafRule } from "@/components/ui";

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
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="max-w-4xl">
          <p className="eyebrow page-hero-in" style={{ "--d": "80ms" } as React.CSSProperties}>
            {eyebrow}
          </p>
          <h1
            className="page-hero-title mt-6 font-display text-[clamp(2.6rem,7.5vw,5rem)] font-light leading-[0.98] tracking-[-0.005em] text-balance text-moss"
            style={{ "--d": "160ms" } as React.CSSProperties}
          >
            {title}
          </h1>
          {standfirst ? (
            <p
              className="page-hero-in mt-8 max-w-[54ch] font-display text-[clamp(1.15rem,2vw,1.5rem)] italic leading-snug text-balance text-ink/75"
              style={{ "--d": "320ms" } as React.CSSProperties}
            >
              {standfirst}
            </p>
          ) : null}
        </div>

        <LeafRule
          className="page-hero-in mt-14 md:mt-20"
          // eslint-disable-next-line react/jsx-no-duplicate-props
        />
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
          <div className="mx-auto max-w-[1700px] px-6 md:px-10">
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
