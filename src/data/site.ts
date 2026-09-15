/* One source of truth for the things that repeat on every page: the name,
   address, phone, socials and the nav. Header, footer, sitemap, metadata and
   the JSON-LD block all read from here, so a change to her phone number is one
   edit rather than nine.

   Facts settled from the business cards (docs/brand/business-card-rajalakshmi.pdf)
   and the 27 July notes' footer line. `email` is still the gmail address: the
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
    /* Kept only for the JSON-LD sameAs lists. The Journal page and the footer
       link are gone - she dropped Substack on 2026-09-06. */
    substack: "https://rawonearth.substack.com/",
  },

  /* Production is Hostinger and the domain is not pointed yet, so this is an
     env override with a placeholder default. Set NEXT_PUBLIC_SITE_URL in the
     Hostinger dashboard before launch - canonical URLs, the sitemap and the
     OG tags all resolve against it. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://rawonearth.com",
} as const;

export type NavItem = { label: string; href: string; children?: NavItem[] };

/* Six top-level items, cut from nine on the client call of 2026-09-06: Journal
   and Shop are gone, Services is now Mentorship, and Gallery moved inside the
   Community page.

   `children` renders as a dropdown (SiteHeader) so the top row stays short
   without losing a destination - her own sketch at 00:39:48. Gallery is a
   fragment on /community, not a route, so it is a child and never a top item. */
export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Mentorship", href: "/mentorship" },
  { label: "Workshops", href: "/workshops" },
  {
    label: "Community",
    href: "/community",
    children: [
      { label: "Community", href: "/community" },
      { label: "Gallery", href: "/community#gallery" },
    ],
  },
  { label: "Contact", href: "/contact" },
];
