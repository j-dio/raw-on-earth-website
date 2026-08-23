import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { LeafRule, Button } from "@/components/ui";
import { nav } from "@/data/site";

/* A 404 that is part of the site rather than the framework's default page.
   Nine top-level routes and a Shop that is not open yet means a mistyped URL
   is likely enough to be worth designing for.

   noindex, and no sitemap entry: a soft 404 in the index is worse than none. */
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />

      <main id="main" className="page-hero relative overflow-hidden bg-linen">
        <div className="mx-auto max-w-[1400px] px-6 pb-28 pt-44 md:px-10 md:pb-36 md:pt-52">
          <p className="eyebrow page-hero-in">404</p>
          <h1 className="page-hero-title mt-6 max-w-3xl font-display text-[clamp(2.6rem,7vw,4.6rem)] font-light leading-[0.98] text-balance text-moss">
            This path does not go anywhere
          </h1>
          <p className="page-hero-in mt-8 max-w-[46ch] font-display text-[clamp(1.15rem,2vw,1.45rem)] italic leading-snug text-ink/75">
            The page you were looking for has moved, or was never here. Nothing is
            lost. Start again from anywhere below.
          </p>

          <LeafRule className="page-hero-in mt-14 max-w-xl" />

          <nav aria-label="All pages" className="mt-12">
            <ul className="hairline max-w-3xl sm:grid-cols-2 lg:grid-cols-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="label flex h-full items-center bg-linen px-6 py-5 text-[0.72rem] text-ink transition-colors duration-300 hover:bg-moss hover:text-linen"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-12">
            <Button href="/">Back to the beginning</Button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
