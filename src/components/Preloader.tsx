"use client";

import { useEffect, useState } from "react";

/* Short hold on first paint: the enso painting itself, once, on an ink field.
   Ink is the colour the hero opens on, so the loader dissolves into the page
   rather than cutting to it. The drawing motion is entirely in globals.css.

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

export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
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
  }, []);

  /* The hero's entry animations key off `is-loaded`, so they start when the
     loader lifts rather than playing unseen behind it. If this never runs the
     hero simply renders in its resting state - see the note in globals.css. */
  useEffect(() => {
    if (!done) return;
    document.documentElement.style.overflow = "";
    document.documentElement.classList.add("is-loaded");
  }, [done]);

  return (
    <div className={`preloader${done ? " is-done" : ""}`} role="status" aria-live="polite">
      {/* No mark, no type, no separate spinner: the brush ring is the
          animation. All of the motion lives in .preloader-enso. */}
      <span aria-hidden className="preloader-enso" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
