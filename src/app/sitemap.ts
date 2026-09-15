import type { MetadataRoute } from "next";
import { nav, site } from "@/data/site";
import { isPreview } from "@/lib/env";

/* Generated from the nav, so a seventh page can never be added to the menu and
   forgotten here. Static - no ISR, nothing Vercel-only.

   Priorities are flat apart from Home and Mentorship, which is the page that
   sells. The Journal and Shop demotions that used to live here went with those
   routes on 2026-09-15. */

export default function sitemap(): MetadataRoute.Sitemap {
  /* A review copy publishes an empty sitemap. robots.txt already disallows
     everything and every response carries a noindex header, but a sitemap full
     of preview URLs is the one file a person might paste into Search Console
     by hand, and that would undo all three. */
  if (isPreview) return [];

  const now = new Date();

  return nav.map((item) => ({
    url: item.href === "/" ? site.url : `${site.url}${item.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: item.href === "/" ? 1 : item.href === "/mentorship" ? 0.9 : 0.7,
  }));
}
