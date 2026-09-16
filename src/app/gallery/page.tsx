import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import GallerySection from "@/components/GallerySection";
import { CtaBand } from "@/components/ui";
import { gallery, galleryCategories } from "@/data/gallery";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata: Metadata = pageMeta({
  title: "Gallery",
  description:
    "Photographs and short films from the practice: classes under the trees, children's yoga, community mornings, temple visits and quiet work behind the scenes.",
  path: "/gallery",
});

export default function GalleryPage() {
  const shownCategories = galleryCategories.filter((category) => category.count > 0);

  return (
    <>
      <SiteHeader />
      <main id="main">
        <GallerySection items={gallery} categories={shownCategories} />

        <CtaBand
          body="If something here looks like the room you want to be in, come and practise."
          secondary={{ href: "/workshops", label: "See Workshops" }}
        />
      </main>
      <SiteFooter />
      <JsonLd
        data={[
          breadcrumbLd([{ name: "Gallery", path: "/gallery" }]),
          {
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: `Gallery — ${site.name}`,
            description:
              "Photographs and short films from Raw On Earth yoga classes, children's sessions, community gatherings and retreats.",
            url: `${site.url}/gallery`,
            numberOfItems: gallery.length,
            isPartOf: { "@id": `${site.url}#website` },
          },
        ]}
      />
    </>
  );
}
