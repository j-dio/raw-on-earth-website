"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerSmoothScroll } from "@/lib/smooth-scroll";

/* All scroll-driven motion on the site, in one client component.

   It is mounted once in the root layout and re-runs on every route change
   (`pathname` is the effect's dependency), because navigation is client-side:
   the layout does not remount, so without that dependency the second page a
   visitor opens would have no triggers at all.

   Pages do not import GSAP. They mark elements with data attributes and this
   file decides what the motion is - which is what keeps eight pages from
   growing eight different easings. The vocabulary:

     data-reveal            fade and rise on arrival
     data-reveal-stagger    the element's DIRECT CHILDREN arrive in sequence
     data-parallax="60"     scrub the element from +60px to -60px (desktop only)
     data-scrub-scale       slow push-in on an image across its own scroll span
     data-scrub-line        a rule draws itself downward (the brief's motif)
     data-scroll-p          publish --p, 0 -> 1, across the element's own span,
                            so the rest of the effect can be written in CSS
     data-lines             split a heading into lines and uncover them upward
     data-count="5000"      count a figure up on arrival

   Rules this file keeps to, from CLAUDE.md:

   - The resting state is the VISIBLE state. Nothing here is what makes content
     appear. `js-reveal` (globals.css) is what hides the start states, and it is
     only ever added by this file - so with JS off, or if this module fails to
     load, every page renders complete and static.
   - Reduced motion is not bolted on afterwards. gsap.matchMedia() gates every
     tween, so `(prefers-reduced-motion: reduce)` never registers them at all.
   - Slow, and few things at once. Nothing bounces; every ease decelerates. */
gsap.registerPlugin(ScrollTrigger);

/* One decelerating curve for the whole site. Editorial pacing: things arrive
   and settle, they do not spring. */
const EASE = "power3.out";

/* Split a heading's text into word spans, then group the words into lines by
   their measured offsetTop and wrap each line in a clipping mask.

   Measured, not guessed: where the line breaks fall depends on the font, the
   width and the text, so the only honest way to find them is to lay the words
   out and read back their positions. Runs once per element, after fonts are
   ready (see the refresh at the bottom).

   GSAP's own SplitText is a paid plugin; this is the twenty lines of it that
   this site actually uses. */
function splitLines(el: HTMLElement): HTMLElement[] {
  const original = el.textContent ?? "";
  if (!original.trim()) return [];

  el.textContent = "";
  const words = original.trim().split(/\s+/).map((word) => {
    const span = document.createElement("span");
    span.textContent = word;
    span.style.display = "inline-block";
    el.append(span, document.createTextNode(" "));
    return span;
  });

  const lines: HTMLElement[][] = [];
  let top: number | null = null;
  words.forEach((word) => {
    if (top === null || Math.abs(word.offsetTop - top) > 2) {
      top = word.offsetTop;
      lines.push([]);
    }
    lines[lines.length - 1].push(word);
  });

  el.textContent = "";
  return lines.map((line) => {
    const mask = document.createElement("span");
    mask.style.display = "block";
    mask.style.overflow = "hidden";
    // Descenders sit below the baseline and a flush clip shaves them off.
    mask.style.paddingBottom = "0.12em";
    mask.style.marginBottom = "-0.12em";

    const inner = document.createElement("span");
    inner.style.display = "block";
    inner.textContent = line.map((w) => w.textContent).join(" ");

    mask.append(inner);
    el.append(mask);
    return inner;
  });
}

export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 1024px)",
      },
      (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };

        /* Reduced motion: register nothing, hide nothing. The page is already
           in its finished state, which is the correct reduced-motion result -
           not a faster version of the animation. */
        if (!motion) return;

        root.classList.add("js-reveal");

        /* ---------------------------------------------------------------
           SPLIT HEADINGS. Done first, because it changes element heights and
           every trigger measured afterwards has to see the final layout. */
        gsap.utils.toArray<HTMLElement>("[data-lines]").forEach((el) => {
          const lines = splitLines(el);
          if (!lines.length) return;
          gsap.set(el, { opacity: 1 });
          gsap.from(lines, {
            yPercent: 108,
            duration: 1.15,
            ease: EASE,
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });

        /* ---------------------------------------------------------------
           SCROLL PROGRESS. Publishes --p on the element itself, 0 -> 1 across
           its own scroll span, and CSS does the rest. One property write per
           frame instead of a tween per layer.

           The home hero opts in through `.hero` for historical reasons and
           publishes --hero-p; everything else uses data-scroll-p / --p. */
        const publish = (el: HTMLElement, prop: string, start: string, end: string) => {
          const p = { v: 0 };
          gsap.to(p, {
            v: 1,
            ease: "none",
            scrollTrigger: { trigger: el, start, end, scrub: 0.6 },
            onUpdate: () => el.style.setProperty(prop, p.v.toFixed(4)),
          });
        };

        const hero = document.querySelector<HTMLElement>(".hero");
        if (hero) publish(hero, "--hero-p", "top top", "bottom top");

        gsap.utils
          .toArray<HTMLElement>("[data-scroll-p]")
          .forEach((el) => publish(el, "--p", "top bottom", "bottom top"));

        /* ---------------------------------------------------------------
           PARALLAX and PUSH-IN. Desktop only: on a phone the columns are
           stacked and full-bleed, so shifting them only crops the picture. */
        if (desktop) {
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
            const d = Number(el.dataset.parallax || 50);
            gsap.fromTo(
              el,
              { y: d },
              {
                y: -d,
                ease: "none",
                scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.8 },
              },
            );
          });
        }

        gsap.utils.toArray<HTMLElement>("[data-scrub-scale]").forEach((el) => {
          gsap.fromTo(
            el,
            { scale: 1.12 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
            },
          );
        });

        /* ---------------------------------------------------------------
           THE VERTICAL RULE. The client asked for "a vertical line that takes me
           to the next page... giving me a feel of continuity" (call, 00:32:40).
           It draws itself as it arrives, so the line IS the transition rather
           than a border that happens to be there. */
        gsap.utils.toArray<HTMLElement>("[data-scrub-line]").forEach((el) => {
          gsap.fromTo(
            el,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 1.6,
              ease: EASE,
              transformOrigin: "top center",
              scrollTrigger: { trigger: el, start: "top 90%" },
            },
          );
        });

        /* ---------------------------------------------------------------
           STAGGERS. `amount` spreads the whole set over a fixed total, so a
           six-tile grid and a twelve-tile grid take the same time rather than
           the long one dragging. `grid: auto` orders by grid position, so a
           three-column row arrives left to right as a wave instead of marching
           down column one. */
        gsap.utils.toArray<HTMLElement>("[data-reveal-stagger], .offer-grid").forEach((el) => {
          const kids = el.children;
          if (!kids.length) return;
          gsap.to(kids, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: EASE,
            stagger: { amount: Math.min(0.12 * kids.length, 0.7), grid: "auto", from: "start" },
            scrollTrigger: { trigger: el, start: "top 82%" },
          });
        });

        /* ---------------------------------------------------------------
           COUNTERS. The figure counts to its final value, which is also the
           value already in the HTML - so with JS off the number is simply
           correct rather than stuck at zero. */
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const to = Number(el.dataset.count);
          if (!Number.isFinite(to)) return;
          const suffix = el.dataset.countSuffix ?? "";
          const n = { v: 0 };
          /* 1.2s, not 2s. At two seconds the figure is still visibly wrong a
             full second after its section has settled, so a screenshot, a
             print, or anyone scrolling briskly past catches "4,699+" instead of
             "5,000+". */
          gsap.to(n, {
            v: to,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
            onUpdate: () => {
              el.textContent = Math.round(n.v).toLocaleString("en-GB") + suffix;
            },
          });
        });

        /* ---------------------------------------------------------------
           EVERYTHING ELSE marked [data-reveal] that no rule above claimed. */
        const claimed = new Set<Element>();
        gsap.utils
          .toArray<HTMLElement>("[data-reveal-stagger], .offer-grid, .wellness-copy")
          .forEach((el) => claimed.add(el));

        gsap.utils
          .toArray<HTMLElement>("[data-reveal]")
          .filter((el) => !claimed.has(el))
          .forEach((el) => {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 1.1,
              ease: EASE,
              scrollTrigger: { trigger: el, start: "top 86%" },
            });
          });

        /* ---------------------------------------------------------------
           HOME ONLY. The wellness block gets two different treatments in one
           section on purpose: the words arrive in sequence because they are
           read in sequence, and the picture moves on a different axis so the
           column reads as having depth rather than as a second list. */
        const copy = document.querySelector(".wellness-copy");
        if (copy) {
          gsap.to(copy.children, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: EASE,
            stagger: 0.12,
            scrollTrigger: { trigger: copy, start: "top 78%" },
          });
        }

        const media = document.querySelector<HTMLElement>(".wellness-media");
        if (media && desktop) {
          gsap.fromTo(
            media.children,
            { y: 46 },
            {
              y: -46,
              ease: "none",
              scrollTrigger: { trigger: ".wellness", start: "top bottom", end: "bottom top", scrub: 0.8 },
            },
          );
        }

        const figure = document.querySelector(".quote-figure");
        if (figure) {
          gsap.to(figure, {
            opacity: 1,
            y: 0,
            duration: 1.4,
            delay: 0.35,
            ease: EASE,
            scrollTrigger: { trigger: figure, start: "top 82%" },
          });
        }

        return () => {
          root.classList.remove("js-reveal");
        };
      },
    );

    /* Web fonts and the artwork both land after first paint and both change
       element heights, which moves every trigger point. One refresh once
       everything has settled is cheaper and more accurate than ScrollTrigger
       guessing per image. */
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh, { once: true });
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, [pathname]);

  /* SMOOTH SCROLL. Its own effect, with no dependency array, because Lenis is
     one instance for the whole visit - re-creating it on every route change
     would leave the old one's wheel listener attached.

     Why at all: ouranoyoga.com feels smooth under a hard scroll and we could
     not say why. Read off the live page 2026-09-17, the answer is that its
     theme loads `Divi/js/smoothscroll.js` - the classic wheel-hijack, easing
     each notch over 400ms with a pulse curve, 80px steps, and acceleration
     CAPPED AT 1 so scrolling harder does not scroll faster. That cap is the
     whole feeling. `scroll-behavior: smooth` in globals.css is not the same
     thing and never was: it only eases jumps to an anchor, never the wheel.

     Lenis is 3KB and does the same job. The settings are deliberate:

     - `lerp: 0.12`, not a duration. A lerp chases the target by a fixed
       fraction per frame, so a hard flick and a gentle one settle over the
       same ~350ms. That is the cap, expressed as maths rather than a clamp.
     - `syncTouch` stays OFF (its default). A phone's own scroll physics are
       better than ours and taking them over is how a smooth-scroll library
       earns the accessibility complaint in CLAUDE.md.
     - `anchors: true` so the skip link to #main and /workshops#find-a-class
       still work. Without it Lenis owns the scroll position and a native
       anchor jump fights it.
     - `autoRaf: false` because GSAP's ticker drives it below. Two independent
       rAF loops is how a scrubbed ScrollTrigger ends up a frame behind the
       thing it is pinned to.

     `lagSmoothing(0)` is GSAP's own instruction for this pairing: its default
     lag smoothing pauses tweens after a slow frame, which reads as the page
     sticking mid-scroll. */
  useEffect(() => {
    /* Not bolted on afterwards, same rule as the tweens above: under
       `prefers-reduced-motion` Lenis is never constructed, so the page keeps
       the browser's own scrolling and `scroll-behavior` in globals.css keeps
       handling anchors. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: import("lenis").default | null = null;
    let update: ((time: number) => void) | null = null;
    let cancelled = false;

    /* Dynamic import: the library is only ever needed by a visitor who does
       not ask for reduced motion, so it stays out of the first bundle. */
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      lenis = new Lenis({ lerp: 0.12, anchors: true, autoRaf: false });
      lenis.on("scroll", ScrollTrigger.update);

      update = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);

      /* Anything that scrolls the page from a click handler goes through
         src/lib/smooth-scroll.ts, so it animates with Lenis rather than
         starting a second, competing animation. See that file. */
      registerSmoothScroll(lenis);
    });

    return () => {
      cancelled = true;
      if (update) gsap.ticker.remove(update);
      /* Put GSAP back the way it was. 500/33 are its documented defaults, and
         leaving lag smoothing off for the rest of the session would change how
         every other tween behaves after a dropped frame. */
      gsap.ticker.lagSmoothing(500, 33);
      registerSmoothScroll(null);
      lenis?.destroy();
    };
  }, []);

  return null;
}
