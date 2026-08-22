"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

/* All scroll-driven motion, in one client component.
   Replaced the hand-rolled IntersectionObserver + scroll listener on
   2026-08-23. GSAP earns its place here for three things the DIY version could
   not do: real stagger, scrub that survives resize and late-loading images, and
   one refresh model instead of two systems guessing at each other.

   Rules this file keeps to, from CLAUDE.md:

   - The resting state is the VISIBLE state. Nothing here is what makes content
     appear. `js-reveal` (globals.css) is what hides [data-reveal] before the
     tween runs, and it is only ever added by this file - so with JS off, or if
     this module fails to load, the page renders complete and static.
   - Reduced motion is not a toggle bolted on afterwards. gsap.matchMedia()
     gates every tween, so `(prefers-reduced-motion: reduce)` never registers
     them at all and mm.revert() puts everything back.
   - Slow, and few things at once. Four sections, four DIFFERENT treatments -
     one identical entrance applied to everything is the tell, not motion
     itself. Nothing bounces; every ease is a decelerating curve.

   Plugins are registered at module scope inside a "use client" file, so this
   never runs during the server render. */
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

/* Places every vine leaf ON its stem, at the right angle, by reading the real
   curve rather than trusting hand-typed coordinates.

   This is layout, not motion, so it runs OUTSIDE the reduced-motion gate: a
   visitor who has asked for no animation should still see a properly drawn
   vine, just not watch it grow.

   Runs again on resize because the SVG scales with the column, and a leaf
   placed in user units has to be re-measured when those units change size. */
function placeVineLeaves() {
  const leaves = gsap.utils.toArray<SVGUseElement>(".vine-leaves > use");
  if (!leaves.length) return;

  leaves.forEach((leaf) => {
    const path = document.getElementById(leaf.dataset.path ?? "");
    if (!path) return;

    const p = Number(leaf.dataset.p ?? 0.5);
    const side = Number(leaf.dataset.side ?? 1);
    const raw = MotionPathPlugin.getRawPath(path as unknown as SVGPathElement);
    MotionPathPlugin.cacheRawPathMeasurements(raw);
    /* The third argument makes it return an `angle` too; GSAP's own types
       declare the narrower Point2D return, so the shape is asserted here. */
    const at = MotionPathPlugin.getPositionOnPath(raw, p, true) as {
      x: number;
      y: number;
      angle: number;
    };

    /* getPositionOnPath's angle is the tangent - the direction the shoot is
       travelling. A leaf grows ACROSS that, so it is turned a quarter turn off
       the tangent, and `side` picks which of the two. */
    gsap.set(leaf, {
      x: at.x,
      y: at.y,
      rotation: at.angle + 90 * side,
      transformOrigin: "0px 0px",
    });
  });

  gsap.set(".vine-leaves", { opacity: 0.4 });
}

/* One decelerating curve for the whole site. Editorial pacing: things arrive
   and settle, they do not spring. */
const EASE = "power3.out";

export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;

    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
        desktop: "(min-width: 1024px)",
      },
      (ctx) => {
        const { motion, desktop } = ctx.conditions as {
          motion: boolean;
          reduced: boolean;
          desktop: boolean;
        };

        /* Reduced motion: register nothing, hide nothing. The page is already
           in its finished state, which is the correct reduced-motion result -
           not a faster version of the animation. */
        if (!motion) return;

        root.classList.add("js-reveal");

        /* 1. HERO SCRUB
           Publishes --hero-p (0 -> 1 across the hero's own height); every layer
           that reacts to it is styled in globals.css. Keeping the motion in CSS
           means one property write per frame instead of a tween per layer.
           scrub:0.6 lags the scroll slightly, which is what stops the parallax
           feeling mechanically welded to the wheel. */
        const hero = document.querySelector<HTMLElement>(".hero");
        if (hero) {
          const p = { v: 0 };
          gsap.to(p, {
            v: 1,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
            onUpdate: () => hero.style.setProperty("--hero-p", p.v.toFixed(4)),
          });
        }

        /* 2. WELLNESS - copy staggers, image drifts.
           Two different treatments in one section on purpose: the words arrive
           in sequence because they are read in sequence, and the picture moves
           on a different axis entirely so the column reads as having depth
           rather than as a second list. */
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

        /* Parallax only where there is room for it. On a phone the media column
           is stacked and full-bleed, so shifting it just crops the photograph.

           It drives the column's CHILDREN, not the column itself. Both the
           reveal and the parallax write `transform`, so pointing them at the
           same element means the last one to run wins - which is how the whole
           image column shipped at opacity 0 in the first place: the parallax
           claimed .wellness-media, so it was excluded from the reveal below,
           and on mobile (where the parallax does not run) nothing was left to
           reveal it at all. Separate elements, separate transforms, no
           coupling. */
        const media = document.querySelector<HTMLElement>(".wellness-media");
        if (media && desktop) {
          gsap.fromTo(
            media.children,
            { y: 46 },
            {
              y: -46,
              ease: "none",
              scrollTrigger: {
                trigger: ".wellness",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
        }

        /* 2b. VINE - grows with the scroll, not on a loop.
           A vine growing is a directional gesture, so the visitor's own scroll
           drives it: scrubbed across the section, it reverses when they scroll
           back and it is never spent. A loop would repeat forever and become
           noise on a page whose brief is "calm"; a play-once would be used up
           the first time past.

           Drawn with DrawSVGPlugin. An earlier pass used raw stroke-dashoffset
           because I believed DrawSVG was paid Club GreenSock - it is not. GSAP
           and every former members-only plugin are free for commercial use
           under the standard licence, so the right tool is available and the
           hand-rolled version is gone.

           The five segments are drawn in stem order (1..5), NOT DOM order -
           segments 2 and 4 live in the other SVG, so querying the document
           would draw them out of sequence and the shoot would appear to grow
           in two places at once. */
        const stems = ["1", "2", "3", "4", "5"]
          .map((n) => document.getElementById(`vine-${n}`))
          .filter(Boolean) as HTMLElement[];

        const mediaVine = document.querySelector(".wellness-media");
        if (mediaVine && stems.length) {
          const leaves = gsap.utils.toArray<SVGElement>(".vine-leaves > use");
          gsap.set(leaves, { scale: 0 });

          const vine = gsap.timeline({
            scrollTrigger: {
              trigger: mediaVine,
              start: "top 82%",
              end: "bottom 70%",
              scrub: 0.7,
            },
          });

          /* Segments are chained end-to-end rather than staggered, so the tip
             is only ever in one place. Their durations are weighted by real
             path length, which is what stops the short middle segments racing
             past while the long top one crawls. */
          const lengths = stems.map((el) =>
            (el as unknown as SVGPathElement).getTotalLength(),
          );
          const total = lengths.reduce((a, b) => a + b, 0) || 1;

          stems.forEach((el, i) => {
            vine.fromTo(
              el,
              { drawSVG: "0%" },
              { drawSVG: "100%", ease: "none", duration: (lengths[i] / total) * 2 },
              i === 0 ? 0 : ">",
            );
          });

          /* Each leaf opens as the tip reaches it: its own position along the
             whole stem, not an even stagger. That is the difference between
             leaves growing from a shoot and leaves appearing near one. */
          leaves.forEach((leaf) => {
            const el = leaf as SVGElement & { dataset: DOMStringMap };
            const segIndex = Number((el.dataset.path ?? "vine-1").split("-")[1]) - 1;
            const before = lengths.slice(0, segIndex).reduce((a, b) => a + b, 0);
            const at = (before + lengths[segIndex] * Number(el.dataset.p ?? 0.5)) / total;
            vine.to(el, { scale: 1, ease: "back.out(1.3)", duration: 0.28 }, at * 2);
          });
        }

        /* 3. QUOTE - the brief's own motif is the animation.
           The design brief asks for "a vertical line running down the page".
           Rather than draw it and leave it inert, it draws itself downward as
           the panel arrives, and the quote follows it up. That is one idea
           doing both jobs. */
        const rule = document.querySelector(".quote-rule");
        if (rule) {
          gsap.fromTo(
            rule,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 1.6,
              ease: EASE,
              transformOrigin: "top center",
              scrollTrigger: { trigger: rule, start: "top 85%" },
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

        /* 4. OFFERINGS - one stagger across the grid.
           Ordered by grid position rather than DOM order, so on a three-column
           desktop the tiles arrive left-to-right as a wave instead of marching
           down column one. `amount` spreads the whole set over a fixed total,
           so six tiles and nine tiles both take the same time. */
        const tiles = document.querySelectorAll(".offer-grid > li");
        if (tiles.length) {
          gsap.to(tiles, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: EASE,
            stagger: { amount: 0.5, grid: "auto", from: "start" },
            scrollTrigger: { trigger: ".offer-grid", start: "top 80%" },
          });
        }

        /* Everything else marked [data-reveal] that no rule above claimed.
           .wellness-media IS claimed by this one - the parallax moves its
           children, so the column itself still needs revealing, on every
           breakpoint. */
        const rest = gsap.utils.toArray<HTMLElement>("[data-reveal]").filter(
          (el) =>
            !el.classList.contains("wellness-copy") &&
            !el.classList.contains("quote-figure"),
        );
        rest.forEach((el) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: EASE,
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });

        return () => {
          root.classList.remove("js-reveal");
        };
      },
    );

    placeVineLeaves();
    const replace = () => placeVineLeaves();
    window.addEventListener("resize", replace, { passive: true });

    /* Web fonts and the hero artwork both land after first paint and both
       change element heights, which moves every trigger point. One refresh
       once everything has settled is cheaper and more accurate than
       ScrollTrigger guessing per-image. */
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh, { once: true });

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", replace);
      mm.revert();
    };
  }, []);

  return null;
}
