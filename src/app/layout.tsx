import type { Metadata } from "next";
import { Cormorant_Garamond, Lato, Cinzel } from "next/font/google";
import Preloader from "@/components/Preloader";
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

export const metadata: Metadata = {
  title: "Raw On Earth — Yoga, Mindfulness & Corporate Well-being",
  description:
    "Yoga, mindfulness and corporate well-being with Rajalakshmi V. Work on yourself before you work for somebody else.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${cormorant.variable} ${lato.variable} ${cinzel.variable}`}>
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
