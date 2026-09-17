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

export type NavItem = { label: string; href: string };

/* A header item may be a group instead of a route, so its href is optional -
   "Yoga & Meditation" is a label with a menu under it, not a page. */
export type HeaderNavItem = { label: string; href?: string; children?: NavItem[] };

/* Every route on the site, flat. This is what the sitemap and the footer read,
   so it stays a plain list of real pages - a group with no URL of its own would
   put a broken entry in both. The header's grouping is `headerNav` below.

   Cut from nine on the client call of 2026-09-06: Journal and Shop are gone,
   Services is now Mentorship, and Gallery moved inside the Community page. */
export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Mentorship", href: "/mentorship" },
  { label: "Workshops", href: "/workshops" },
  { label: "Community", href: "/community" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

/* How the header presents those routes, which is not the same shape.

   Her sketch, in her own words on the call (00:39:48): "in the yoga and
   meditation when I drop it down... we can have private classes, we can have
   community, we can have gallery rather than having so many." So one group
   carries three destinations and the top row loses two items.

   Offer first, Contact last - the reference does the same, and its dropdown is
   leftmost for the same reason: it is the thing being sold, not merely the item
   that happens to have a menu.

   Home is here for the mobile and iPad overlay only; the desktop row filters it
   out, because the wordmark beside it already goes home.

   NOTE: the group's first child reads "Mentoring". The route and the page are
   still /mentorship, which is the word she used for the page itself; the menu
   carries the shorter one. Raise it with her rather than renaming the route. */
export const headerNav: HeaderNavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Yoga & Meditation",
    children: [
      { label: "Mentoring", href: "/mentorship" },
      { label: "Community", href: "/community" },
      /* Back inside the group 2026-09-17. It was promoted to the top row with
         the gallery redesign; her ask on 6 September was the opposite - fewer
         items in the row, gallery among the dropdown's children (00:39:48). */
      { label: "Gallery", href: "/gallery" },
    ],
  },
  { label: "Workshops", href: "/workshops" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
