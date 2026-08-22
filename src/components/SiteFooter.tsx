/* Footer keeps phone, email, Instagram, LinkedIn and Substack even though
   Contact is now its own page (brief, 27 July notes).
   Email is still rawonearth@gmail.com: the move to a professional address is
   an open question with the client. */
const LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/raw_on_earth/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rajalakshmi-v-332707127/" },
  { label: "Substack", href: "https://rawonearth.substack.com/" },
];

const PAGES = ["About", "Services", "Workshops", "Community", "Gallery", "Shop", "Journal", "Contact"];

export default function SiteFooter() {
  return (
    <footer className="bg-ink text-linen">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <span aria-hidden className="brand-mark mark-wordmark block h-20 w-[145px] text-linen" />
            <span className="sr-only">Raw On Earth</span>
            <p className="mt-5 max-w-sm font-display text-2xl italic leading-snug text-sand">
              Work on yourself before you work for somebody else.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-linen/70">
              Rajalakshmi V — Wellness Architect. JP Nagar, Bangalore.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow !text-sage">Pages</p>
            <ul className="mt-5 space-y-2.5">
              {PAGES.map((p) => (
                <li key={p}>
                  <a href={`/${p.toLowerCase()}`} className="text-sm text-linen/75 transition-colors hover:text-linen">
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow !text-sage">Reach her</p>
            <ul className="mt-5 space-y-2.5 text-sm text-linen/75">
              <li>
                <a href="tel:+917892862634" className="transition-colors hover:text-linen">
                  +91 78928 62634
                </a>
              </li>
              <li>
                <a href="mailto:rawonearth@gmail.com" className="transition-colors hover:text-linen">
                  rawonearth@gmail.com
                </a>
              </li>
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="transition-colors hover:text-linen"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-20 border-t border-linen/15 pt-8 text-xs tracking-[0.14em] text-linen/50">
          © {new Date().getFullYear()} RAW ON EARTH — REAL. AWAKENING. WELLBEING.
        </p>
      </div>
    </footer>
  );
}
