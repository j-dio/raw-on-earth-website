"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

   A scroll-drawn vine around the wellness photograph was built here and
   removed on 2026-08-23. It looked right at rest and fell apart everywhere in
   between: part-drawn stem segments with leaves suspended in the gaps. Scrubbed
   motion has to be reviewed at intermediate positions, not just at 0 and 1 -
   that is the lesson worth keeping, and why DrawSVGPlugin and MotionPathPlugin
   are no longer imported. See git history if it is ever revived.

   Plugins are registered at module scope inside a "use client" file, so this
   never runs during the server render. */
gsap.registerPlugin(ScrollTrigger);

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

    /* Web fonts and the hero artwork both land after first paint and both
       change element heights, which moves every trigger point. One refresh
       once everything has settled is cheaper and more accurate than
       ScrollTrigger guessing per-image. */
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh, { once: true });

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return null;
}
