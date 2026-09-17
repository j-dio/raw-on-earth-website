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

        {/* STORY - two-column editorial, copy left against the masthead's own
            left edge, portrait right.

            Not a 12-column grid. `grid-cols-12 gap-16` splits 1024px of content
            into 26.7px columns and eleven 64px gaps, so a `col-span-5` is 389px
            and a `col-span-6` is 480px - which is how the copy ended up the
            WIDER of the two at 480px/~60ch while the portrait sat at 389px with
            417px of dead linen under it (measured, 1440x900).

            5fr/6fr instead, so the picture stays the larger element at every
            width. A fixed `26rem` measure track does not: at 1024px it leaves
            the photograph 368px against a 416px column and the row inverts
            again. Measured with 64px of gap: 364/436 at 1024, 436/524 at 1280
            and up - the copy lands on ~54 characters, which is where the
            reference sets its own bio measure (365px).

            Sides swapped 2026-09-17. The copy now starts on the same left rule
            as the H1 above it, and the portrait is the larger element, which is
            the way round ouranoyoga.com sets its own bio row - copy 423px,
            picture 666px of a 1152px row (measured on /mentoring/, 1440px). */}
        {/* No top padding at all, and that is deliberate. PageHero's own block
            already pays `pb-14 md:pb-20` (56/80px), and this section carries
            the same linen, so any top padding here is a second gap marking a
            seam that does not exist. The full 24/32 beat left 208px of empty
            ground between her subheading and the first line of her story;
            halving it to the beat (128px) still read as a hole. The masthead's
            56/80 alone is the gap.

            The bottom keeps the full beat: below it the ground does change. */}
        <Section className="bg-linen pt-0 pb-24 md:pt-0 md:pb-32">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
            <div className="lg:col-start-1 lg:row-start-1" data-reveal>
              {/* Verbatim client copy, stored in src/data/about.ts. Rendered
                  from the data file rather than typed into the page so that
                  swapping drafts is one line there and nothing here. */}
              <Prose>
                {story.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </Prose>
            </div>

            {/* `order-first` below `lg`: the source order is copy-then-portrait
                because that is the desktop reading order, left to right. On a
                phone the same order puts seven paragraphs between the masthead
                and the only photograph of her, so the portrait is pulled back
                above the copy there. Nothing in this block is focusable, so the
                reorder costs no tab order - only the order a screen reader
                reads two static blocks in, and either order is coherent. */}
            <div className="order-first lg:order-none lg:col-start-2 lg:row-start-1" data-reveal>
              {/* Sticky, and that is what the column is for. The copy runs 904px
                  against a 660px portrait, so something had to hold the bottom
                  244px of the right-hand column - it read as an unfinished
                  corner. The picture holds while the last three paragraphs pass
                  it, which is the one authored movement on this page.

                  `top-24` (96px), not more: `lg` starts at 1024px, where a
                  landscape tablet is 768px tall, and 96 + 660 = 756 clears it.
                  The grid dropped `items-start` for the same reason - a start-
                  aligned item is only as tall as its content, so there is no
                  room for a sticky child to travel in.

                  This replaced `data-parallax="60"`. Scrubbing the picture
                  +-60px while it is pinned is two motions arguing, and the
                  sticky hold is the one that does work. */}
              <div className="lg:sticky lg:top-24">
                {/* raji-10, chosen 2026-09-17 against raji-08 and raji-09, and
                    re-cropped into its own file rather than framed with
                    object-position.

                    It replaced raji-20, which was the darkest photograph in the
                    set: mean luminance 55 of 255 across the 4:5 window this
                    frame shows, against linen at 246, with the subject about a
                    sixth of the frame high. Enlarging the picture to 524px made
                    both obvious.

                    Measured over the same tightened 4:5 window, the three
                    candidates came out 08 at 99, 09 at 90 and 10 at 111. Two
                    things the number does not carry decided it as well: 09 has
                    a fence running horizontally behind her head, and 10 is the
                    only one in full profile facing LEFT - into the copy, rather
                    than out of the page. A subject at the right-hand edge
                    should look inward.

                    `raji-10-story.webp` is crop 1160x1450 at offset (140,445)
                    of `raji-10.webp`. 83KB against the original's 128KB. Do not
                    add a filter to lift it further - the frame is hers, and the
                    gain here is framing, not grading.

                    raji-10 was also the middle frame of the photo band at the
                    foot of this page. That slot now runs raji-09, because the
                    same picture twice on one page is worse than either choice.

                    The file is already 4:5, so `object-cover` has nothing to
                    trim and the `object-position` that framed the old one is
                    gone with it.

                    `sm:max-w-[32rem]` is the tablet fix and only that: while the
                    row is still stacked, a full-width 4:5 portrait is 754x943 at
                    834px - taller than the viewport, so the story below it never
                    appeared on a first screen. 512px makes it 512x640 and lands
                    its right edge on the same rule as the prose, which `.t-body`
                    caps at 55ch (510px at this size). Left edges already agree
                    with the H1 above. The cap is dropped at `lg`, where the
                    portrait is a column again. */}
                <img
                  src="/media/gallery/raji-10-story.webp"
                  width={1160}
                  height={1450}
                  loading="lazy"
                  decoding="async"
                  alt="The founder sits in lotus position in profile, eyes closed and hands joined at her chest, her hair and arms rimmed by low golden light in a park."
                  className="aspect-[4/5] w-full object-cover sm:max-w-[32rem] lg:max-w-none"
                />
              </div>
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
          {/* One centred column, one width, and that is the whole fix.

              Retyped 2026-09-17. Measured at 1440x900, this panel stacked five
              treatments at four widths, all centred: a 47-character sentence in
              12.8px tracked Montserrat caps across 688px, a 48px italic
              Cormorant quote across 688px, two 16px Lato paragraphs across
              403px, then a 32px italic Cormorant line across 403px. Two italic
              Cormorant sizes in one block is the reason it was hard to tell
              which line was the statement, and centred running body on a 403px
              measure is why the middle of it read as ragged.

              What the reference does instead, measured on its own centred
              statement: ONE block, 38px Cormorant, weight 300, 1px of tracking,
              NOT italic, on a 645px measure, with nothing stacked around it.
              The client's instruction is the same in words - "let's not have
              too many elements" (00:30:54), "as plain as possible like orano"
              (00:27:55).

              So: `.t-statement` for the belief, which is the role written from
              that measurement and is a held sentence rather than a heading.
              `.t-lead` for her strapline, which keeps it display and italic but
              puts it clearly below the statement instead of beside it. `.t-body`
              for the prose between them, at the site's own 2.0 leading rather
              than the `leading-relaxed` 1.625 this block had been running. The
              lead-in keeps her words and loses the tracked caps: it ends in a
              colon and runs into the quote, so it is one sentence, not a label.

              32rem is the single column everything sits in - the same 512px the
              story portrait is capped at above. */}
          <div className="relative px-6 md:px-10">
            <div className="mx-auto max-w-[32rem] text-center">
              <figure data-reveal>
                {/* verbatim client copy */}
                <figcaption className="text-ink/60">{belief.intro}</figcaption>
                {/* verbatim client copy */}
                <blockquote data-lines className="t-statement mt-6 text-moss">
                  {belief.quote}
                </blockquote>
              </figure>

              {/* Her closing lines, which follow the belief in the source and
                  read as its consequence ("Raw On Earth grew from that
                  belief"). The last of the three is her strapline and the
                  footer carries it too, so it stays display type; the two
                  before it are prose and are now set as prose. */}
              <div className="mt-14 space-y-6" data-reveal>
                {/* verbatim client copy */}
                {story.closing.slice(0, -1).map((line) => (
                  <p key={line.slice(0, 32)} className="t-body mx-auto text-ink/75">
                    {line}
                  </p>
                ))}
              </div>

              {/* verbatim client copy */}
              <p className="t-lead mt-14 text-moss" data-reveal>
                {story.closing[story.closing.length - 1]}
              </p>
            </div>
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
                src="/media/gallery/raji-09.webp"
                width={1500}
                height={2246}
                loading="lazy"
                decoding="async"
                alt="The founder sits cross-legged on a mat in a park, head tilted slightly down, hands joined at her chest in late afternoon light."
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
