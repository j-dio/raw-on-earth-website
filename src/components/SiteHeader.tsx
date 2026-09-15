"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site, type NavItem } from "@/data/site";

/* A top-row item that carries a submenu. The trigger is a button, not a link,
   so the parent page is reached through the first entry in its own panel -
   a link that also opens a menu is ambiguous with a keyboard.

   No global listeners and no focus trap: Escape closes and hands focus back,
   and the panel closes when focus leaves the wrapper, which covers a click
   anywhere else on the page as well. */
function NavDropdown({ item, current }: { item: NavItem; current: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const btn = useRef<HTMLButtonElement>(null);
  const panelId = `nav-${item.href.replace(/\W+/g, "")}`;

  return (
    <div
      className="relative"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          btn.current?.focus();
        }
        if (e.key === "ArrowDown" && !open) {
          e.preventDefault();
          setOpen(true);
        }
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={btn}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="label group relative flex items-center gap-1.5 py-2 text-[0.72rem] text-ink"
      >
        {item.label}
        <span aria-hidden className={`text-[0.6rem] transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          &#9662;
        </span>
        <span
          aria-hidden
          className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100 ${
            current ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </button>

      <ul
        id={panelId}
        hidden={!open}
        className="absolute left-0 top-full z-50 min-w-[13rem] border border-ink/15 bg-linen py-2 shadow-[0_8px_24px_rgba(43,45,38,0.10)]"
      >
        {item.children?.map((child) => (
          <li key={child.href}>
            <Link
              href={child.href}
              onClick={() => setOpen(false)}
              aria-current={child.href === pathname ? "page" : undefined}
              className="label block px-5 py-3 text-[0.7rem] text-ink transition-colors hover:bg-sand/60"
            >
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  /* Tracks whether the page is still at the top. The bar is transparent over
     the first screen and takes a solid linen ground once past it, so the nav
     never sits on moving artwork. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close on navigation. Links are client-side now, so the overlay would
     otherwise stay open over the page it just took you to. */
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";

    /* Escape closes it, and focus moves into the panel so a keyboard visitor
       is not left behind the overlay tabbing through the page underneath. */
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // The only dark ground on this header is the moss full-screen overlay.
  const light = open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled && !open
          ? "bg-linen shadow-[0_1px_0_rgba(177,139,79,0.35)] md:bg-linen/92 md:backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      {/* Full-bleed, not a 1400px box: the row reads better with the whole
          viewport between the wordmark and the links. The bar also shrinks on
          scroll so it stops competing with the hero headline. */}
      <div
        className={`relative z-50 flex items-center justify-between px-6 transition-[height] duration-500 md:px-10 lg:px-14 2xl:px-20 ${
          scrolled ? "h-[68px]" : "h-24"
        }`}
      >
        <Link href="/" className={`transition-colors ${light ? "text-linen" : "text-ink"}`}>
          {/* The mark is painted from currentColor through an alpha mask, so it
              follows the same light/dark switch as the nav. The box keeps the
              supplied 1013x559 lockup at its true ratio. */}
          <span aria-hidden className="brand-mark mark-wordmark block h-12 w-[87px]" />
          <span className="sr-only">{site.name} &mdash; home</span>
        </Link>

        {/* Colour stays full ink - dimming it to ink/70 would put the label
            under 4.5:1 against the palest hero pixels. The current page keeps
            its underline drawn, which is the only state a visitor cannot get
            to by hovering. */}
        <nav aria-label="Primary" className="hidden items-center gap-x-7 xl:flex 2xl:gap-x-9">
          {nav.map((item) => {
            const current =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            if (item.children) return <NavDropdown key={item.href} item={item} current={current} />;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`label group relative py-2 text-[0.72rem] ${
                  light ? "text-linen" : "text-ink"
                }`}
              >
                {item.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                    current ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}

          {/* One standing action. Six labels plus the pill fit from xl now;
              it was held back to 2xl when the row carried nine. */}
          <Link
            href="/contact"
            className="label hidden rounded-full bg-moss px-6 py-3 text-[0.7rem] text-linen transition-colors duration-300 hover:bg-moss-deep xl:inline-flex"
          >
            Book a session
          </Link>
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
            <span
              className={`h-px w-full bg-current transition-transform ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-full bg-current transition-transform ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* The mobile nav is a full-screen overlay behind one button rather than
          a squeezed row. Submenus nest inside it as an indented list - a
          dropdown inside an overlay is one tap too many. */}
      <div
        id="overlay-nav"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-0 top-0 z-40 flex flex-col justify-center overflow-y-auto bg-moss px-8 py-28 xl:hidden"
      >
        <nav aria-label="Primary, full screen" className="mx-auto w-full max-w-md">
          <ul className="flex flex-col gap-1">
            {nav.map((item, i) => (
              <li key={item.href} className="border-b border-linen/15">
                <Link
                  href={item.href}
                  className="flex items-baseline justify-between gap-4 py-3 font-display text-3xl text-linen transition-colors hover:text-sand"
                  /* Items arrive in sequence when the panel opens. CSS, not
                     GSAP: the panel is created and destroyed on every open, so
                     the animation restarts by itself and there is no timeline
                     to keep in step with React. */
                  style={{ animation: `hero-rise 700ms cubic-bezier(0.22,1,0.36,1) ${60 + i * 45}ms both` }}
                >
                  {item.label}
                  <span aria-hidden className="eyebrow !text-sage text-[0.6rem]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Link>

                {/* The child that repeats its parent's href is dropped: the
                    big link above already goes there. */}
                {item.children ? (
                  <ul className="mb-3 flex flex-col gap-1 pl-5">
                    {item.children
                      .filter((child) => child.href !== item.href)
                      .map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="label flex min-h-11 items-center text-[0.72rem] text-linen/75 transition-colors hover:text-linen"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-4">
            <Link
              href="/contact"
              className="label inline-flex justify-center rounded-full bg-linen px-7 py-3.5 text-[0.74rem] text-moss"
            >
              Book a session
            </Link>
            <p className="text-sm text-linen/60">
              <a href={site.phoneHref} className="tap transition-colors hover:text-linen">
                {site.phone}
              </a>
              <span className="mx-2 text-linen/30">/</span>
              <a href={site.emailHref} className="tap transition-colors hover:text-linen">
                {site.email}
              </a>
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}
