"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerNav, site, type HeaderNavItem, type NavItem } from "@/data/site";

/* A top-row item that carries a submenu. The trigger is a button, not a link,
   so the parent page is reached through the first entry in its own panel -
   a link that also opens a menu is ambiguous with a keyboard.

   Opens on hover, which is what the reference does (measured on
   ouranoyoga.com 2026-09-16: `.nav li:hover > ul`). Click still toggles, for a
   hybrid laptop and for anyone who expects a button to do something.

   The close is delayed. The panel sits under the trigger with no gap, but a
   mouse cutting the corner between the label and the row it is aiming at still
   leaves the wrapper for a frame or two; 140ms is enough to cover that and
   short enough that the panel never feels stuck open.

   No global listeners and no focus trap: Escape closes and hands focus back,
   and the panel closes when focus leaves the wrapper, which covers a click
   anywhere else on the page as well. */
function NavDropdown({
  item,
  current,
  scrolled,
  light,
}: {
  item: HeaderNavItem;
  current: boolean;
  scrolled: boolean;
  light: boolean;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const btn = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = `nav-${item.label.replace(/\W+/g, "").toLowerCase()}`;

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  // Always clear on unmount, or a route change mid-hover leaves a live timer.
  useEffect(() => cancelClose, []);

  const hoverOpen = () => {
    cancelClose();
    setOpen(true);
  };

  const hoverClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  return (
    <div
      className="relative"
      onMouseEnter={hoverOpen}
      onMouseLeave={hoverClose}
      onFocus={cancelClose}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          cancelClose();
          setOpen(false);
          btn.current?.focus();
        }
        if (e.key === "ArrowDown" && !open) {
          e.preventDefault();
          hoverOpen();
        }
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          cancelClose();
          setOpen(false);
        }
      }}
    >
      <button
        ref={btn}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? hoverClose() : hoverOpen())}
        className={`label group relative flex items-center gap-2 py-2 transition-[font-size,color] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled ? "text-[0.72rem]" : "text-[0.85rem]"
        } ${light ? "text-linen" : "text-moss"}`}
      >
        {item.label}
        {/* Drawn, not the &#9662; character. The glyph rendered at a tenth of a
            line and sat below the eye entirely; a stroked chevron holds its
            weight next to the label at any size, and rotates cleanly. */}
        <svg
          aria-hidden
          viewBox="0 0 12 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-[transform,color,width] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            scrolled ? "w-[9px]" : "w-[11px]"
          } ${open ? "rotate-180 text-gold" : light ? "text-linen/60" : "text-ink/60"}`}
        >
          <path d="M1 1.75 6 6.25 11 1.75" />
        </svg>
        {/* The trigger draws its own underline while the panel is down, so the
            top row still says which item you are inside of. */}
        <span
          aria-hidden
          className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100 ${
            current || open ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </button>

      {/* Sits flush under the trigger - a gap here is a hover the mouse falls
          through. The gold hairline on top continues the trigger's underline
          into the sheet, so the two read as one object. */}
      <ul
        id={panelId}
        data-open={open}
        aria-hidden={!open}
        className="nav-panel absolute left-0 top-full z-50 min-w-[14.5rem] origin-top border border-moss/12 border-t-2 border-t-gold bg-linen py-2 shadow-[0_14px_34px_-12px_rgba(36,30,25,0.28)]"
      >
        {item.children?.map((child, i) => {
          const active = child.href === pathname;
          return (
            <li
              key={child.href}
              /* Rows settle after the sheet, in order. Inline because the delay
                 is per index and there is no timeline to keep in step with. */
              style={{ transitionDelay: open ? `${110 + i * 55}ms` : "0ms" }}
            >
              <Link
                href={child.href}
                tabIndex={open ? undefined : -1}
                onClick={() => {
                  cancelClose();
                  setOpen(false);
                }}
                aria-current={active ? "page" : undefined}
                className={`label label-sm block px-5 py-3 transition-colors duration-200 hover:bg-mist hover:text-moss ${
                  active ? "text-moss" : "text-ink"
                }`}
              >
                {child.label}
              </Link>
            </li>
          );
        })}
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
    /* Two thresholds, not one. The bar shrinks at 120px and only grows back
       below 60px, so the 60px between them is a dead band - a scroll that
       stops near the trigger cannot sit there flipping the whole header back
       and forth.

       The single 40px threshold this replaced is what made the change feel
       abrupt: a flick of the wheel was enough to fire every transition in the
       header at once, before the visitor had really started scrolling. */
    const onScroll = () =>
      setScrolled((was) => (was ? window.scrollY > 60 : window.scrollY > 120));
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

  // Both the logo and nav links sit on the dark hero background, so they must be light when at the top.
  const light = open || !scrolled;
  const logoLight = open || !scrolled;

  const desktopNav = headerNav.filter((item) => item.href !== "/");
  const showCta = pathname !== "/" || scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled && !open
          ? "bg-linen shadow-[0_1px_0_rgba(177,139,79,0.35)] md:bg-linen/92 md:backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      {/* Full-bleed, not a 1400px box: the row reads better with the whole
          viewport between the wordmark and the links. The bar also shrinks on
          scroll so it stops competing with the hero headline. */}
      <div
        className={`relative z-50 flex items-center justify-between px-6 transition-[height] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:px-10 lg:px-14 2xl:px-20 ${
          scrolled ? "h-[68px]" : "h-24"
        }`}
      >
        <Link href="/" className={`transition-colors ${logoLight ? "text-linen" : "text-ink"}`}>
          {/* The mark is painted from currentColor through an alpha mask, so it
              follows the same light/dark switch as the nav. The box keeps the
              supplied 1013x559 lockup at its true ratio. */}
          <span aria-hidden className="brand-mark mark-wordmark block h-12 w-[87px]" />
          <span className="sr-only">{site.name} &mdash; home</span>
        </Link>

        {/* Colour stays full ink - dimming it to ink/70 would put the label
            under 4.5:1 against the palest hero pixels. The current page keeps
            its underline drawn, which is the only state a visitor cannot get
            to by hovering.

            The row is sized by scroll position, not fixed. Over the hero it is
            13.6px on a 44px gap, which is the size it has to be when it is the
            only type at the top of a very quiet page. Once the bar shrinks it
            steps down to 11.5px on a 28px gap and gets out of the way. The two
            move together with the bar's own height. */}
        <nav
          aria-label="Primary"
          className="hidden items-center xl:flex"
        >
          {/* Home is dropped from this row on purpose. The wordmark to the left
              is the way back, which is the oldest convention on the web and
              what the reference does - ouranoyoga carries no Home item either
              (measured 2026-09-16). The full-screen overlay still lists it:
              there the wordmark is small and sits behind the panel, so a
              labelled row is the only obvious route home on a phone.

              The links carry their own gap so the button beside them can
              collapse to nothing without leaving a hole where its gap was. */}
          <div
            className={`flex items-center transition-[column-gap] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              scrolled ? "gap-x-7 2xl:gap-x-9" : "gap-x-11 2xl:gap-x-14"
            }`}
          >
            {desktopNav.map((item) => {
              /* A group has no page of its own, so it counts as current when the
                 visitor is on any page inside it. */
              const current = item.children
                ? item.children.some((child) => pathname.startsWith(child.href.split("#")[0]))
                : item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href!);

              if (item.children)
                return (
                  <NavDropdown key={item.label} item={item} current={current} scrolled={scrolled} light={light} />
                );

              return (
                <Link
                  key={item.label}
                  href={item.href!}
                  aria-current={current ? "page" : undefined}
                  className={`label group relative py-2 transition-[font-size,color] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    scrolled ? "text-[0.72rem]" : "text-[0.85rem]"
                  } ${light ? "text-linen" : "text-moss"}`}
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
          </div>

          {/* One standing action, and the only thing that moves the row.

              Over the hero it has no width at all, so the links sit hard against
              the right edge of the page. On scroll it opens out from the right
              and the links are pushed left to make room - the bar rearranging
              itself once, rather than a button blinking into a gap that was
              being held for it all along.

              The two halves of that are staged so the pill is never caught
              half-clipped - see `.nav-cta` in globals.css. `max-width`, not
              `width`: the pill is sized by its own text, and a max-width large
              enough to clear it animates without anyone having to measure the
              label.

              On the homepage it waits for the scroll for a second reason: the
              hero carries its own "Book a session" and the two sat about 400px
              apart on the first screen, which reads as a mistake rather than as
              emphasis. Every other page has no such button above the fold, so
              there it is open from the start. */}
          <div className="nav-cta" data-show={showCta}>
            <Link
              href="/contact"
              tabIndex={showCta ? undefined : -1}
              aria-hidden={!showCta}
              className="label label-sm ml-8 inline-flex whitespace-nowrap rounded-full bg-moss px-6 py-3 text-linen transition-colors duration-300 hover:bg-moss-deep"
            >
              Book a session
            </Link>
          </div>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="overlay-nav"
          className={`label label-sm -m-3 flex items-center gap-3 p-3 transition-colors xl:hidden ${
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
            {headerNav.map((item, i) => {
              /* Items arrive in sequence when the panel opens. CSS, not GSAP:
                 the panel is created and destroyed on every open, so the
                 animation restarts by itself and there is no timeline to keep
                 in step with React. */
              const rise = {
                animation: `hero-rise 700ms cubic-bezier(0.22,1,0.36,1) ${60 + i * 45}ms both`,
              };

              return (
                <li key={item.label} className="border-b border-linen/15">
                  {/* A group has no page of its own, so it is a heading here,
                      not a link. The three destinations under it are the taps.
                      No accordion: a dropdown inside an overlay is one tap too
                      many, and this list is short enough to sit open. */}
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="t-h3 flex items-baseline justify-between gap-4 py-3 text-linen transition-colors hover:text-sand"
                      style={rise}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <p
                      className="t-h3 flex items-baseline justify-between gap-4 py-3 text-linen"
                      style={rise}
                    >
                      {item.label}
                    </p>
                  )}

                  {item.children ? (
                    <ul className="mb-3 flex flex-col gap-1 pl-5">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="label label-sm flex min-h-11 items-center text-linen/75 transition-colors hover:text-linen"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>

          <div className="mt-10 flex flex-col gap-4">
            <Link
              href="/contact"
              className="label label-sm inline-flex justify-center rounded-full bg-linen px-7 py-3.5 text-moss"
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
