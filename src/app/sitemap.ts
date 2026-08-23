import type { MetadataRoute } from "next";
import { nav, site } from "@/data/site";

/* Generated from the nav, so a tenth page can never be added to the menu and
   forgotten here. Static - no ISR, nothing Vercel-only.

   Priorities are deliberately flat apart from Home and the two pages the brief
   calls load-bearing (Services sells, Journal is "the strongest long-term
   asset"). Shop is a coming-soon page and is excluded from the sitemap for the
   same reason its metadata carries noindex: an empty page in the index is a
   thin-content signal against the whole domain. */
const DEMOTED = new Set(["/shop"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return nav
    .filter((item) => !DEMOTED.has(item.href))
    .map((item) => ({
      url: item.href === "/" ? site.url : `${site.url}${item.href}`,
      lastModified: now,
      changeFrequency: item.href === "/journal" ? ("weekly" as const) : ("monthly" as const),
      priority: item.href === "/" ? 1 : ["/services", "/journal"].includes(item.href) ? 0.9 : 0.7,
    }));
}
