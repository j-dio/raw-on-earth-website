"use client";

import { useEffect, useState } from "react";

/* Nine top-level items, settled 2026-08-21. Do not reopen the count. */
const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Workshops", href: "/workshops" },
  { label: "Community", href: "/community" },
  { label: "Gallery", href: "/gallery" },
  { label: "Shop", href: "/shop" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Tracks whether the hero is still behind the header. The bar stays
     transparent over the hero and takes a solid linen ground once past it, so
     the nav never sits on moving artwork. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // The hero is a light sage-and-cream field, so ink is correct over it and
  // over the solid linen bar alike. The only dark ground on this header is the
  // moss full-screen overlay.
  const light = open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-linen shadow-[0_1px_0_rgba(177,139,79,0.35)] md:bg-linen/92 md:backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      {/* Full-bleed, not a 1400px box. Nine items packed into a centred column
          read as a dense band next to the wordmark; letting the row use the
          whole viewport is what buys the space between them. The bar also
          shrinks on scroll so it stops competing with the hero headline. */}
      <div
        className={`relative z-50 flex items-center justify-between px-6 transition-[height] duration-500 md:px-10 lg:px-14 2xl:px-20 ${
          scrolled ? "h-[68px]" : "h-24"
        }`}
      >
        <a href="/" className={`transition-colors ${light ? "text-linen" : "text-ink"}`}>
          {/* The mark is painted from currentColor through an alpha mask, so it
              follows the same light/dark switch as the nav. The box keeps the
              supplied 1013x559 lockup at its true ratio. */}
          <span aria-hidden className="brand-mark mark-wordmark block h-12 w-[87px]" />
          <span className="sr-only">Raw On Earth &mdash; home</span>
        </a>

        {/* Calmer than the first pass in three ways: tighter tracking (a wide
            track on nine items is what made the row shout), one size smaller,
            and a gold underline that grows on hover instead of the whole label
            fading. Colour stays full ink - dimming it to ink/70 would have put
            the label under 4.5:1 against the palest hero pixels. */}
        <nav aria-label="Primary" className="hidden items-center gap-x-8 xl:flex 2xl:gap-x-10">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`label group relative py-2 text-[0.72rem] ${
                light ? "text-linen" : "text-ink"
              }`}
            >
              {item.label}
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="overlay-nav"
          className={`label -m-3 flex items-center gap-3 p-3 text-[0.74rem] transition-colors xl:hidden ${
            light ? "text-linen" : "text-ink"
          }`}
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden className="flex w-6 flex-col gap-[5px]">
            <span className={`h-px w-full bg-current transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`h-px w-full bg-current transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {/* Nine items is heavy on a phone, so the mobile nav is a full-screen
          overlay behind one button rather than a squeezed row. */}
      <div
        id="overlay-nav"
        hidden={!open}
        className="fixed inset-0 top-0 z-40 flex flex-col justify-center bg-moss px-8 xl:hidden"
      >
        <nav aria-label="Primary, full screen" className="mx-auto w-full max-w-md">
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.href} className="border-b border-linen/15">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between gap-4 py-3 font-display text-3xl text-linen transition-colors hover:text-sand"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/contact"
            onClick={() => setOpen(false)}
            className="label mt-8 inline-flex rounded-full border border-linen px-7 py-3 text-[0.74rem] text-linen"
          >
            Book a Session
          </a>
        </nav>
      </div>
    </header>
  );
}
