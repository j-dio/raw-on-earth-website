import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { Section, SectionHead, CtaBand, Prose } from "@/components/ui";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { site } from "@/data/site";
import { story, belief, journey } from "@/data/about";

/* About:

     1. Story      her own words on how she got here.
     2. Belief     the brief indents this quote away from the running copy, so
                   it gets a panel rather than a paragraph.
     3. Journey    the brief's "Journey" list, seven items.

   Two things used to sit after 3 and are both gone, on 2026-09-17: the
   corporate client list, which moved to /workshops, and a three-frame photo
   band. See the comments where each stood.

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
    "Rajalakshmi V on the practice behind Raw On Earth: thirteen years of Hatha and Ashtanga Vinyasa, training in Rishikesh and Dharamshala, and a practice taught to individuals, schools and organisations.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main id="main">
        <PageHero
          /* No enso here: this masthead is too short to hold it without the
             arc being cut by a straight line. See the `mark` prop in
             PageHero. */
          mark={false}
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
        {/* BELIEF. On the page's own left rule, not centred.

            Retyped 2026-09-17. Measured at 1440x900, this panel had stacked
            five treatments at four widths, all centred: a 47-character sentence
            in 12.8px tracked Montserrat caps across 688px, a 48px italic
            Cormorant quote across 688px, two 16px Lato paragraphs across 403px,
            then a 32px italic Cormorant line across 403px. Two italic Cormorant
            sizes in one block is why it was hard to tell which line was the
            statement, and the body was running `leading-relaxed` (1.625) rather
            than the site's own 2.0.

            Centring was the deeper fault. The reference centres a statement
            only when the statement stands ALONE - measured on its home page,
            one block, 38px Cormorant, weight 300, 1px tracking, not italic, on
            645px, with nothing stacked around it. Where a display line sits
            WITH prose it left-aligns the whole thing: /mentoring/ runs heading,
            standfirst and body all left on one 365px rule.

            Ours is the second shape and cannot be the first: "Raw On Earth grew
            from THAT BELIEF" points back at the quote, so the prose has to
            follow it. The band therefore uses the same `Section` container the
            story above does, and every line in both blocks starts on one rule -
            208px at 1440, 128 at 1280, 40 on a tablet.

            NOT the same rule as the H1 above them, and that is a separate
            fault: PageHero runs `max-w-[1400px] px-6 md:px-10` while `Section`
            runs `max-w-[1280px] ... lg:px-20 xl:px-32`, so from `lg` up the
            masthead sits 148px further left than the page under it (60 against
            208 at 1440). They agree below `lg`. That gap is in every inner
            page, not just this one, so it wants fixing in the two components
            rather than here.

            Roles, all of them already in the scale: `.t-statement` for the
            belief (written from that 38px measurement, and a held sentence
            rather than a heading), `.t-body` for her prose, `.t-lead` for the
            strapline - display and italic, but clearly below the statement
            instead of beside it. The lead-in keeps her words and loses the
            tracked caps: it ends in a colon and runs into the quote, so it is a
            sentence, not a label.

            `max-w-[19.6em]` on the blockquote is measured, and em not rem so it
            tracks the clamp. At 38px the quote's first sentence renders 728px
            and the same run plus "It" renders 765px, so any measure inside that
            37px window breaks the line on the full stop - which is the break
            the sentence wants and the one `text-wrap: balance` could never
            find, because balance optimises for even lines. 19.6em is 745px at
            38px and holds the same ratio at every step of the clamp. Hence also
            `[text-wrap:wrap]`, which turns the scale's balance off here. */}
        <Section className="relative overflow-hidden bg-mist-pale py-24 md:py-32">
          <figure data-reveal>
            {/* verbatim client copy */}
            <figcaption className="text-ink/60">{belief.intro}</figcaption>
            {/* verbatim client copy */}
            <blockquote
              data-lines
              className="t-statement mt-6 max-w-[19.6em] [text-wrap:wrap] text-moss"
            >
              {belief.quote}
            </blockquote>
          </figure>

          {/* Her closing lines, which follow the belief in the source and read
              as its consequence - "Raw On Earth grew from THAT BELIEF" points
              back at the quote, so this prose cannot be moved above it and the
              block has to stack rather than run beside it. The last of the
              three is her strapline, which the footer carries too, so it stays
              display type; the two before it are prose and are set as prose. */}
          <div className="mt-14 max-w-[55ch] space-y-6" data-reveal>
            {/* verbatim client copy */}
            {story.closing.slice(0, -1).map((line) => (
              <p key={line.slice(0, 32)} className="t-body text-ink/75">
                {line}
              </p>
            ))}
          </div>

          {/* verbatim client copy */}
          <p className="t-lead mt-14 text-moss" data-reveal>
            {story.closing[story.closing.length - 1]}
          </p>
        </Section>

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
          {/* Three across at every width, including a phone. Stacked, the three
              figures were three full-width rows of mostly empty linen and the
              set read as a list rather than as one measurement of her practice.

              The phone sizes are measured against the narrowest cell, not
              guessed. At 390px the Section leaves 342px, so a cell is 113px;
              at 320px it is 90px. "5,000+" is the widest string and renders
              about 2.46x its font size in Cormorant, so px-3 (12px each side)
              leaves 66px at 320px and 1.5rem renders 59px into it. The labels
              are hers and unshortened: at 0.75rem the widest, "Participants",
              is 63px and fits one line, and only "Years of experience" wraps -
              to two, which is what it should do. */}
          <ul className="grid grid-cols-3 gap-px bg-ink/15 pt-px" data-reveal-stagger>
            {journey
              .filter((item) => item.lead)
              .map((item) => (
                <li
                  key={item.label}
                  className="flex flex-col gap-2 bg-linen px-3 py-6 sm:gap-3 sm:p-8 md:p-10"
                >
                  <span
                    className="font-display text-[1.5rem] font-light leading-none text-moss sm:text-[2.6rem] md:text-[3.2rem]"
                    data-count={item.count}
                    data-count-suffix={item.suffix}
                  >
                    {item.lead}
                  </span>
                  <span className="text-[0.75rem] leading-snug text-ink/75 sm:text-[0.95rem]">
                    {item.label}
                  </span>
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

        {/* CORPORATE CREDENTIALS moved to /workshops on 2026-09-17.

            She asked for the companies herself - "these companies have to be
            projected somewhere. You think about it. I'll leave it to you"
            (00:55:45) - and left the placement open. Her own 27 July brief
            closes it: Tab 3 is "Events (regular, one to one) + Gallery ...
            Photos - online session / offline / 1-2 corporate pics". The
            credential belongs beside the corporate work, not in the middle of
            her life story, and the list is thirteen names now, which needs the
            room that page has. See the "For organisations and schools" section
            in src/app/workshops/page.tsx. */}

        {/* The three-frame photo band stood here and is removed, 2026-09-17.

            It ran raji-08, raji-09 and raji-24 at three ratios with a stagger.
            All three were the same seated moment from the same golden-hour
            shoot, and after the story portrait changed to raji-10 the page was
            showing four near-identical frames of one pose. A breath before the
            closing band is worth having; four versions of it is a gallery, and
            Community already is one.

            The page now closes on her strapline in the belief panel and then
            the CtaBand, which is the shape the rest of the site uses. */}

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
