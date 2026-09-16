"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { GalleryItem } from "@/data/gallery";

/* The gallery's one interactive part: a category filter, a masonry grid and a
   lightbox. Everything else on the page is a Server Component.

   Three decisions worth knowing about:

   1. CSS `columns`, not a JS masonry. Every tile keeps its real aspect ratio
      because the <img> carries its own width and height and is simply allowed
      to be as tall as it is. Nothing measures, nothing reflows, and the page
      reserves the right space before a single byte of image has loaded.

   2. Native <dialog> + showModal(). It gives the focus trap, the inert
      background and the top-layer stacking for free - all the parts a
      hand-rolled modal usually gets wrong. Escape, backdrop click and focus
      return are still handled here explicitly rather than trusted to the
      browser, because the close path also has to unlock body scroll.

   3. The filter is a row of buttons with aria-pressed, NOT a tablist. These
      filter one grid in place; they do not switch between panels, and calling
      them tabs tells a screen reader to expect a tabpanel that never arrives.

   Motion: opacity only, nowhere a transform. So there is nothing here that a
   prefers-reduced-motion rule would need to switch off. */



export default function GalleryGrid({
  items,
}: {
  items: GalleryItem[];
}) {
  const [index, setIndex] = useState<number | null>(null);

  const dialogRef = useRef<HTMLDialogElement>(null);
  /* The thumbnail that opened the lightbox. The browser usually restores focus
     on dialog.close() by itself, but not in every engine, so it is done here. */
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  /* The data file is grouped by category, so rendering it in source order gave
     the "All" view eight solid blocks: a column of nothing but children's
     classes, a column of nothing but video posters, and near-identical frames
     from the same burst stacked one on top of the other. This spreads each
     category evenly across the whole grid by giving every item a fractional
     position within its own category and sorting on that. It is deterministic -
     no shuffle - so the server and the client render the same order, and the
     per-category views are untouched. */
  const mixed = useMemo(() => {
    const total = new Map<string, number>();
    for (const item of items) total.set(item.category, (total.get(item.category) ?? 0) + 1);
    const seen = new Map<string, number>();
    return items
      .map((item) => {
        const n = seen.get(item.category) ?? 0;
        seen.set(item.category, n + 1);
        return { item, at: (n + 0.5) / total.get(item.category)! };
      })
      .sort((a, b) => a.at - b.at)
      .map((entry) => entry.item);
  }, [items]);

  // Items are already filtered by the parent, so we just use them directly.
  const shown = mixed;
  const current = index === null ? null : shown[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) {
      dialog.showModal();
      // showModal() makes the background inert but does not stop it scrolling.
      document.body.style.overflow = "hidden";
    }
  }, [index]);

  // Navigating away with the lightbox open would otherwise leave the next page
  // unscrollable.
  useEffect(() => () => void (document.body.style.overflow = ""), []);

  function close() {
    dialogRef.current?.close();
    document.body.style.overflow = "";
    setIndex(null);
    triggerRef.current?.focus();
  }

  function step(by: number) {
    setIndex((i) => (i === null ? null : (i + by + shown.length) % shown.length));
  }

  return (
    <>
      <p aria-live="polite" className="mt-6 text-sm text-ink/75">
        Showing {shown.length} {shown.length === 1 ? "item" : "items"}.
      </p>

      {/* GRID -------------------------------------------------------------- */}
      <ul className="mt-12 columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-4 md:gap-6">
        {shown.map((item, i) => (
          <li key={item.id} className="mb-4 md:mb-6 break-inside-avoid">
            <button
              type="button"
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setIndex(i);
              }}
              aria-label={item.video ? `Play video: ${item.alt}` : undefined}
              className="group relative block w-full overflow-hidden rounded-xl bg-sand/20 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.2)]"
            >
              <img
                src={item.thumb}
                alt={item.alt}
                width={item.w}
                height={item.h}
                loading="lazy"
                decoding="async"
                className="w-full h-auto transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
              
              {/* Premium Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
              
              <div className="absolute inset-0 p-5 flex flex-col justify-end text-left opacity-0 translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none">
                <span className="text-sand/80 text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-1.5 drop-shadow-md">
                  {item.category}
                </span>
                <span className="text-linen text-sm md:text-base font-light leading-snug drop-shadow-md line-clamp-2">
                  {item.caption}
                </span>
              </div>

              {item.video ? (
                <span
                  aria-hidden
                  className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-linen/90 text-ink shadow-sm transition-transform duration-300 group-hover:scale-110"
                >
                  <svg viewBox="0 0 12 12" className="h-3 w-3 translate-x-[1px]" fill="currentColor">
                    <path d="M3 1.5 10 6l-7 4.5Z" />
                  </svg>
                </span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>

      {/* LIGHTBOX ---------------------------------------------------------- */}
      <dialog
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Gallery viewer"
        onCancel={(event) => {
          // Escape. Handled here so the scroll lock is released with it.
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          // The dialog fills the viewport, so a click that lands on the element
          // itself rather than on its children is a click on the backdrop.
          if (event.target === dialogRef.current) close();
        }}
        onKeyDown={(event) => {
          // Inside the video player the arrow keys are the scrub control, so
          // stepping the gallery there would take away seeking.
          if (event.target instanceof HTMLVideoElement) return;
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
          }
        }}
        className="fixed inset-0 m-0 h-full max-h-full w-full max-w-full bg-ink/95 p-0 text-linen open:flex open:flex-col"
      >
        {current ? (
          <>
            <div className="flex shrink-0 items-center justify-between gap-4 px-5 py-4 md:px-8">
              {/* Announced, because stepping with the arrow keys changes the
                  picture and nothing else tells a screen reader that it did. */}
              <p aria-live="polite" className="label text-[0.68rem] text-sand">
                {(index ?? 0) + 1} of {shown.length}
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Close gallery viewer"
                className="label inline-flex min-h-11 items-center rounded-full border border-linen/50 px-5 text-[0.66rem] text-linen transition-colors duration-300 hover:bg-linen/10"
              >
                Close
              </button>
            </div>

            <div className="flex min-h-0 flex-1 items-center justify-center px-5 md:px-8">
              {current.video ? (
                <video
                  key={current.id}
                  src={current.video}
                  poster={current.full}
                  controls
                  playsInline
                  preload="none"
                  aria-label={current.alt}
                  width={current.w}
                  height={current.h}
                  className="max-h-full w-auto max-w-full object-contain"
                />
              ) : (
                <img
                  key={current.id}
                  src={current.full}
                  alt={current.alt}
                  width={current.w}
                  height={current.h}
                  decoding="async"
                  className="max-h-full w-auto max-w-full object-contain"
                />
              )}
            </div>

            <div className="flex shrink-0 flex-wrap items-center justify-between gap-4 px-5 py-5 md:px-8">
              <p className="max-w-[46ch] font-display text-lg font-light text-linen/85">
                {current.caption}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous item"
                  className="label inline-flex min-h-11 items-center rounded-full border border-linen/50 px-5 text-[0.66rem] text-linen transition-colors duration-300 hover:bg-linen/10"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next item"
                  className="label inline-flex min-h-11 items-center rounded-full border border-linen/50 px-5 text-[0.66rem] text-linen transition-colors duration-300 hover:bg-linen/10"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        ) : null}
      </dialog>
    </>
  );
}
