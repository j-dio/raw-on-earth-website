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

const KINDS: { value: "all" | WorkshopKind; label: string }[] = [
  { value: "all", label: "All" },
  { value: "regular-class", label: "Regular class" },
  { value: "one-to-one", label: "One-to-one" },
  { value: "workshop", label: "Workshop" },
  { value: "retreat", label: "Retreat" },
  { value: "corporate", label: "Corporate" },
  { value: "schools", label: "Schools" },
];

const FIELD =
  "label w-full appearance-none rounded-full border border-ink/25 bg-linen px-5 py-[0.85rem] pr-11 text-[0.72rem] text-ink transition-colors duration-300 hover:border-moss focus-visible:border-moss";

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
      <label htmlFor={id} className="eyebrow block text-[0.68rem]">
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
  const shown = items.filter(
    (w) =>
      (mode === "all" || w.mode === mode || w.mode === "both") &&
      (kind === "all" || w.kind === kind),
  );

  return (
    <div>
      <div className="flex flex-col gap-6 border-y border-ink/15 py-8 sm:flex-row sm:items-end sm:gap-8">
        <Field id="finder-mode" label="Mode" value={mode} onChange={setMode} options={MODES} />
        <Field id="finder-kind" label="Type" value={kind} onChange={setKind} options={KINDS} />
        <p aria-live="polite" className="text-sm text-ink/70 sm:pb-4">
          Showing {shown.length} of {items.length}
        </p>
      </div>

      {shown.length === 0 ? (
        <p className="mt-12 max-w-[52ch] text-ink/75 leading-relaxed">
          Nothing is listed in that combination yet. It may still be possible - tell us what you
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
                <Link
                  href={`/contact?about=${w.slug}`}
                  className="label mt-3 inline-block border-b border-moss/40 pb-1 text-[0.7rem] text-moss transition-colors duration-300 hover:border-moss"
                >
                  Register interest
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
