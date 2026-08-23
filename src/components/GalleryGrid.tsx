"use client";

import { useEffect, useRef, useState } from "react";
import type { GalleryCategoryName, GalleryItem } from "@/data/gallery";

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

type Filter = GalleryCategoryName | "All";

export default function GalleryGrid({
  items,
  categories,
}: {
  items: GalleryItem[];
  categories: { name: GalleryCategoryName; count: number }[];
}) {
  const [filter, setFilter] = useState<Filter>("All");
  const [index, setIndex] = useState<number | null>(null);

  const dialogRef = useRef<HTMLDialogElement>(null);
  /* The thumbnail that opened the lightbox. The browser usually restores focus
     on dialog.close() by itself, but not in every engine, so it is done here. */
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const shown = filter === "All" ? items : items.filter((item) => item.category === filter);
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
      {/* FILTER ------------------------------------------------------------ */}
      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        {(["All", ...categories.map((c) => c.name)] as Filter[]).map((name) => {
          const on = filter === name;
          const count = name === "All" ? items.length : categories.find((c) => c.name === name)?.count;
          return (
            <button
              key={name}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(name)}
              className={`label rounded-full border px-5 py-2 text-[0.68rem] transition-colors duration-300 ${
                on
                  ? "border-moss bg-moss text-linen"
                  : "border-ink/25 text-ink hover:border-moss hover:bg-moss/10"
              }`}
            >
              {name} <span className="opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-6 text-sm text-ink/75">
        Showing {shown.length} {shown.length === 1 ? "item" : "items"}
        {filter === "All" ? " from every category" : ` in ${filter}`}.
      </p>

      {/* GRID -------------------------------------------------------------- */}
      <ul className="mt-10 columns-2 gap-3 md:columns-3 md:gap-4 xl:columns-4">
        {shown.map((item, i) => (
          <li key={item.id} className="mb-3 break-inside-avoid md:mb-4">
            <button
              type="button"
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setIndex(i);
              }}
              /* On a video tile the button's name has to say so; on a photograph
                 the <img> alt is already the right name, so no aria-label. */
              aria-label={item.video ? `Play video: ${item.alt}` : undefined}
              className="group relative block w-full overflow-hidden bg-sand/40"
            >
              <img
                src={item.thumb}
                alt={item.alt}
                width={item.w}
                height={item.h}
                loading={i < 4 ? "eager" : "lazy"}
                decoding="async"
                className="w-full opacity-90 transition-opacity duration-500 group-hover:opacity-100"
              />
              {item.video ? (
                <span
                  aria-hidden
                  className="label absolute bottom-0 left-0 right-0 flex items-center gap-2 bg-ink/70 px-3 py-2 text-[0.62rem] text-linen"
                >
                  <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0" fill="currentColor">
                    <path d="M3 1.5 10 6l-7 4.5Z" />
                  </svg>
                  Video
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
              <p className="label text-[0.68rem] text-sand">
                {(index ?? 0) + 1} of {shown.length}
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Close gallery viewer"
                className="label rounded-full border border-linen/50 px-5 py-2 text-[0.66rem] text-linen transition-colors duration-300 hover:bg-linen/10"
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
                  className="label rounded-full border border-linen/50 px-5 py-2 text-[0.66rem] text-linen transition-colors duration-300 hover:bg-linen/10"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next item"
                  className="label rounded-full border border-linen/50 px-5 py-2 text-[0.66rem] text-linen transition-colors duration-300 hover:bg-linen/10"
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
