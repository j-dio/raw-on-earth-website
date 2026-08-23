import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { isPreview } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  /* A review copy asks every crawler to stay out, and offers no sitemap - a
     sitemap on a disallowed host is an invitation to index it anyway. */
  if (isPreview) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
