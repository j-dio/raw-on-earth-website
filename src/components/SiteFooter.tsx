import Link from "next/link";
import { nav, site } from "@/data/site";
import { LeafRule } from "@/components/ui";

/* Footer keeps phone, email, Instagram, LinkedIn and Substack even though
   Contact is now its own page (design brief, 27 July notes).

   All of it reads from src/data/site.ts, so the number in the footer and the
   number in the JSON-LD cannot disagree. */

const SOCIAL = [
  { label: "Instagram", href: site.social.instagram },
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "Substack", href: site.social.substack },
];

export default function SiteFooter() {
  return (
    <footer className="tex tex-weave relative overflow-hidden bg-ink text-linen">
      <div className="relative mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <span aria-hidden className="brand-mark mark-wordmark block h-20 w-[145px] text-linen" />
            <span className="sr-only">{site.name}</span>
            <p className="mt-5 max-w-sm font-display text-2xl italic leading-snug text-sand">
              {/* verbatim client copy */}
              {site.strapline}
            </p>
            <LeafRule className="mt-8 max-w-xs" tone="linen" />
            <p className="mt-8 text-sm leading-relaxed text-linen/70">
              {site.founder} &mdash; {site.founderTitle}.
              <br />
              {site.locality}. Taught in person and online.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow !text-sage">Pages</p>
            <ul className="mt-5 space-y-0.5 md:mt-5 md:space-y-1.5">
              {nav
                .filter((item) => item.href !== "/")
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex min-h-11 items-center text-sm text-linen/75 transition-colors hover:text-linen md:min-h-0 md:py-1"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow !text-sage">Reach her</p>
            <ul className="mt-5 space-y-0.5 text-sm text-linen/75 md:mt-5 md:space-y-1.5">
              <li>
                <a href={site.phoneHref} className="flex min-h-11 items-center transition-colors hover:text-linen md:min-h-0 md:py-1">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={site.emailHref} className="flex min-h-11 items-center transition-colors hover:text-linen md:min-h-0 md:py-1">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex min-h-11 items-center transition-colors hover:text-linen md:min-h-0 md:py-1"
                >
                  WhatsApp
                </a>
              </li>
              {SOCIAL.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex min-h-11 items-center transition-colors hover:text-linen md:min-h-0 md:py-1"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-20 border-t border-linen/15 pt-8 text-xs tracking-[0.14em] text-linen/60">
          © {new Date().getFullYear()} RAW ON EARTH — REAL. AWAKENING. WELLBEING.
        </p>
      </div>
    </footer>
  );
}
