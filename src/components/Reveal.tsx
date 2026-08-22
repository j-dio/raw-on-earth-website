"use client";

import { useEffect } from "react";

/* Page motion, in one client component:
   1. the fade-and-rise for every [data-reveal]
   2. the hero scroll-scrub, published as --hero-p on the .hero element

   ponytail: no animation library. The reveal is two CSS properties, and the
   hero scrub is one custom property that globals.css reads. GSAP would add
   ~70 kB for this. */
export default function Reveal() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const root = document.documentElement;
    root.classList.add("js-reveal");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    /* Hero scrub. Progress runs 0 -> 1 over the first viewport of scroll, which
       is the distance the hero itself occupies. Writing one custom property
       keeps all the actual motion in CSS and off the main thread's style
       recalc for individual layers. */
    const hero = document.querySelector<HTMLElement>(".hero");
    let frame = 0;

    const paint = () => {
      frame = 0;
      if (!hero) return;
      const span = hero.offsetHeight || window.innerHeight;
      const p = Math.min(1, Math.max(0, window.scrollY / span));
      hero.style.setProperty("--hero-p", p.toFixed(4));
    };

    /* rAF-throttled: scroll fires far more often than the display refreshes. */
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      io.disconnect();
      root.classList.remove("js-reveal");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
