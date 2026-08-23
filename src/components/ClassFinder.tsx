"use client";

import { useState } from "react";
import Link from "next/link";
import {
  kindLabels,
  modeLabels,
  type Workshop,
  type WorkshopKind,
  type WorkshopMode,
} from "@/data/workshops";

/* The online / offline dropdown the 27 July notes ask for, plus a second
   dropdown for the type of session.

   Two native <select> elements, not a custom listbox. A listbox here would be
   ~200 lines of roving tabindex and aria-activedescendant to reproduce a
   control the phone already draws better: iOS and Android render a native
   picker, screen readers already know it, and it costs nothing. The only work
   we do is the chevron, because `appearance-none` removes the browser's own.

   `items` is a plain serialisable array from the page (a Server Component), so
   the first render on the server is the FULL, unfiltered list - the block is
   readable and complete with JavaScript off. Only the filtering needs JS. */

const MODES: { value: "all" | WorkshopMode; label: string }[] = [
  { value: "all", label: "All" },
  { value: "online", label: "Online" },
  { value: "in-person", label: "In person" },
];

/* Derived from what was actually passed in, not hard-coded, so the dropdown
   can never offer a type that returns nothing. */
const KIND_ORDER: WorkshopKind[] = [
  "regular-class",
  "one-to-one",
  "workshop",
  "retreat",
  "corporate",
  "schools",
];

/* 1rem on a phone is not a taste call: iOS Safari zooms the whole page in when
   a <select> under 16px takes focus, and the visitor is left scrolled sideways
   on a page they have to pinch back out of. */
const FIELD =
  "label w-full appearance-none rounded-full border border-ink/25 bg-linen px-5 py-[0.85rem] pr-11 text-[1rem] text-ink transition-colors duration-300 hover:border-moss focus-visible:border-moss sm:text-[0.72rem]";

function Field({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="w-full sm:w-56">
      <label htmlFor={id} className="eyebrow block text-[0.74rem] sm:text-[0.68rem]">
        {label}
      </label>
      <div className="relative mt-3">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={FIELD}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {/* `appearance-none` removed the browser's arrow, so one is drawn back
            in. Never leave a select with no visible affordance. */}
        <span
          aria-hidden
          className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-moss"
        >
          <svg viewBox="0 0 12 8" className="h-2 w-3" fill="none" aria-hidden>
            <path d="M1 1.5 6 6.5l5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default function ClassFinder({ items }: { items: Workshop[] }) {
  const [mode, setMode] = useState<string>("all");
  const [kind, setKind] = useState<string>("all");

  /* A session marked `both` is genuinely available either way, so it belongs in
     the "Online" list AND in the "In person" list. Filtering it out of both
     would hide the majority of what she teaches. */
  const kinds = [
    { value: "all", label: "All" },
    ...KIND_ORDER.filter((k) => items.some((w) => w.kind === k)).map((k) => ({
      value: k as string,
      label: kindLabels[k],
    })),
  ];

  const shown = items.filter(
    (w) =>
      (mode === "all" || w.mode === mode || w.mode === "both") &&
      (kind === "all" || w.kind === kind),
  );

  return (
    <div>
      <div className="flex flex-col gap-6 border-y border-ink/15 py-8 sm:flex-row sm:items-end sm:gap-8">
        <Field id="finder-mode" label="Mode" value={mode} onChange={setMode} options={MODES} />
        <Field id="finder-kind" label="Type" value={kind} onChange={setKind} options={kinds} />
        <p aria-live="polite" className="text-[0.95rem] text-ink/70 sm:pb-4 sm:text-sm">
          Showing {shown.length} of {items.length}
        </p>
      </div>

      {shown.length === 0 ? (
        <p className="mt-12 max-w-[52ch] text-ink/75 leading-relaxed">
          Nothing is listed in that combination yet. It may still be possible - tell her what you
          are looking for on the{" "}
          <Link href="/contact" className="underline underline-offset-4 hover:text-moss">
            contact page
          </Link>{" "}
          and she will answer directly.
        </p>
      ) : (
        <ul className="mt-4">
          {shown.map((w) => (
            <li
              key={w.slug}
              className="grid gap-4 border-b border-ink/15 py-8 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <div className="md:col-span-5">
                <h3 className="font-display text-[1.6rem] font-light leading-tight text-moss md:text-[2rem]">
                  {w.title}
                </h3>
                <p className="label mt-3 text-[0.68rem] text-ink/70">
                  {kindLabels[w.kind]} &middot; {modeLabels[w.mode]}
                </p>
              </div>

              <div className="md:col-span-4">
                <p className="leading-relaxed text-ink/80">{w.summary}</p>
                <p className="mt-3 text-sm text-ink/70">
                  {w.duration} &middot; {w.location}
                </p>
              </div>

              <div className="md:col-span-3 md:text-right">
                {/* No date is printed because no date exists. See the comment at
                    the top of src/data/workshops.ts. */}
                <p className="text-sm text-ink/70">Dates announced soon</p>
                {/* min-h-11 is the 44px tap target; the rule stays on the inner
                    span so it hugs the text. The title is in the accessible
                    name because otherwise every row's link reads the same. */}
                <Link
                  href={`/contact?about=${w.slug}`}
                  className="mt-2 inline-flex min-h-11 items-center text-moss md:justify-end"
                >
                  <span className="label border-b border-moss/40 pb-1 text-[0.7rem] transition-colors duration-300 hover:border-moss">
                    Register interest
                  </span>
                  <span className="sr-only"> in {w.title}</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
