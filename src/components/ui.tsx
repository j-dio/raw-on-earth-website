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
      <div className={`mx-auto px-6 md:px-10 ${wide ? "max-w-[1700px]" : "max-w-[1400px]"}`}>
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
        className={`font-display font-light leading-[1.06] text-balance ${
          eyebrow ? "mt-5" : ""
        } text-[clamp(2.1rem,4.4vw,3.4rem)] ${light ? "text-linen" : "text-moss"}`}
      >
        {title}
      </h2>
      {standfirst ? (
        <div
          className={`mt-6 max-w-[58ch] leading-relaxed ${centred ? "mx-auto" : ""} ${
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
   LEAF RULE - the hero's divider, promoted to a shared mark. A hairline split
   either side of the leaf from the business cards. Moss blade, gold rule: at
   16px a gold blade loses its silhouette and reads as a dot (measured on the
   hero before it was changed).
   --------------------------------------------------------------------------- */
export function LeafRule({
  className = "",
  tone = "gold",
}: {
  className?: string;
  tone?: "gold" | "linen";
}) {
  const rule = tone === "gold" ? "to-gold/55" : "to-linen/40";
  const blade = tone === "gold" ? "text-moss/75" : "text-sand";
  const midrib = tone === "gold" ? "var(--color-linen)" : "var(--color-moss)";

  return (
    <div aria-hidden className={`flex items-center gap-3 ${className}`}>
      <span className={`h-px flex-1 bg-gradient-to-r from-transparent ${rule}`} />
      <svg viewBox="0 0 24 24" className={`h-4 w-4 shrink-0 ${blade}`} fill="none" aria-hidden>
        <path d="M12 2.5C19.5 8 19.5 16 12 21.5 4.5 16 4.5 8 12 2.5Z" fill="currentColor" />
        <path d="M12 21.5V4" stroke={midrib} strokeWidth="1.1" strokeLinecap="round" opacity="0.55" />
      </svg>
      <span className={`h-px flex-1 bg-gradient-to-l from-transparent ${rule}`} />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   BUTTON - an anchor, always. There is no client-side routing subtlety on this
   site and nothing here submits a form, so a <a> styled two ways covers every
   CTA. `solid` on light grounds, `ghost` on light, `light` on moss/ink.
   --------------------------------------------------------------------------- */
const BTN_BASE =
  "label inline-flex items-center justify-center rounded-full px-8 py-[0.95rem] text-center text-[0.72rem] transition-colors duration-300";

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
   --------------------------------------------------------------------------- */
export function CtaBand({
  eyebrow = "Begin your journey inward",
  title = "Book your session",
  body,
  primary = { href: "/contact", label: "Book a Session" },
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
    <section className="relative overflow-hidden bg-moss text-linen">
      {/* The vertical divider motif the brief asks for, once more at the foot
          of the page. It draws itself downward on arrival (Motion.tsx). */}
      <div
        aria-hidden
        data-scrub-line
        className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-linen/15"
      />
      <div className="relative mx-auto max-w-3xl px-6 py-24 text-center md:px-10 md:py-32" data-reveal>
        <p className="eyebrow !text-sand">{eyebrow}</p>
        <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-light leading-[1.05] text-balance">
          {title}
        </h2>
        {body ? <p className="mx-auto mt-6 max-w-[52ch] leading-relaxed text-linen/75">{body}</p> : null}
        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Button href={primary.href} variant="linen" external={primary.external}>
            {primary.label}
          </Button>
          {secondary ? (
            <Button href={secondary.href} variant="light" external={secondary.external}>
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
    <div className={`max-w-[62ch] space-y-6 leading-[1.75] text-ink/80 ${className}`}>{children}</div>
  );
}
