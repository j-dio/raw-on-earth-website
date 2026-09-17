import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { CtaBand } from "@/components/ui";
import { offerings, pillars } from "@/data/home";
import { site } from "@/data/site";

export default function V2HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        {/* HERO SECTION (Pinterest Block 1) */}
        <section className="relative min-h-[100svh] overflow-hidden flex items-center bg-linen">
          {/* Background Image: Outpainted raji-28 */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/media/mockup/pin-hero.png"
              alt="Yoga outdoors"
              fill
              className="object-cover object-[70%_center]"
              priority
            />
            {/* Soft gradient to ensure text readability on the left */}
            <div className="absolute inset-0 bg-gradient-to-r from-linen/90 via-linen/50 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto flex h-full min-h-[100svh] w-full max-w-[1500px] items-center px-6 md:px-10 lg:px-14 2xl:px-20">
            {/* Original Text Data */}
            <div className="max-w-xl text-left pt-20">
              <h1 className="font-display text-[clamp(2.4rem,4.6vw,4.5rem)] font-normal uppercase leading-[1.1] tracking-[0.094em] text-moss mb-6">
                Yoga <span className="font-light text-moss/40">|</span> Life
              </h1>
              
              <p className="text-[clamp(1rem,1.9vw,1.3rem)] font-light leading-[1.6] text-ink/80 mb-10 max-w-[26ch]">
                Work on yourself before you work for somebody else.
              </p>
              
              <Link
                href="/book"
                className="bg-moss text-linen px-8 py-3.5 rounded-full text-[0.7rem] tracking-[0.15em] uppercase hover:bg-moss/90 transition-colors shadow-lg inline-block"
              >
                Book a session
              </Link>
            </div>
          </div>
        </section>

        {/* WELLNESS / ABOUT SECTION (Pinterest Block 2) */}
        {/* User requested same edits as hero, so it is a wide full-bleed image section */}
        <section className="relative min-h-[90svh] flex items-center overflow-hidden bg-linen py-24">
          <div className="absolute inset-0 z-0">
            <Image
              src="/media/mockup/pin-about.png"
              alt="Headstand under banyan tree"
              fill
              className="object-cover object-center opacity-80 mix-blend-multiply"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-linen/90 via-linen/40 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-[1400px] justify-end px-6 md:px-10 lg:px-20">
            {/* Original Text Data */}
            <div className="w-full max-w-2xl bg-linen/95 backdrop-blur-md p-10 md:p-16 shadow-2xl rounded-sm" data-reveal>
              <h2 className="t-h2 text-moss">Your Home of Wellness</h2>
              <div className="t-body mt-8 space-y-6 text-ink/80">
                <p>
                  We bring together a range of classes and practices to help you develop{" "}
                  <strong className="font-bold text-moss">
                    strength, balance and flexibility in both body and mind
                  </strong>
                  . We work to support your physical, mental and emotional well-being by providing a toolkit of resources to aid your spiritual awakening and conscious awareness.
                </p>
                <p>
                  Our offerings include{" "}
                  <strong className="font-bold text-moss">
                    Hatha Yoga, Ashtanga Vinyasa and mindful movement practices
                  </strong>
                  . These are accessible to practitioners of all levels, from beginners to experienced yogis.
                </p>
              </div>
              <p className="mt-10 font-display text-2xl italic text-moss">
                Move. Breathe. Become.
              </p>
            </div>
          </div>
        </section>

        {/* OFFERINGS / CLASSES SECTION (Pinterest Block 3) */}
        {/* Features the requested raji-13 lunge picture as the dark background */}
        <section className="relative min-h-[100svh] overflow-hidden py-24 md:py-32 flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/media/mockup/pin-classes.png"
              alt="Lunge at sunset"
              fill
              className="object-cover object-center"
            />
            {/* Heavy dark overlay for the classes grid to stand out */}
            <div className="absolute inset-0 bg-ink/75 mix-blend-multiply" />
            <div className="absolute inset-0 bg-moss/20" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-20">
            {/* Original Text Data */}
            <div className="max-w-2xl mb-16 text-linen">
              <h2 className="t-h2 text-linen">Offerings</h2>
              <p className="mt-6 leading-relaxed text-linen/80">
                Start where you are. Every offering below leads to the same place, at a
                different door.
              </p>
              
              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 pt-4 border-t border-linen/20">
                {pillars.map((pillar) => (
                  <li key={pillar.slug} className="label text-[0.75rem] text-linen">
                    {pillar.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Grid of classes */}
            <ul className="grid gap-px bg-linen/20 sm:grid-cols-2 lg:grid-cols-3">
              {offerings.map((o) => (
                <li key={o.n}>
                  <Link
                    href={o.href}
                    className="group flex h-full flex-col bg-ink/40 backdrop-blur-md p-8 transition-all duration-500 hover:bg-moss hover:text-linen md:p-10 border border-linen/10"
                  >
                    <span>
                      <span className="block font-display text-[1.75rem] text-linen leading-tight md:text-3xl">{o.title}</span>
                      <span className="mt-3 block text-[0.92rem] text-linen/70 leading-relaxed group-hover:text-linen/90">{o.body}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA FOOTER (Pinterest Block 4) */}
        {/* Solid color block (using a dark orange/rust color to match the Pinterest reference vibes) */}
        <section className="bg-[#b75d3c] py-20 text-center px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-display text-linen mb-8 tracking-wide">
              START YOUR JOURNEY
            </h2>
            <p className="text-linen/90 leading-relaxed mb-10 text-lg max-w-2xl mx-auto">
              Classes run online and in person from {site.locality}. Tell her where you are starting from and she will suggest where to begin.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/book" 
                className="inline-block bg-linen text-[#b75d3c] px-10 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors shadow-xl"
              >
                Book a Session
              </Link>
              <Link 
                href="/mentorship" 
                className="inline-block border border-linen text-linen px-10 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-linen/10 transition-colors"
              >
                See the Mentorship
              </Link>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
