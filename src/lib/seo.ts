import type { Metadata } from "next";
import { site } from "@/data/site";

/* Per-page metadata in one call, so nine pages cannot drift into nine
   different shapes. Every page exports:

     export const metadata = pageMeta({ title, description, path });

   `title` is the page's own title only - layout.tsx owns the template that
   appends the brand, so nothing here repeats "Raw On Earth".

   The OG image is a single static file, not next/og's ImageResponse. Dynamic
   OG needs a runtime route on every request; production is a shared Hostinger
   plan and one 1200x630 file costs nothing and cannot fail. */
export function pageMeta({
  title,
  description,
  path,
  image = "/og/default.jpg",
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
}): Metadata {
  const url = path === "/" ? site.url : `${site.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: `${title} — ${site.name}`,
      description,
      locale: "en_GB",
      images: [{ url: image, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${site.name}`,
      description,
      images: [image],
    },
  };
}

/* Breadcrumbs for every page but Home. Google reads this even when the page
   draws no visible breadcrumb trail, and the trail here IS visible (see
   PageHero), so the two agree. */
export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path === "/" ? site.url : `${site.url}${item.path}`,
    })),
  };
}
