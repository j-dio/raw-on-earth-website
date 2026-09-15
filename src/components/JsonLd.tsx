import { site } from "@/data/site";

/* Structured data, rendered as a plain <script type="application/ld+json">.

   Next's `metadata` export cannot carry JSON-LD, so it goes in the tree. The
   only real hazard is a "</script>" sequence inside the JSON closing the tag
   early; escaping `<` covers it, and the payload here is our own data anyway.

   `dangerouslySetInnerHTML` is the documented way to do this in the Next docs.
   There is no user input in any of these objects. */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/* The site-wide graph, emitted once from the root layout.

   LocalBusiness rather than plain Organization: she teaches in person in JP
   Nagar as well as online, and the business cards give a real locality. No
   `streetAddress` or geo - a home studio address is not ours to publish, and a
   partial PostalAddress is valid.

   `HealthAndBeautyBusiness` is the closest schema.org type that exists for a
   yoga practice; there is no `YogaStudio`. */
export const organisationLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
  "@id": `${site.url}#business`,
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  slogan: site.strapline,
  image: `${site.url}/og/default.jpg`,
  logo: `${site.url}/brand/enso.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangalore",
    addressRegion: site.region,
    addressCountry: site.country,
  },
  areaServed: [
    { "@type": "City", name: "Bangalore" },
    { "@type": "Country", name: "India" },
    // Online classes are the other half of the practice, per the 27 July notes.
    { "@type": "VirtualLocation", name: "Online" },
  ],
  founder: {
    "@type": "Person",
    "@id": `${site.url}#founder`,
    name: site.founder,
    jobTitle: site.founderTitle,
    description:
      "Yoga facilitator and mindfulness coach with 13+ years of practice, trained in Rishikesh and Dharamshala in Classical Hatha Yoga and Ashtanga Vinyasa.",
    sameAs: [site.social.instagram, site.social.linkedin],
  },
  /* Substack came out on 2026-09-15 with the Journal page. Claiming the site
     and a Substack are the same entity, while linking to neither, is a claim we
     are not making. */
  sameAs: [site.social.instagram, site.social.linkedin],
} as const;

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}#website`,
  url: site.url,
  name: site.name,
  inLanguage: "en-GB",
  publisher: { "@id": `${site.url}#business` },
} as const;
