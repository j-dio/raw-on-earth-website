import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { Section, SectionHead, CtaBand, Prose } from "@/components/ui";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { site } from "@/data/site";
import { story, belief, journey, corporateClients } from "@/data/about";

/* About:

     1. Story      her own words on how she got here.
     2. Belief     the brief indents this quote away from the running copy, so
                   it gets a panel rather than a paragraph.
     3. Journey    the brief's "Journey" list, seven items.
     4. Corporate  the four companies she named on the call. Text, never logos.
     5. Photo band three frames, no captions.

   Grounds: linen -> mist -> sand -> linen, closing on the CtaBand. One mild
   green, not a page that keeps falling into a dark panel (client, 00:46:22
   and 00:47:13).

   No masthead figure. PageHero crops its figure to 21:9 on desktop and every
   photograph of her from this shoot is a 1500x2246 portrait, which at 21:9
   keeps a horizontal band across her chest. The portrait runs in the story
   block instead. */

export const metadata: Metadata = pageMeta({
  title: "About",
  description:
    "Rajalakshmi V on the practice behind Raw On Earth: thirteen years of Hatha and Ashtanga Vinyasa, training in Rishikesh and Dharamshala, and workshops for teams at Volvo, JP Morgan, Amazon and Sayronics.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main id="main">
        <PageHero
          eyebrow="About"
          title={story.heading}
          standfirst={story.subheading}
        />

        {/* STORY - two-column editorial, portrait left. The portrait is the
            taller column, so it sets the row and the copy sits against it. */}
        <Section className="bg-linen py-24 md:py-32">
          <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5" data-reveal>
              <div data-parallax="60">
                {/* A9 - the frame carries ~18% blurred canopy above her head
                    and ~14% bare grass below her feet. 4:5 held slightly high
                    (30%) drops both and keeps the whole tree pose, head to
                    standing foot. */}
                <img
                  src="/media/gallery/raji-20.webp"
                  width={1500}
                  height={2246}
                  loading="lazy"
                  decoding="async"
                  alt="The founder balances in tree pose on a park lawn, smiling with hands pressed together at her chest."
                  className="aspect-[4/5] w-full object-cover object-[50%_30%]"
                />
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7" data-reveal>
              {/* Verbatim client copy, stored in src/data/about.ts. Rendered
                  from the data file rather than typed into the page so that
                  swapping drafts is one line there and nothing here. */}
              <Prose>
                {story.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </Prose>
            </div>
          </div>
        </Section>

        {/* BELIEF - the design brief indents these two lines away from the
            prose, so it gets a panel rather than a paragraph. It is also the
            one place on this page a heading is split and uncovered
            (data-lines, once per page).

            Was a full-bleed moss panel with linen type until 2026-09-15. The
            client could not tell whether the site was pale green or dark green
            (00:46:22) and asked for "just a mild green tone" (00:47:13), so
            the ground is mist and every child that assumed a dark ground was
            re-toned with it. */}
        <section className="relative overflow-hidden bg-mist-pale py-24 md:py-32">
          <figure className="relative mx-auto max-w-3xl px-6 text-center md:px-10" data-reveal>
            <figcaption className="eyebrow">{belief.intro}</figcaption>
            {/* verbatim client copy */}
            <blockquote data-lines className="t-quote mt-8 text-moss">
              {belief.quote}
            </blockquote>
          </figure>

          {/* Her closing lines, which follow the belief in the source and read
              as its consequence ("Raw On Earth grew from that belief"). They
              are display type rather than a fourth paragraph up in the story
              column because that is how the brief sets them. */}
          <div className="relative mx-auto mt-16 max-w-[52ch] space-y-6 px-6 text-center md:px-10" data-reveal>
            {/* verbatim client copy */}
            {story.closing.map((line, i) => (
              <p
                key={line.slice(0, 32)}
                className={
                  i === story.closing.length - 1
                    ? "t-h3 italic text-moss"
                    : "leading-relaxed text-ink/80"
                }
              >
                {line}
              </p>
            ))}
          </div>
        </section>

        {/* JOURNEY - a hairline grid, not cards. gap-px over a tinted parent
            draws the rules, so no cell owns a border and none double up.

            Two rows rather than one grid of seven: seven cells in a four-column
            grid leave a hole in the last row, and a lineage and a counted
            figure are not the same kind of thing anyway. Four credentials fill
            the first row exactly, the three figures fill the second, and the
            second list's pt-px draws the rule between them from the same
            parent tint. */}
        <Section className="tex tex-stone bg-sand/45 py-24 md:py-32">
          <SectionHead
            title="Where the practice comes from"
            standfirst="Thirteen years of study, in two lineages, taught to individuals, schools and organisations."
          />
          <ul className="mt-16 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-4" data-reveal-stagger>
            {journey
              .filter((item) => !item.lead)
              .map((item) => (
                <li key={item.label} className="flex items-end bg-linen p-8 md:p-10">
                  <span className="t-h3 text-moss">{item.label}</span>
                </li>
              ))}
          </ul>
          <ul className="grid gap-px bg-ink/15 pt-px sm:grid-cols-3" data-reveal-stagger>
            {journey
              .filter((item) => item.lead)
              .map((item) => (
                <li key={item.label} className="flex flex-col gap-3 bg-linen p-8 md:p-10">
                  <span
                    className="font-display text-[2.6rem] font-light leading-none text-moss md:text-[3.2rem]"
                    data-count={item.count}
                    data-count-suffix={item.suffix}
                  >
                    {item.lead}
                  </span>
                  <span className="text-[0.95rem] leading-snug text-ink/75">{item.label}</span>
                </li>
              ))}
          </ul>
        </Section>

        {/* A founder biography and a signed letter used to sit here. Both came
            from a content document that is no longer followed, and with the
            story above the page carried three biographies of one person. Cut
            2026-09-15; their photographs are in the band below. */}

        {/* TESTIMONIALS live on Community, not here. The client asked for them
            near the end of the site rather than on the home page (00:37:34),
            and Community is the page about the people who would be quoted.
            That section is written and is behind a guard that keeps it off the
            page while `testimonials` in src/data/home.ts is still placeholder
            text - see src/app/community/page.tsx. */}

        {/* CORPORATE CREDENTIALS (B7). She asked for this herself: "these
            companies have to be projected somewhere" (00:55:45).

            Four names as plain type and nothing else. No logos - we have no
            licence to reproduce anyone's mark - and no invented context, so
            the section makes exactly the claim she made and no larger one.
            The names and the open spelling question are in src/data/about.ts. */}
        <Section className="bg-linen pt-24 md:pt-32">
          <div className="mx-auto max-w-3xl text-center" data-reveal>
            <p className="eyebrow">Corporate work</p>
            <h2 className="t-h2 mt-5 text-moss">Taken into the workplace</h2>
            <p className="mx-auto mt-6 max-w-[54ch] leading-relaxed text-ink/80">
              Workshops have been run for teams at:
            </p>
          </div>
          <ul
            className="mx-auto mt-10 flex max-w-3xl flex-wrap items-baseline justify-center gap-x-10 gap-y-4 md:gap-x-14"
            data-reveal-stagger
          >
            {corporateClients.map((name) => (
              <li key={name} className="t-h3 text-moss">
                {name}
              </li>
            ))}
          </ul>
        </Section>

        {/* A breath between the copy and the CtaBand. Three frames, three
            different ratios, staggered so the row reads as three moments rather
            than a grid of thumbnails. No captions: the alt text carries the
            description for a screen reader and a caption under each would turn
            the band into a gallery, which Community already is. */}
        <Section wide className="bg-linen pt-20 pb-24 md:pt-24 md:pb-32">
          {/* A9 - all three are 2:3 park frames with a quarter of blurred
              canopy above the head and a strip of grass below. Each is cropped
              tighter and held low (object-position Y above 50%) because the
              dead space is mostly at the top; the Y values are per frame,
              measured off where the subject actually sits in each one. */}
          <ul className="grid gap-4 sm:grid-cols-3 md:gap-6" data-reveal-stagger>
            <li>
              <img
                src="/media/gallery/raji-08.webp"
                width={1500}
                height={2246}
                loading="lazy"
                decoding="async"
                alt="The founder sits cross-legged with hands in prayer position, eyes closed, backlit by golden-hour light in a park."
                className="aspect-[4/5] w-full object-cover object-[50%_80%] sm:mt-10"
              />
            </li>
            <li>
              <img
                src="/media/gallery/raji-10.webp"
                width={1500}
                height={2246}
                loading="lazy"
                decoding="async"
                alt="The founder meditates in lotus position with a sparkling hair clip, framed close in golden backlight."
                className="aspect-square w-full object-cover object-[50%_57%]"
              />
            </li>
            <li>
              <img
                src="/media/gallery/raji-24.webp"
                width={1500}
                height={2246}
                loading="lazy"
                decoding="async"
                alt="The founder sits in meditation with palms joined at her chest, eyes closed, on a mat in soft evening park light."
                className="aspect-[4/5] w-full object-cover object-[50%_62%] sm:mt-16"
              />
            </li>
          </ul>
        </Section>

        {/* No `body`: CtaBand's default eyebrow and title are already the
            client's own closing line, and the strapline has just been said at
            the foot of the belief panel. */}
        <CtaBand secondary={{ href: "/mentorship", label: "See Her Mentorship" }} />
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
            /* Instagram and LinkedIn only. Substack came off the site with the
               Journal (client, 00:48:30), and `sameAs` is a claim that this
               person is the same entity as that profile - not one to keep
               making about an account we no longer link to. */
            sameAs: [site.social.instagram, site.social.linkedin],
          },
        ]}
      />
    </>
  );
}
