/* One source of truth for the things that repeat on every page: the name,
   address, phone, socials and the nav. Header, footer, sitemap, metadata and
   the JSON-LD block all read from here, so a change to her phone number is one
   edit rather than nine.

   Facts settled from the business cards (docs/brand/business-card-rajalakshmi.pdf)
   and the content PDF's footer block. `email` is still the gmail address: the
   move to a professional address is an open question with the client. */

export const site = {
  name: "Raw On Earth",
  /* Her note, 27 July: "For now - let it just be Rajalakshmi V". The full
     surname is on the business cards but is deliberately not used on the site. */
  founder: "Rajalakshmi V",
  founderTitle: "Wellness Architect",
  tagline: "Real. Awakening. Wellbeing.",
  // verbatim client copy - the strapline that runs through everything
  strapline: "Work on yourself before you work for somebody else.",
  description:
    "Yoga, mindfulness and corporate well-being with Rajalakshmi V. Hatha and Ashtanga Vinyasa, breathwork and meditation, taught online and in Bangalore.",

  phone: "+91 78928 62634",
  phoneHref: "tel:+917892862634",
  /* wa.me wants the number with no plus and no spaces. The CTA that used to say
     "Book a Session" points here or at /contact - there is no booking system
     and the brief specifies none. */
  whatsapp: "https://wa.me/917892862634",
  email: "rawonearth@gmail.com",
  emailHref: "mailto:rawonearth@gmail.com",

  locality: "JP Nagar, Bangalore",
  region: "Karnataka",
  country: "IN",

  social: {
    instagram: "https://www.instagram.com/raw_on_earth/",
    linkedin: "https://www.linkedin.com/in/rajalakshmi-v-332707127/",
    substack: "https://rawonearth.substack.com/",
  },

  /* Production is Hostinger and the domain is not pointed yet, so this is an
     env override with a placeholder default. Set NEXT_PUBLIC_SITE_URL in the
     Hostinger dashboard before launch - canonical URLs, the sitemap and the
     OG tags all resolve against it. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://rawonearth.com",
} as const;

export type NavItem = { label: string; href: string };

/* Nine top-level items, settled by the project owner 2026-08-21.
   Do not reopen the count. */
export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Workshops", href: "/workshops" },
  { label: "Community", href: "/community" },
  { label: "Gallery", href: "/gallery" },
  { label: "Shop", href: "/shop" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];
