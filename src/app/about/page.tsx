import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { Section, SectionHead, LeafRule, CtaBand, Prose } from "@/components/ui";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { site } from "@/data/site";
import { activeStory, belief, founderBio, journey, letter } from "@/data/about";
import { testimonials } from "@/data/home";

/* About. Six blocks, in the order the two client documents put them:

     1. Story          the chosen draft. TWO drafts exist and the client has
                       not picked; src/data/about.ts holds both and `activeStory`
                       is the one line that switches them.
     2. Belief         the design brief sets this quote apart from the running
                       copy, so it gets the vertical-rule panel rather than a
                       paragraph.
     3. Journey        the brief's own "Journey" list, seven items.
     4. Founder bio    content PDF, "Meet Rajalakshmi, the Founder".
     5. The letter     content PDF, "A Note from Raji's Mat". Set as a letter,
                       because it is one - it is the emotional centre of the
                       page and the only signed piece of copy on the site.
     6. Testimonials   PLACEHOLDER quotes. See the section comment.

   No masthead figure. PageHero crops its figure to 21:9 on desktop and every
   photograph of her from this shoot is a 1500x2246 portrait, which at 21:9
   keeps a horizontal band across her chest. The portrait runs in the story
   block instead, at its native ratio. */

export const metadata: Metadata = pageMeta({
  title: "About",
  description:
    "Rajalakshmi V on the practice behind Raw On Earth: thirteen years of Hatha and Ashtanga Vinyasa, training in Rishikesh and Dharamshala, and a letter from her mat.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main id="main">
        <PageHero
          eyebrow="About"
          title={activeStory.heading}
          standfirst={activeStory.subheading}
        />

        {/* STORY - two-column editorial, portrait left. The portrait is the
            taller column, so it sets the row and the copy sits against it. */}
        <Section className="bg-linen py-24 md:py-32">
          <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5" data-reveal>
              <div data-parallax="60">
                <img
                  src="/media/gallery/raji-08.webp"
                  width={1500}
                  height={2246}
                  loading="lazy"
                  decoding="async"
                  alt="The founder sits cross-legged with hands in prayer position, eyes closed, backlit by golden-hour light in a park."
                  className="w-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7" data-reveal>
              {/* Verbatim client copy, stored in src/data/about.ts. Rendered
                  from the data file rather than typed into the page so that
                  swapping drafts is one line there and nothing here. */}
              <Prose>
                {activeStory.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </Prose>
            </div>
          </div>
        </Section>

        {/* BELIEF - the design brief indents these two lines away from the
            prose. Moss panel, and the one place on this page a heading is
            split and uncovered (data-lines, once per page). */}
        <section className="relative overflow-hidden bg-moss py-24 text-linen md:py-32">
          <div
            aria-hidden
            data-scrub-line
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-linen/15"
          />
          <figure className="relative mx-auto max-w-3xl px-6 text-center md:px-10" data-reveal>
            <figcaption className="eyebrow !text-sand">{belief.intro}</figcaption>
            {/* verbatim client copy */}
            <blockquote
              data-lines
              className="mt-8 font-display text-[clamp(1.8rem,4.2vw,3rem)] font-light italic leading-[1.25] text-balance"
            >
              {belief.quote}
            </blockquote>
          </figure>

          {/* Her closing lines, which follow the belief in the source and read
              as its consequence ("Raw On Earth grew from that belief"). They
              are display type rather than a fourth paragraph up in the story
              column because that is how the brief sets them. */}
          <div className="relative mx-auto mt-16 max-w-[52ch] space-y-6 px-6 text-center md:px-10" data-reveal>
            {/* verbatim client copy */}
            {activeStory.closing.map((line, i) => (
              <p
                key={line.slice(0, 32)}
                className={
                  i === activeStory.closing.length - 1
                    ? "font-display text-[1.5rem] italic leading-snug text-sand md:text-[1.8rem]"
                    : "leading-relaxed text-linen/75"
                }
              >
                {line}
              </p>
            ))}
          </div>
        </section>

        {/* JOURNEY - a hairline grid, not cards. gap-px over a tinted parent
            draws the rules, so no cell owns a border and none double up. */}
        <Section className="tex tex-stone bg-sand/45 py-24 md:py-32">
          <SectionHead
            eyebrow="Journey"
            title="Where the practice comes from"
            standfirst="Thirteen years of study, in two lineages, taught to individuals, schools and organisations."
          />
          <ul className="mt-16 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-4" data-reveal-stagger>
            {journey.map((item) => (
              <li key={item.label} className="flex flex-col justify-end gap-3 bg-linen p-8 md:p-10">
                {item.lead ? (
                  <span
                    className="font-display text-[2.6rem] font-light leading-none text-moss md:text-[3.2rem]"
                    data-count={item.count}
                    data-count-suffix={item.suffix}
                  >
                    {item.lead}
                  </span>
                ) : null}
                <span
                  className={
                    item.lead
                      ? "text-[0.95rem] leading-snug text-ink/75"
                      : "font-display text-[1.6rem] leading-tight text-moss md:text-[1.9rem]"
                  }
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* FOUNDER - offset image pair against the biography. The two frames
            are deliberately unequal and out of line with each other: a matched
            pair beside a column of text is the third two-column block on this
            page and reads as a template. */}
        <Section className="bg-linen py-24 md:py-32">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHead eyebrow="The founder" title={founderBio.heading} />
              {/* verbatim client copy */}
              <p className="mt-8 max-w-[52ch] font-display text-[1.6rem] italic leading-snug text-moss md:text-[2rem]">
                {founderBio.lead}
              </p>
              <Prose className="mt-10">
                {founderBio.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </Prose>
            </div>

            <div className="lg:col-span-5 lg:col-start-8" data-reveal>
              <img
                src="/media/gallery/raji-20.webp"
                width={1500}
                height={2246}
                loading="lazy"
                decoding="async"
                alt="The founder balances in tree pose on a park lawn, smiling with hands pressed together at her chest."
                className="aspect-[4/5] w-full object-cover"
              />
              {/* Pulled right and down out of the column so the pair reads as
                  two moments rather than a grid. Desktop only: on a phone the
                  offset would push it under the gutter. */}
              <img
                src="/media/gallery/raji-24.webp"
                width={1500}
                height={2246}
                loading="lazy"
                decoding="async"
                alt="The founder sits in meditation with palms joined at her chest, eyes closed, on a mat in soft evening park light."
                className="mt-6 aspect-[3/4] w-2/3 object-cover lg:ml-auto lg:-mr-10 lg:mt-10"
              />
            </div>
          </div>
        </Section>

        {/* THE LETTER - set as a letter and not as a section of copy: one
            narrow measure, larger leading than Prose, and a signature block
            with her own sign-off. Sand ground so it reads as a sheet of paper
            laid on the page. */}
        <section className="tex tex-stone bg-sand/45 py-24 md:py-32">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <div className="mx-auto max-w-[46rem]" data-reveal>
              <h2 className="font-display text-[clamp(2.1rem,4.4vw,3.4rem)] font-light leading-[1.06] text-moss">
                {letter.heading}
              </h2>
              <p className="mt-3 text-[0.95rem] text-ink/70">{letter.note}</p>

              <LeafRule className="mt-10" />

              {/* verbatim client copy - a signed personal letter, so the
                  measure is 58ch rather than Prose's 62ch and the leading is
                  looser. Nothing here is Prose because a letter is not a
                  section of body copy. */}
              <div className="mt-12 space-y-7 text-[1.05rem] leading-[1.9] text-ink/80">
                {letter.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)} className="max-w-[58ch]">
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-14">
                <p className="text-ink/80">{letter.signOff}</p>
                <p className="mt-4 font-display text-[2rem] font-light leading-none text-moss md:text-[2.4rem]">
                  {letter.signature}
                </p>
                <p className="mt-3 text-[0.95rem] text-ink/70">{letter.signatureRole}</p>
              </div>
            </div>

            <img
              src="/media/gallery/raji-10.webp"
              width={1500}
              height={2246}
              loading="lazy"
              decoding="async"
              alt="The founder meditates in lotus position with a sparkling hair clip, framed close in golden backlight."
              className="mx-auto mt-16 aspect-[16/10] w-full max-w-[46rem] object-cover object-top"
              data-reveal
            />
          </div>
        </section>

        {/* TESTIMONIALS
            THE QUOTES BELOW ARE PLACEHOLDER TEXT. `testimonials` in
            src/data/home.ts is not client copy - her real quotes for the online
            and the offline classes are still on the "RJ to share" list. The
            names are roles, not invented people, and nothing here claims a
            rating or a review count. Replace the array, not this markup. */}
        <Section className="bg-linen py-24 md:py-32">
          <SectionHead
            eyebrow="In her students' words"
            title="What people say"
            standfirst="Quotes from her online and in-person classes are being gathered and will be added here."
          />
          <ul className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8" data-reveal-stagger>
            {testimonials.map((t) => (
              <li key={t.name} className="border-t border-ink/15 pt-8">
                <blockquote className="font-display text-[1.4rem] font-light italic leading-snug text-moss md:text-[1.55rem]">
                  {t.quote}
                </blockquote>
                <p className="label mt-6 text-[0.7rem] text-ink/70">{t.name}</p>
                <p className="mt-2 text-[0.9rem] text-ink/70">{t.context}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* No `body`: CtaBand's default eyebrow and title are already the
            client's own closing line, and the strapline has just been said at
            the foot of the belief panel. */}
        <CtaBand secondary={{ href: "/services", label: "See What She Teaches" }} />
      </main>

      <SiteFooter />

      <JsonLd
        data={[
          breadcrumbLd([{ name: "About", path: "/about" }]),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "@id": `${site.url}/about#page`,
            url: `${site.url}/about`,
            name: `About — ${site.name}`,
            inLanguage: "en-GB",
            /* mainEntity, not `about`: this page is the founder's story, so she
               is what the page is. The @id matches the Person the root layout
               already emits as the business's founder, so the two are one node
               rather than two people with the same name. */
            mainEntity: { "@id": `${site.url}#founder` },
          },
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": `${site.url}#founder`,
            name: site.founder,
            jobTitle: site.founderTitle,
            /* Every item below is stated in her own copy. No award, no rating,
               no review count - nobody has given her one on the record. */
            knowsAbout: [
              "Classical Hatha Yoga",
              "Ashtanga Vinyasa",
              "Pranayama",
              "Breathwork",
              "Meditation",
              "Mindfulness",
              "Mobility training",
              "Strength training",
              "Conscious living",
              "Corporate well-being",
            ],
            worksFor: { "@id": `${site.url}#business` },
            url: `${site.url}/about`,
            sameAs: [site.social.instagram, site.social.linkedin, site.social.substack],
          },
        ]}
      />
    </>
  );
}
