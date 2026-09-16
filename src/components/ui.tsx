import type { ReactNode } from "react";

/* The small set of layout primitives every inner page is built from.

   They exist for one reason: eight pages written separately drift into eight
   different container widths, eight vertical rhythms and eight heading sizes.
   One file makes that impossible. Nothing here is clever - a Section is a
   <section> with the site's padding on it.

   Type roles are fixed in globals.css and are NOT re-decided per page:
   Cormorant Garamond for display, Cinzel for small tracked caps (.eyebrow /
   .label), Lato for running prose. */

/* ---------------------------------------------------------------------------
   SECTION - the one horizontal measure on the site. 1400px, matching Home.
   `wide` is for full-bleed media bands that only need the gutter.
   --------------------------------------------------------------------------- */
export function Section({
  children,
  className = "",
  wide = false,
  as: Tag = "section",
  id,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
  as?: "section" | "div" | "article";
  id?: string;
}) {
  return (
    <Tag id={id} className={className}>
      {/* Gutter measured off ouranoyoga.com: 128px at a 1280 viewport, so the
          content column is 1024 and a full fifth of the screen is air. Ours was
          40px, which is why the same page read as crowded next to theirs. The
          `wide` variant keeps its own looser frame for full-bleed strips. */}
      <div
        className={`mx-auto px-6 md:px-10 lg:px-20 xl:px-32 ${
          wide ? "max-w-[1700px]" : "max-w-[1280px]"
        }`}
      >
        {children}
      </div>
    </Tag>
  );
}

/* ---------------------------------------------------------------------------
   SECTION HEAD - eyebrow, heading, standfirst. The same three parts in the
   same order everywhere, which is what makes a nine-page site read as one
   site rather than nine templates.
   --------------------------------------------------------------------------- */
export function SectionHead({
  eyebrow,
  title,
  standfirst,
  align = "left",
  tone = "ink",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  standfirst?: ReactNode;
  align?: "left" | "centre";
  tone?: "ink" | "linen";
  className?: string;
}) {
  const centred = align === "centre";
  const light = tone === "linen";

  return (
    <div
      data-reveal
      className={`${centred ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow ? (
        <p className={`eyebrow ${light ? "!text-sage" : ""}`}>{eyebrow}</p>
      ) : null}
      <h2
        className={`t-h2 ${eyebrow ? "mt-5" : ""} ${light ? "text-linen" : "text-moss"}`}
      >
        {title}
      </h2>
      {standfirst ? (
        <div
          className={`t-body mt-8 ${centred ? "mx-auto" : ""} ${
            light ? "text-linen/75" : "text-ink/75"
          }`}
        >
          {standfirst}
        </div>
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   LEAF RULE - a mirrored laurel, not a hairline with a blob on it.

   The old version was two gradient rules either side of one symmetric teardrop,
   and it read as a widget rather than as drawing. This is the shape the printed
   botanical dividers actually use: a stem curving out from the centre to a tip,
   seven almond leaves alternating above and below it, each one shrinking and
   swept toward the tip, then the whole half mirrored.

   The geometry is generated, not hand-typed: leaf bases sample a cubic stem at
   even t, and each leaf is a two-quadratic almond on the stem normal rotated
   0.82rad toward the tip. Regenerate with scripts/leaf.mjs if the curve or the
   leaf count changes - do not nudge the numbers by hand, they stop agreeing
   with the stem.

   Sizes are in viewBox units on a 240x28 frame, so it scales to whatever width
   the caller gives it.
   --------------------------------------------------------------------------- */
const LAUREL_STEM = "M120 14C154 14.6 196 13 232 9.5";
const LAUREL_LEAVES =
  "M130.4 14.1Q131 22.7 139.6 24Q139 15.4 130.4 14.1ZM144.2 14.1Q151.9 12.9 152.4 5.1Q144.7 6.3 144.2 14.1ZM158.4 13.8Q159.1 20.7 166 21.5Q165.3 14.7 158.4 13.8ZM172.9 13.4Q178.9 12.3 179.1 6.3Q173.2 7.4 172.9 13.4ZM187.6 12.7Q188.2 17.8 193.4 18.3Q192.7 13.2 187.6 12.7ZM202.2 11.9Q206.4 11 206.4 6.7Q202.2 7.6 202.2 11.9ZM216.6 10.9Q217.1 14.2 220.5 14.4Q220 11.1 216.6 10.9Z";

export function LeafRule({
  className = "",
  tone = "gold",
}: {
  className?: string;
  tone?: "gold" | "linen";
}) {
  /* On linen the leaves are moss and the stem is gold - a gold leaf at this
     size loses its silhouette (measured on the hero). On a dark ground both go
     sage, because gold on ink is muddy. */
  const leaf = tone === "gold" ? "text-moss/85" : "text-sage";
  const stem = tone === "gold" ? "var(--color-gold)" : "var(--color-sage)";

  return (
    <svg
      aria-hidden
      viewBox="0 0 240 28"
      className={`h-auto w-full ${leaf} ${className}`}
      fill="currentColor"
    >
      {[false, true].map((flip) => (
        <g key={String(flip)} transform={flip ? "translate(240,0) scale(-1,1)" : undefined}>
          <path
            d={LAUREL_STEM}
            fill="none"
            stroke={stem}
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          <path d={LAUREL_LEAVES} />
        </g>
      ))}
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   BUTTON - an anchor, always. There is no client-side routing subtlety on this
   site and nothing here submits a form, so a <a> styled two ways covers every
   CTA. `solid` on light grounds, `ghost` on light, `light` on moss/ink.
   --------------------------------------------------------------------------- */
/* Measured off ouranoyoga.com at 1280: Lato 14px, 2px tracking, 12px/25px
   padding, 100px radius, 48px tall. `.label` already carries the face, size and
   tracking, so this only owns the box. */
const BTN_BASE =
  "label inline-flex min-h-12 items-center justify-center rounded-full px-7 text-center transition-colors duration-300";

const BTN_VARIANTS = {
  solid: "bg-moss text-linen hover:bg-moss-deep",
  ghost: "border border-ink/30 text-ink hover:border-moss hover:bg-moss/10",
  light: "border border-linen/60 text-linen hover:border-linen hover:bg-linen/10",
  linen: "bg-linen text-moss hover:bg-sand",
} as const;

export function Button({
  href,
  children,
  variant = "solid",
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof BTN_VARIANTS;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={`${BTN_BASE} ${BTN_VARIANTS[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

/* ---------------------------------------------------------------------------
   CTA BAND - the closing panel every inner page ends on. The design brief's
   own line, 27 July: "Last line - Begin your journey Inward - Book your
   session/ immersion". So this is the client's closer, not a template's.

   Ground is mist, not moss, since 2026-09-15. On a dark green ground this band
   made every page run pale, drop into dark green, then drop again into the dark
   footer - which is the "suddenly a darker tone comes" the client described
   (call, 00:46:22). The footer is now the only dark thing on a page.

   NO vertical rule down the middle. One used to run the full height of this
   panel, straight through the heading, and it is the exact thing the client
   pointed at: "do you see there is a line in the center? I do not want that
   line" (00:34:38). The line she DOES want is the short one between sections,
   which lives in ContinuityRule on the home page. Do not put this one back.
   --------------------------------------------------------------------------- */
export function CtaBand({
  eyebrow = "Begin your journey inward",
  title = "Book your session",
  body,
  primary = { href: "/contact", label: "Book a session" },
  secondary,
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  /* `external` opens the link in a new tab with the safe rel. The Journal
     closes on a Substack link, which is the only place this fires so far. */
  primary?: { href: string; label: string; external?: boolean };
  secondary?: { href: string; label: string; external?: boolean };
}) {
  return (
    <section className="tex tex-leaf relative overflow-hidden bg-mist text-ink">
      <div className="relative mx-auto max-w-3xl px-6 py-24 text-center md:px-10 md:py-32" data-reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="t-h2 mt-6 text-moss">{title}</h2>
        {body ? <p className="mx-auto mt-6 max-w-[52ch] leading-relaxed text-ink/80">{body}</p> : null}
        <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center sm:gap-3">
          <Button href={primary.href} variant="solid" external={primary.external}>
            {primary.label}
          </Button>
          {secondary ? (
            <Button href={secondary.href} variant="ghost" external={secondary.external}>
              {secondary.label}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   PROSE - long-form client copy. Used by About and the Journal, where the
   words are hers and the only job is to set them well. `max-w-[62ch]` is the
   measure; everything else is spacing.
   --------------------------------------------------------------------------- */
export function Prose({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`t-body space-y-7 text-ink/80 ${className}`}>{children}</div>
  );
}
