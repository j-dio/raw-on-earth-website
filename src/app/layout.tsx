import type { Metadata } from "next";
import { Cormorant_Garamond, Lato, Cinzel } from "next/font/google";
import Preloader from "@/components/Preloader";
import Motion from "@/components/Motion";
import JsonLd, { organisationLd, websiteLd } from "@/components/JsonLd";
import { site } from "@/data/site";
import { isPreview } from "@/lib/env";
import "./globals.css";

/* next/font/google self-hosts the files at build time, so there is no runtime
   request to Google and nothing Vercel-only here. Faces settled 2026-08-21 by
   measuring ouranoyoga.com: Cormorant Garamond headings, Lato body. Cinzel is
   held back for small all-caps labels only. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-cinzel",
  display: "swap",
});

/* metadataBase is what turns every relative OG image path on every page into an
   absolute URL. Without it Next warns at build and social cards silently break.
   It reads NEXT_PUBLIC_SITE_URL - set that in the Hostinger dashboard. */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Yoga, Mindfulness & Corporate Well-being`,
    /* Page files export their own bare title; the brand is appended here so no
       page has to remember to do it. */
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.founder }],
  creator: site.founder,
  keywords: [
    "yoga Bangalore",
    "corporate wellness India",
    "mindfulness coaching",
    "Hatha yoga",
    "Ashtanga Vinyasa",
    "breathwork",
    "online yoga classes",
    "JP Nagar yoga",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
    url: site.url,
    images: [{ url: "/og/default.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image" },
  robots: isPreview ? { index: false, follow: false } : { index: true, follow: true },
  alternates: { canonical: "/" },
};

/* Light UI: the site is linen top to bottom, so a browser that tints its own
   chrome should tint it to match rather than guess. */
export const viewport = {
  themeColor: "#F3F1E9",
  colorScheme: "light" as const,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${cormorant.variable} ${lato.variable} ${cinzel.variable}`}>
      <body>
        {/* First thing in the tab order, hidden until it has focus. Nine nav
            items is a lot to tab past on every page. */}
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-moss focus:px-6 focus:py-3 focus:text-[0.72rem] focus:text-linen"
        >
          Skip to content
        </a>

        <Preloader />
        <Motion />
        {children}

        <JsonLd data={[organisationLd, websiteLd]} />
      </body>
    </html>
  );
}
