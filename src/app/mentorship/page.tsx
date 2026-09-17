import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { CtaBand } from "@/components/ui";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { site } from "@/data/site";
import { serviceGroups } from "@/data/services";

/* Mentorship landing page — full-bleed hero background image, then three
   rounded audience cards below it.

   Redesigned 2026-09-17: removed the PageHero strip; the hero is now a
   standalone full-viewport section with the client's children's yoga photo
   as the background. The three cards are rounded panels, not full-bleed
   strips, so they float above the linen ground. */

export const metadata: Metadata = pageMeta({
  title: "Mentorship",
  description:
    "Private yoga, mindfulness coaching, breathwork, corporate well-being, retreats, school sessions and online courses with Rajalakshmi V in Bangalore.",
  path: "/mentorship",
});

const audienceCards = [
  {
    slug: "for-yourself",
    n: "01",
    title: "For yourself",
    subtitle: "Individual & Online",
    body:
      "One-to-one teaching, built around what your own practice needs. Taught online or in person, at a time arranged with you.",
    img: {
      src: "/media/gallery/raji-11.webp",
      alt: "The founder folds into a standing side stretch with her eyes closed, lit from behind in a park at dusk.",
    },
    groups: ["individual", "online-programmes"],
  },
  {
    slug: "for-your-team",
    n: "02",
    title: "For your team",
    subtitle: "Corporate",
    body:
      "Programmes for teams at work, run for organisations across technology, finance, retail and education. Held on site in your own rooms, or online for people working apart.",
    img: {
      src: "/media/gallery/teaching-07.webp",
      alt: "A teacher leads a standing group class with palms pressed together, students lined up on mats inside a long thatched hall.",
    },
    groups: ["corporate"],
  },
  {
    slug: "for-a-group",
    n: "03",
    title: "For a group you gather",
    subtitle: "Retreats & Schools",
    body:
      "A retreat arranged for a group that already exists: a team, a studio, a family, a circle of friends. Or sessions for children and the adults who teach them, taught in the space your school already has.",
    img: {
      src: "/media/gallery/kids-14.webp",
      alt: "Rows of schoolchildren in white shirts stand at attention on coloured mats arranged in a wide outdoor courtyard.",
    },
    groups: ["retreats", "schools"],
  },
];

const catalogueLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "@id": `${site.url}/mentorship#catalogue`,
  name: `Mentorship - ${site.name}`,
  url: `${site.url}/mentorship`,
  provider: { "@id": `${site.url}#business` },
  itemListElement: serviceGroups.map((group, i) => ({
    "@type": "OfferCatalog",
    position: i + 1,
    name: group.title,
    description: group.intro,
    url: `${site.url}/mentorship#${group.slug}`,
    itemListElement: group.services.map((service, j) => ({
      "@type": "Service",
      position: j + 1,
      name: service.name,
      description: service.summary,
      serviceType: group.title,
      provider: { "@id": `${site.url}#business` },
    })),
  })),
};

export default function MentorshipPage() {
  return (
    <>
      <SiteHeader />

      <main id="main">

        {/* HERO — gallery-style: image as full background, text overlaid */}
        <div className="relative bg-linen text-moss overflow-hidden flex flex-col items-center justify-center">
          {/* Background image — not cropped, covers the full section */}
          <div className="absolute inset-0 z-0">
            <img
              src="/media/hero/mentorship-hero.png"
              alt="An instructor and a young student practise a seated partner boat pose on a green mat, children watching in the background."
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay matching gallery hero */}
            {/* Top stop raised 60 -> 75 on 2026-09-18. The header sits in this
                band, and at 60% the photograph came through light enough that
                moss "Yoga & Meditation" measured 3.68:1 against the worst pixel
                behind it - under the 4.5 small text needs. /workshops already
                runs 75 and measures 5.91:1 there. */}
            <div className="absolute inset-0 bg-gradient-to-b from-linen/75 via-linen/85 to-linen" />
          </div>

          {/* Text overlaid on top — same structure as gallery */}
          <div className="relative z-10 max-w-[1280px] mx-auto w-full text-left px-6 pt-40 pb-24 md:px-10 lg:px-20 xl:px-32 md:pt-52 md:pb-32">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-6 h-px bg-moss/40" />
              <p className="eyebrow tracking-widest text-sm uppercase">Mentorship</p>
            </div>
            <h1 className="font-display text-[4rem] md:text-[6rem] lg:text-[7rem] font-light leading-tight text-moss mb-8">
              Ways to practise
            </h1>
            <p className="t-body text-ink/80 max-w-md text-lg md:text-xl font-light leading-relaxed">
              Individual teaching, workplace programmes, retreats, schools and online courses.
              The same practice, sized to whoever is in the room.
            </p>
          </div>
        </div>

        {/* THREE AUDIENCE CARDS — rounded panels floating on linen */}
        <section className="bg-linen py-20 md:py-28">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20 xl:px-32">
            <ul className="flex flex-col gap-6 md:gap-8">
              {audienceCards.map((card) => (
                <li key={card.slug}>
                  <Link
                    href={`/mentorship/${card.slug}`}
                    className="group relative flex min-h-[280px] w-full items-end overflow-hidden rounded-3xl shadow-md transition-shadow duration-300 hover:shadow-xl md:min-h-[340px]"
                  >
                    {/* Card background image */}
                    <img
                      src={card.img.src}
                      alt={card.img.alt}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Gradient so text sits over the photo */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-ink/80 via-ink/50 to-ink/10" />

                    {/* Card text */}
                    <div className="relative flex w-full flex-wrap items-end justify-between gap-6 px-8 py-10 md:px-12 md:py-12 lg:px-16">
                      <div>
                        <p className="label text-[0.62rem] text-linen/50">{card.n}</p>
                        <h2 className="mt-3 font-display text-[2rem] font-light leading-tight text-linen md:text-[2.6rem] lg:text-[3rem]">
                          {card.title}
                        </h2>
                        <p className="mt-1 label text-[0.62rem] tracking-widest text-gold/80 uppercase">
                          {card.subtitle}
                        </p>
                        <p className="mt-4 max-w-[42ch] leading-relaxed text-linen/75 text-[0.95rem]">
                          {card.body}
                        </p>
                      </div>

                      {/* Arrow */}
                      <span className="inline-flex shrink-0 items-center gap-3 label text-[0.68rem] text-linen/60 transition-all duration-300 group-hover:gap-5 group-hover:text-linen">
                        Explore
                        <svg
                          width="24" height="10" viewBox="0 0 24 10" fill="none"
                          className="transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden
                        >
                          <path d="M0 5h22M18 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CtaBand
          title="Begin where you are"
          /* There is no booking system on this site and none is specified,
             so this says how it actually starts. Kept from main: it replaced
             a four-step "How it works" section that invented the rest. */
          body="There is no booking system here. Write, or send a message on WhatsApp, and she will answer you directly."
          primary={{ href: "/contact", label: "Start a conversation" }}
          secondary={{ href: "/workshops", label: "See Workshops" }}
        />
      </main>

      <SiteFooter />

      <JsonLd data={[breadcrumbLd([{ name: "Mentorship", path: "/mentorship" }]), catalogueLd]} />
    </>
  );
}
