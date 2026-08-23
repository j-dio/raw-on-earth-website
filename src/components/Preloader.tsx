"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/* Short hold on first paint: the enso painting itself, once, on a linen field.

   The overlay is rendered in the server HTML on purpose - mounting it from
   JS would flash the hero first. That makes "how does it leave?" the load
   bearing question, so it has two independent exits:

     1. CSS. A keyframe hides it at 2.2s with no JS involved at all.
     2. JS. This component adds `is-done` as soon as the page has loaded and
        a minimum beat has passed, which is almost always sooner.

   The CSS exit is the one that matters: if this script never runs, is
   blocked, or throws, the overlay still leaves. A preloader that can trap
   the page behind it is worse than no preloader. */
const MIN_MS = 900;

/* Module scope, so it survives re-renders AND client-side navigation - the
   layout never remounts, so this component instance lives for the whole visit.

   It exists because of a real bug, found 2026-08-24: the loader ran again every
   time a visitor came BACK to Home. `enabled` flipped false to true, the effect
   below re-locked scrolling, and the effect that unlocks it is keyed on `done`
   - which was already true from the first visit, so it never re-ran and the
   page stayed frozen at `html { overflow: hidden }` with no way out.

   Guarding on "has this already played once" fixes the freeze and the thing
   that caused it: the loader is a first-impression, not a page transition. It
   should never be the second thing you see. */
let hasPlayed = false;

export default function Preloader() {
  const pathname = usePathname();
  const [done, setDone] = useState(false);

  /* Home only, and only the first time. Navigation is client-side, so without
     the `hasPlayed` guard the loader would gate a page the visitor has already
     seen.

     `usePathname` resolves during the server render too, and `hasPlayed` is
     false on the first client render, so the server and client agree on the
     first paint - which is the only render hydration compares. */
  const enabled = pathname === "/" && !hasPlayed;

  useEffect(() => {
    if (!enabled) {
      /* Arriving anywhere that is not Home also spends the loader. Otherwise a
         visitor who lands on /about and then clicks Home gets a 900ms gate in
         the middle of their visit, which is the same mistake as replaying it. */
      hasPlayed = true;
      document.documentElement.classList.add("is-loaded");
      /* Belt and braces. If any earlier path left the lock on, a visitor who
         navigates away must not carry it with them. */
      document.documentElement.style.overflow = "";
      return;
    }

    const started = performance.now();
    let timer = 0;

    const finish = () => {
      const remaining = Math.max(0, MIN_MS - (performance.now() - started));
      timer = window.setTimeout(() => setDone(true), remaining);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    /* Scroll is locked only from here, so a no-JS visitor can never end up
       with a locked page after the CSS exit has run. */
    document.documentElement.style.overflow = "hidden";

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", finish);
      document.documentElement.style.overflow = "";
    };
  }, [enabled]);

  /* The hero's entry animations key off `is-loaded`, so they start when the
     loader lifts rather than playing unseen behind it. If this never runs the
     hero simply renders in its resting state - see the note in globals.css. */
  useEffect(() => {
    if (!done) return;
    hasPlayed = true;
    document.documentElement.style.overflow = "";
    document.documentElement.classList.add("is-loaded");
  }, [done]);

  if (!enabled) return null;

  return (
    <div className={`preloader${done ? " is-done" : ""}`} role="status" aria-live="polite">
      {/* No mark, no type, no separate spinner: the brush ring is the
          animation. All of the motion lives in .preloader-enso. */}
      <span aria-hidden className="preloader-enso" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
