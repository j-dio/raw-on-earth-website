import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import GalleryGrid from "@/components/GalleryGrid";
import { Section, CtaBand } from "@/components/ui";
import { gallery, galleryCategories } from "@/data/gallery";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata: Metadata = pageMeta({
  title: "Gallery",
  description:
    "Photographs and short films from the practice: classes under the trees, children's yoga, community mornings, temple visits and quiet work behind the scenes.",
  path: "/gallery",
});

/* Gallery. One filter row and one grid, because that is what a gallery is; the
   page's job is to get out of the photographs' way.

   Two things are deliberate and easy to undo by accident:

   - Only the categories that hold photographs are offered. The brief names
     nine; the client sent seven. Corporate and Retreats are declared in
     src/data/gallery.ts with a count of 0 and filtered out here, so they
     reappear on their own the day the pictures arrive. An empty tab that opens
     on nothing is worse than no tab.
   - The masthead is community-10, a landscape frame with no children in it.
     Most of the library is portrait and much of it is children's yoga, and a
     child's face at full-bleed width is not a decision this page gets to make
     (see the consent note in the data file). */
export default function GalleryPage() {
  const shownCategories = galleryCategories.filter((category) => category.count > 0);

  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow="Gallery"
          title="The practice, as it actually looks"
          standfirst="Mornings under the trees, rooms full of children, quiet weeks away. Most of these were taken by somebody who was in the room."
          figure={{
            src: "/media/gallery/community-10.webp",
            alt: "A monk in maroon robes shares a blessing ritual with a man and a woman over a small bowl, in a bright room with yoga mats stacked in the background.",
            width: 1500,
            height: 1126,
          }}
        />

        <Section className="bg-linen py-24 md:py-32">
          <div data-reveal className="max-w-[62ch] leading-[1.75] text-ink/80">
            <h2 className="sr-only">Photographs and films</h2>
            <p>
              These are working photographs rather than a shoot. They come from classes,
              workshops and travels over several years, so the light is whatever the light
              was. Choose a category to narrow the grid, or open any picture to see it
              whole.
            </p>
          </div>

          <div className="mt-14">
            <GalleryGrid items={gallery} categories={shownCategories} />
          </div>
        </Section>

        <CtaBand
          body="If something here looks like the room you want to be in, come and practise."
          secondary={{ href: "/workshops", label: "See Workshops" }}
        />
      </main>
      <SiteFooter />
      <JsonLd
        data={[
          breadcrumbLd([{ name: "Gallery", path: "/gallery" }]),
          /* An ImageGallery object and nothing more. Emitting 77 inline
             ImageObjects would add a large payload to every page load and buys
             no ranking: Google reads the real <img> elements, which already
             carry the same alt text. */
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
