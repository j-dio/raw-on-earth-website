import Link from "next/link";
import { site } from "@/data/site";
import { LeafRule } from "@/components/ui";

/* Footer, rebuilt to the reference 2026-09-16. ouranoyoga.com's footer CSS was
   read off the live page, not guessed:

     row width          90%, max-width: none   <- full width, no 1400px clamp
     columns            4 x 1/4, left aligned
     body               13px / 1.8
     column heading     h4, line-height 2.6
     bands              2, each with a 1px hairline top rule
     social icons       44px and 38px targets, transparent ground

   Two things carried over deliberately. The ground stays ink: the footer is the
   only dark thing on a page here (see CLAUDE.md) and the client's complaint was
   about pages dropping in and out of dark green, not about this. And the
   wordmark, strapline and founder line stay - they are the reason anyone reads
   the first column.

   The one thing that changed in substance: the columns no longer read `nav`.
   Repeating the header in smaller type is what made the old footer dead space.
   They are grouped by what a reader wants at the bottom of a page - the offer
   and how to reach her - and between them they still link every route, so
   nothing drops out of the crawlable path.

   Three columns, not the reference's four. A fourth carrying her corporate
   client list was built and removed on 2026-09-16: thirteen company names set
   as running text turned the quietest band on the site into the busiest one.
   The list is still hers and still cleared for publication - it wants a page
   with room, not a footer column.

   Three equal quarters would leave the last quarter empty, so the grid is
   asymmetric instead: the brand takes five of twelve columns on the left, the
   two lists sit in columns 8-9 and 10-12, and the gap between them is the
   deliberate one. That keeps both edges of a 90%-wide band occupied, which is
   what makes it read as full width rather than as a row that ran out.

   All facts read from src/data/site.ts, so the number here and the number in
   the JSON-LD cannot disagree. */

const OFFERINGS = [
  /* Her sketch's wording, same as the header group. The page behind "Private
     Classes" is still /mentorship - see the naming note in CLAUDE.md. */
  { label: "Private Classes", href: "/mentorship" },
  { label: "Workshops", href: "/workshops" },
  { label: "Community", href: "/community" },
  { label: "Gallery", href: "/community#gallery" },
];

/* Drawn, one stroke weight, one 24-unit box - no glyph font and no emoji. */
const ICONS = {
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.2" cy="6.8" r="1.15" fill="currentColor" stroke="none" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 10.5v6" />
      <path d="M8 7.4v.1" strokeLinecap="round" strokeWidth="2.2" />
      <path d="M12 16.5v-3.4a2.6 2.6 0 0 1 5.2 0v3.4" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M12 3.6a8.4 8.4 0 0 0-7.2 12.7L3.6 20.4l4.2-1.1A8.4 8.4 0 1 0 12 3.6Z" />
      <path d="M9.3 8.6c-.5.9-.2 2.1.6 3.2a7.6 7.6 0 0 0 2.6 2.3c1.1.5 2.1.6 2.7 0l-1.1-1.4-1.3.5a5.3 5.3 0 0 1-2.1-2.1l.6-1.2-1-1.3Z" />
    </>
  ),
};

const SOCIAL = [
  { label: "Instagram", href: site.social.instagram, icon: ICONS.instagram },
  { label: "LinkedIn", href: site.social.linkedin, icon: ICONS.linkedin },
  { label: "WhatsApp", href: site.whatsapp, icon: ICONS.whatsapp },
];

/* 44px is the touch-target floor and the reference's own icon box, so the two
   agree for once. */
function SocialLink({ label, href, icon }: (typeof SOCIAL)[number]) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      title={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-linen/20 text-linen/70 transition-colors duration-300 hover:border-sage hover:text-linen"
    >
      <span className="sr-only">{label}</span>
      <svg
        viewBox="0 0 24 24"
        className="h-[22px] w-[22px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        aria-hidden
      >
        {icon}
      </svg>
    </a>
  );
}

/* The reference runs 13px/1.8 on its footer links. Ours is 13px too, but the
   min-h-11 row below md keeps the tap target legal without spreading the
   desktop list out. */
const LINK =
  "flex min-h-11 items-center text-[13px] leading-[1.8] text-linen/70 transition-colors duration-300 hover:text-linen md:min-h-0 md:py-[3px]";

const HEADING = "label text-[13px] tracking-[0.18em] text-sage";

export default function SiteFooter() {
  return (
    <footer className="tex tex-weave relative overflow-hidden bg-ink text-linen">
      {/* 90% wide with no max-width is the reference's own row, and it is the
          thing that stops the footer looking like a boxed-in card. */}
      <div className="relative mx-auto w-[calc(100%-3rem)] pt-16 md:w-[90%] pb-10 md:pt-20">
        <div className="grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="md:col-span-2 lg:col-span-5 xl:col-span-4">
            <span aria-hidden className="brand-mark mark-wordmark block h-20 w-[145px] text-linen" />
            <span className="sr-only">{site.name}</span>
            <p className="t-lead mt-5 max-w-sm text-sand">
              {/* verbatim client copy */}
              {site.strapline}
            </p>
            <LeafRule className="mt-7 max-w-[220px]" tone="linen" />
            <p className="mt-7 text-[13px] leading-[1.8] text-linen/70">
              {site.founder} &mdash; {site.founderTitle}.
              <br />
              Taught in person and online.
            </p>
            {/* /about is linked from here now. It was in the corporate column,
                and that column is gone. */}
            <Link href="/about" className={`${LINK} mt-3`}>
              About her practice
            </Link>
          </div>

          <nav aria-labelledby="ft-offer" className="lg:col-span-3 lg:col-start-7 xl:col-start-6">
            <h2 id="ft-offer" className={HEADING}>
              Yoga &amp; Meditation
            </h2>
            <ul className="mt-5 md:space-y-1">
              {OFFERINGS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={LINK}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3 lg:col-start-10">
            <h2 className={HEADING}>Find Her At</h2>
            <address className="mt-5 text-[13px] not-italic leading-[1.8] text-linen/70">
              {site.locality}
              <br />
              {site.region}, India
            </address>
            <ul className="mt-2">
              <li>
                <a href={site.phoneHref} className={LINK}>
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={site.emailHref} className={LINK}>
                  {site.email}
                </a>
              </li>
              <li>
                <Link href="/contact" className={LINK}>
                  Send a message
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Second band, hairline rule above it - the reference's shape exactly,
          icons on the left. The copyright moves right on desktop because our
          band is full width and would otherwise leave three empty quarters. */}
      <div className="relative border-t border-linen/15">
        <div className="mx-auto flex w-[calc(100%-3rem)] flex-col md:w-[90%] gap-6 py-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            {SOCIAL.map((s) => (
              <SocialLink key={s.href} {...s} />
            ))}
          </div>
          {/* Small tracked caps are Montserrat's job everywhere else on the
              site; this line was Lato with the capitals typed into the string,
              and the brand name hard-coded next to a file that reads site.ts for
              everything else. Both fixed. The strapline stays until the client
              settles it: she asked for "Real. Awakening. Wellbeing." to come off
              the hero, and never said anything about the footer. */}
          <p className="label label-sm uppercase text-linen/60">
            © {new Date().getFullYear()} {site.name} — {site.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
