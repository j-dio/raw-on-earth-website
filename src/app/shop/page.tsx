import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { Button, LeafRule } from "@/components/ui";
import { site } from "@/data/site";
import { pageMeta, breadcrumbLd } from "@/lib/seo";

/* Shop. Two blocks and nothing else, because there is nothing else to say:

     1. Masthead      the standard linen PageHero, so the fixed header still
                      has a light ground to sit on at scroll 0 (it paints its
                      wordmark and nav in ink until you scroll past 40px, and
                      ink on moss-deep is invisible). It also carries the one
                      H1 the spec requires.
     2. The plate     the design brief's reference image, built: a dark moody
                      photograph behind a scrim, a serif headline with one
                      italic accent word, and the client's own "something
                      exciting is coming" eyebrow above it.

   The brief says "Coming Soon ... think Raw On Earth souvenirs. No product
   list." So there is no grid, no price, no launch date and no product name.
   Inventing any of those would be inventing facts nobody at Raw On Earth has
   decided.

   No <CtaBand>. The band's own closer ("Begin your journey inward / Book your
   session") sends a visitor off to book a class from a page about merchandise,
   and it puts a moss panel immediately under a moss-deep one, which kills the
   plate it follows. This page closes on its own line instead, and that line is
   the honest one: there is no email service wired up on this site, so the only
   two things a visitor can actually do are follow her, or write to her. */

/* 158 characters. Names the actual thing on the page and promises no date,
   because there isn't one. */
export const metadata: Metadata = pageMeta({
  title: "Shop",
  description:
    "Raw On Earth souvenirs are in the making: small, useful, well-made things that carry the practice off the mat. No shop yet and no date, but news lands here.",
  path: "/shop",
  /* REMOVE `noindex` THE DAY THE SHOP OPENS. A page with no product and no
     substance is a thin-content signal against the whole domain while it sits
     in the index. src/app/sitemap.ts excludes /shop for the same reason and
     has to be changed at the same time. `follow` stays on, so the links out of
     here still carry. */
  noindex: true,
});

export default function ShopPage() {
  return (
    <>
      <SiteHeader />

      <main id="main">
        <PageHero
          eyebrow="Shop"
          title="The shop is not open yet"
          standfirst="A small collection is being made slowly, and there is no date yet. When it is ready, you will find it here."
        />

        {/* THE PLATE
            Full-bleed and dark: the one page on the site allowed a dark ground,
            and the brief's reference image is the reason.

            The scrim is 0.82 moss-deep over the photograph, and that number is
            measured, not chosen. The brightest pixel anywhere in raji-29.webp
            is rgb(241,245,253); under a 0.82 scrim it composites to
            rgb(64,78,64), where text-linen/75 reads 5.24:1 and the sand eyebrow
            5.91:1. That is a worst-case bound over the whole frame rather than
            a spot check, so no crop of the image can fail it. At 0.72 the body
            copy drops to 4.00:1 and fails, so do not lighten the scrim without
            re-running the numbers. */}
        <section className="grain relative isolate overflow-hidden bg-moss-deep text-linen">
          <img
            src="/media/gallery/raji-29.webp"
            alt="A practitioner performs a headstand on grass beneath the spreading bare branches of a large park tree."
            width={1500}
            height={2666}
            loading="eager"
            decoding="async"
            data-scrub-scale
            className="absolute inset-0 -z-10 h-full w-full object-cover object-[50%_35%]"
          />
          {/* The scrim proper. The flat 0.82 is what the contrast note above is
              measured against; the gradient layered on it only ever darkens, so
              it cannot break that bound. */}
          <div aria-hidden className="absolute inset-0 -z-10 bg-moss-deep/[0.82]" />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-b from-moss-deep via-transparent to-moss-deep/90"
          />

          {/* The enso, turning about a sixteenth of a turn across the panel's
              own scroll span. data-scroll-p publishes --p on this element and
              the inline transform reads it, so with JavaScript off it rests at
              0deg and simply sits there. No library, no keyframes, and nothing
              in globals.css to edit. */}
          <div
            aria-hidden
            data-scroll-p
            style={{ transform: "translateY(-50%) rotate(calc(var(--p, 0) * 22deg))" }}
            className="brand-mark mark-enso-ring pointer-events-none absolute -right-24 top-1/2 -z-10 h-[min(70vw,620px)] w-[min(70vw,620px)] text-linen/10 lg:right-[4%]"
          />

          <div className="relative mx-auto grid max-w-[1400px] items-center gap-16 px-6 py-28 md:px-10 md:py-40 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-24">
            <div data-reveal>
              {/* verbatim client copy - the eyebrow named in the 27 July notes
                  and set in the brief's reference image. Sand, not the .eyebrow
                  default moss, which is unreadable on this ground. */}
              <p className="eyebrow !text-sand">Something exciting is coming</p>

              {/* The reference's whole idea is one italic accent word, so this
                  heading carries markup and therefore CANNOT take data-lines:
                  the split reads textContent and would throw the <em> away.
                  data-lines is spent on the closing line below instead, which
                  is plain text. */}
              <h2 className="mt-7 font-display text-[clamp(2.4rem,6vw,4.4rem)] font-light leading-[1.02] tracking-[-0.005em] text-balance">
                Something is quietly <em className="italic text-sand">in the making</em>
              </h2>

              <LeafRule tone="linen" className="mt-12 max-w-[22rem]" />

              <div className="mt-12 max-w-[46ch] space-y-6 leading-[1.75] text-linen/75">
                <p>
                  It will be Raw On Earth souvenirs. Small, useful, well-made things
                  that carry the practice off the mat and into an ordinary day.
                </p>
                <p>
                  Each one is being chosen the way a practice is built, slowly, and
                  only when it is right. There is nothing to sell you today: no list,
                  no prices, and no date to hold you to.
                </p>
              </div>

              {/* The page's one split heading. Plain text, so the line split is
                  safe here. */}
              <p
                data-lines
                className="mt-14 max-w-[18ch] font-display text-[clamp(1.8rem,3.4vw,2.9rem)] font-light italic leading-[1.15] text-sand"
              >
                It will arrive when it is ready.
              </p>

              {/* The one interactive thing, and it is honest. There is no email
                  service on this site, so a "notify me" field would be a box
                  that quietly drops whatever a visitor types into it. These two
                  links go somewhere real. */}
              <div className="mt-14 border-t border-linen/15 pt-10">
                <p className="max-w-[44ch] leading-relaxed text-linen/75">
                  Follow on Instagram, or leave your name and I will write to you when
                  it opens.
                </p>
                <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                  {/* next/link for the internal route. The classes match the
                      house Button's `linen` variant, which is an anchor and so
                      cannot serve an internal link here. */}
                  <Link
                    href="/contact"
                    className="label inline-flex items-center justify-center rounded-full bg-linen px-8 py-[0.95rem] text-center text-[0.72rem] text-moss transition-colors duration-300 hover:bg-sand"
                  >
                    Leave your name
                  </Link>
                  <Button href={site.social.instagram} variant="light" external>
                    Follow on Instagram
                  </Button>
                </div>
              </div>
            </div>

            {/* The still life. A crisp plate against a heavily scrimmed backdrop
                is what gives the panel a foreground; without it the type floats
                on a wash. Gold hairline, because gold is a rule colour and this
                is a rule. Hidden below lg: stacked under a column of type it
                becomes a second full-width picture on a page that is meant to
                be quiet. */}
            <figure className="relative hidden lg:block" data-reveal>
              <img
                src="/media/gallery/meditation-01.webp"
                alt="Crossed bare feet rest beneath an open yoga anatomy book, lit by a warm shaft of afternoon sun on a tiled floor."
                width={1500}
                height={2666}
                loading="lazy"
                decoding="async"
                className="aspect-[3/4] w-full object-cover"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 border border-gold/40"
              />
            </figure>
          </div>
        </section>
      </main>

      <SiteFooter />

      {/* Breadcrumb only. There is no product, no offer and no price, so an
          OfferCatalog or a Product here would be structured data describing
          something that does not exist. */}
      <JsonLd data={[breadcrumbLd([{ name: "Shop", path: "/shop" }])]} />
    </>
  );
}
