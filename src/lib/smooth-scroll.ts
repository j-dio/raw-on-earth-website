/* The one way anything on this site scrolls the page programmatically.

   Why it exists: Motion.tsx runs Lenis, which owns the scroll position. A
   component that calls `scrollIntoView({ behavior: "smooth" })` or
   `window.scrollTo({ behavior: "smooth" })` starts the BROWSER animating the
   same thing Lenis is tracking, and the two argue for the length of the
   animation. Anchor links are already handled - Lenis takes those itself via
   its `anchors` option - but a scroll fired from a click handler is not.

   So: Motion registers the instance here when it starts, clears it when it
   stops, and callers use `scrollToY`. With Lenis running it animates; without
   it - reduced motion, or no Lenis for any other reason - it falls straight
   through to the native call, which is what the page would have done anyway.

   Deliberately not on `window`. A module both sides import is the same three
   lines without a global that anything can overwrite. */

type LenisLike = { scrollTo: (target: number, opts?: { offset?: number }) => void };

let lenis: LenisLike | null = null;

export function registerSmoothScroll(instance: LenisLike | null) {
  lenis = instance;
}

/* `offset` is subtracted from the target, for callers clearing a sticky
   header. Kept as a separate argument rather than baked into `y` so the
   Lenis path can pass it through to Lenis's own option. */
export function scrollToY(y: number, offset = 0) {
  if (lenis) {
    lenis.scrollTo(y, { offset: -offset });
    return;
  }
  window.scrollTo({ top: y - offset, behavior: "smooth" });
}

/* The common case: bring an element to the top of the viewport. Returns false
   when the id is not on the page, so a caller can decide what that means. */
export function scrollToId(id: string, offset = 0) {
  const el = document.getElementById(id);
  if (!el) return false;
  scrollToY(el.getBoundingClientRect().top + window.scrollY, offset);
  return true;
}
