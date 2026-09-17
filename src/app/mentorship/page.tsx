import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { Section, SectionHead, LeafRule, Button, CtaBand, CONTAINER } from "@/components/ui";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { site } from "@/data/site";
import { serviceGroups, type Service } from "@/data/services";

/* Mentorship - renamed from Services, label and URL, on the client call of
   2026-09-06. The commercial page, so it has to convert without raising its
   voice. Everything on it is read out of src/data/services.ts - the page never
   names a service in its own markup, so adding one is an object and nothing
   here has to change.

   Five groups is a lot to scan, so the block SHAPE changes between them
   instead of five identical grids: portrait-left editorial (Individual),
   numbered list on a moss ground (Corporate), full-bleed plate over a wide
   stacked list (Retreats), hairline grid on sand (Schools), three divided
   columns (Online). The "three ways in" strip above them carries the five anchors, so
   the page stays navigable without a sticky sidebar.

   Grounds are all light since 2026-09-15: linen, a quiet linen, mist, sand/45.
   No section takes a dark ground any more - the old corporate band was moss and
   the page dropping in and out of dark green is what the client asked us to stop
   (call, 00:46:22). Old order for reference: linen - linen(quiet) - MOSS - linen - sand/45 - linen -
   MOSS(CtaBand). Two moss panels, which is the ceiling in the page spec.

   No client company is named. The business cards list them, but publishing
   those names is her call and possibly theirs, so Corporate says the sector
   instead. Do not "improve" that into a logo wall.

   There is no booking system and the brief specifies none, so every CTA on
   this page goes to /contact or to WhatsApp. */

export const metadata: Metadata = pageMeta({
  title: "Mentorship",
  description:
    "Private yoga, mindfulness coaching, breathwork, corporate well-being, retreats, school sessions and online courses with Rajalakshmi V in Bangalore.",
  path: "/mentorship",
});

/* Format / who-it-suits, set under a service. Only fields the client has
   actually stated ever reach it (see services.ts), so this renders nothing
   rather than inventing a duration.

   Two type roles, not one: the delivery format is a tracked label because it
   is the same handful of words on every card, but "who it suits" is a real
   sentence and was unreadable set as tracked caps at 10px - on a phone it
   wrapped to two lines of shouting. */
function Meta({ service }: { service: Service }) {
  const format = [service.format, service.duration].filter(Boolean).join("  ·  ");
  if (!format && !service.for) return null;

  return (
    <p
      className={`mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 ${
        "text-ink/70"
      }`}
    >
      {format ? <span className="label text-[0.62rem]">{format}</span> : null}
      {service.for ? <span className="text-[0.85rem] leading-snug">{service.for}</span> : null}
    </p>
  );
}

const [individual, corporate, retreats, schools, online] = serviceGroups;


const howItWorks = [
  {
    n: "01",
    title: "Say hello",
    body: "Write, or send a message on WhatsApp. Tell her roughly what you are after and where you are starting from.",
  },
  {
    n: "02",
    title: "A short conversation",
    /* No duration and no price here on purpose. Nobody has quoted either, and
       an invented "twenty minutes, no charge" is a commercial promise the site
       would be making on her behalf. */
    body: "A conversation before anything is booked. What you want, what your body is doing, what your week actually looks like.",
  },
  {
    n: "03",
    title: "A plan",
    body: "Raji comes back with what she would teach and how often. If a different teacher or a different practice would suit you better, she says so.",
  },
  {
    n: "04",
    title: "Practise",
    body: "You begin. The plan gets adjusted as you go, because a body in week eight is not the body that started.",
  },
];

/* OfferCatalog built FROM the data array, so the schema cannot drift from the
   page. No prices and no rating: nobody has quoted a price and there are no
   reviews on the site yet. */
const catalogueLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "@id": `${site.url}/mentorship#catalogue`,
  name: `Mentorship - ${site.name}`,
  url: `${site.url}/mentorship`,
  provider: { "@id": `${site.url}#business` },
  itemListElement: serviceGroups.map((group, i) => ({
    "@type": "OfferCatalog",
    position: i + 1,
    name: group.title,
    description: group.intro,
    url: `${site.url}/mentorship#${group.slug}`,
    itemListElement: group.services.map((service, j) => ({
      "@type": "Service",
      position: j + 1,
      name: service.name,
      description: service.summary,
      serviceType: group.title,
      provider: { "@id": `${site.url}#business` },
    })),
  })),
};

/* One frame per service group, for the card row. Chosen by looking at each
   file, and kept away from the photographs the five sections below already
   use so the page does not show the same picture twice.

   `schools` is the only one with children in it, and that is unavoidable for a
   schools card. The same permission note applies as to the masthead: "whether
   the 27 children's faces may be published" is still open in
   docs/CLIENT-BRIEF.md. */
const groupImages: Record<string, { src: string; alt: string }> = {
  individual: {
    src: "/media/gallery/teaching-05.webp",
    alt: "A teacher steadies a student folding forward over one leg on a mat in a red-floored hall.",
  },
  corporate: {
    src: "/media/gallery/meditation-05.webp",
    alt: "People sit cross-legged on coloured mats in a concrete-floored hall, hands resting on their knees and eyes closed.",
  },
  retreats: {
    src: "/media/gallery/community-03.webp",
    alt: "A group kneels on mats on grass beneath a large spreading tree in a park.",
  },
  schools: {
    src: "/media/gallery/kids-33.webp",
    alt: "School children sit cross-legged on mats in an outdoor yard while the founder moves among them.",
  },
  "online-programmes": {
    src: "/media/gallery/meditation-06.webp",
    alt: "A woman sits upright in meditation on a mat by a window, others seated further back in the room.",
  },
};

export default function MentorshipPage() {
  return (
    <>
      <SiteHeader />

      <main id="main">
        {/* MASTHEAD, in the shape /gallery uses rather than the shared
            PageHero: the photograph is the ground, washed back under a linen
            gradient, with the type on it. Client preference, 2026-09-17.

            Two things deliberately NOT copied from /gallery. Its masthead
            heading is an `h2` and that page has NO h1 at all - a real
            accessibility and search fault there, not a pattern to spread. And
            the type block uses CONTAINER, so it lands on the same left rule as
            every section below it.

            No `.page-hero` class either: that carries the faint enso
            watermark, which is paper behind type on linen and clutter over a
            photograph. The entry animations are kept by their own classes. */}
        <section className="relative overflow-hidden bg-linen">
          <div className="absolute inset-0 z-0">
            <img
              src="/media/hero/services.webp"
              alt=""
              aria-hidden="true"
              width={1500}
              height={844}
              className="h-full w-full object-cover"
            />
            {/* Scrim measured on the rendered page, sampling background only,
                beside the type rather than through it: darkest pixel 219 under
                the H1 and 228 beside the standfirst, giving moss 7.66:1 and
                ink/75 5.91:1. Both are large text and need 3.0. */}
            <div className="absolute inset-0 bg-gradient-to-b from-linen/78 via-linen/90 to-linen" />
          </div>

          <div className={`${CONTAINER} relative z-10 pt-36 pb-20 md:pt-44 md:pb-28`}>
            <div
              className="page-hero-in flex items-center gap-4"
              style={{ "--d": "80ms" } as React.CSSProperties}
            >
              <span className="h-px w-6 bg-moss/40" />
              <p className="eyebrow">Mentorship</p>
            </div>
            <h1
              className="page-hero-title t-h1 mt-6 text-moss"
              style={{ "--d": "160ms" } as React.CSSProperties}
            >
              Ways to practise
            </h1>
            <p
              className="page-hero-in t-lead mt-8 max-w-[46ch] text-ink/75"
              style={{ "--d": "320ms" } as React.CSSProperties}
            >
              Individual teaching, workplace programmes, retreats, schools and online courses. The
              same practice, sized to whoever is in the room.
            </p>
          </div>
        </section>

        {/* THE PAGE INDEX, as cards. Client preference 2026-09-17: the shape
            is /gallery's category row - a bordered card, the picture on top,
            the name on a pale bar beneath it.

            It replaced three hairline cells that grouped the five sections
            into "three ways in" and then listed the groups as small text
            links inside them. Two levels of grouping over five items, and the
            links were 10px caps. One card per group is flatter and every card
            is a target.

            Anchors, not routes: each of the five sections is on this page and
            already carries its own id. */}
        <Section className="bg-sand/40 py-16 md:py-24">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow">Choose a way in</p>
              <h2 className="t-h2 mt-5 text-moss">Five ways to practise</h2>
            </div>
            <p className="max-w-md leading-relaxed text-ink/75">
              Some of this is taught to one person, some to a room of forty, and some over video to
              whoever can get to a screen. Pick the one that sounds like you.
            </p>
          </div>

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal-stagger>
            {serviceGroups.map((group) => (
              <li key={group.slug}>
                {/* The whole card is the link, so the target is the card and
                    not a line of small caps inside it. */}
                <a
                  href={`#${group.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-moss/10 bg-linen shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:border-moss/30 hover:shadow-md"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={groupImages[group.slug].src}
                      alt={groupImages[group.slug].alt}
                      width={1500}
                      height={1125}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col border-t border-moss/10 p-6 md:p-7">
                    <p className="label text-[0.6rem] text-moss/70">{group.eyebrow}</p>
                    <h3 className="mt-3 font-display text-[1.5rem] font-light leading-tight text-moss">
                      {group.title}
                    </h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/75">{group.intro}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </Section>

        {/* INDIVIDUAL - portrait left, hairline-separated list right. */}
        <Section id={individual.slug} className="bg-linen py-24 md:py-32">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5" data-reveal>
              <img
                src="/media/gallery/raji-11.webp"
                alt="The founder folds into a standing side stretch with her eyes closed, lit from behind in a park at dusk."
                width={1500}
                height={2246}
                loading="lazy"
                decoding="async"
                data-scrub-scale
                /* max-h: the sticky column is taller than a 720px laptop
                   viewport, so without it the foot of the picture is never
                   seen. */
                className="aspect-[3/4] w-full object-cover lg:sticky lg:top-28 lg:max-h-[calc(100svh-9rem)]"
              />
            </div>

            <div className="lg:col-span-7">
              <SectionHead eyebrow={individual.eyebrow} title={individual.title} standfirst={individual.intro} />
              <ul className="mt-12 border-t border-ink/15" data-reveal-stagger>
                {individual.services.map((service) => (
                  <li key={service.slug} className="border-b border-ink/15 py-8">
                    <h3 className="font-display text-[1.6rem] font-light leading-tight text-moss md:text-[2rem]">
                      {service.name}
                    </h3>
                    <p className="mt-3 max-w-[52ch] leading-relaxed text-ink/80">{service.summary}</p>
                    <Meta service={service} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* CORPORATE - the highest-value group, so it gets the one dark ground
            on the page and a numbered editorial list rather than a grid.

            The decorative vertical rule that used to sit here was removed: at
            1024-1480px the container's own gutter equals the rule's offset, so
            it landed exactly on the first letter of every line and read as a
            stray border. The motif still closes the page in the CtaBand. */}
        {/* Mist, not moss. A whole section never takes dark green as its ground
            any more - the client found the page dropping in and out of dark green
            confusing (call, 00:46:22). Moss 8.19:1 on mist. */}
        <section id={corporate.slug} className="bg-mist-pale text-ink">
          <Section className="py-24 md:py-32">
            <SectionHead
              eyebrow={corporate.eyebrow}
              title={corporate.title}
              standfirst={corporate.intro}
            />

            <ol className="mt-16 grid gap-x-16 gap-y-12 md:grid-cols-2" data-reveal-stagger>
              {corporate.services.map((service, i) => (
                /* An odd number of services in a two-column grid leaves the
                   last cell's neighbour empty, which reads as a broken layout
                   rather than as space. The odd one out runs full width, so
                   its rule crosses the panel and the row looks deliberate. */
                <li
                  key={service.slug}
                  className={`border-t border-ink/15 pt-6 ${
                    corporate.services.length % 2 === 1 && i === corporate.services.length - 1
                      ? "md:col-span-2"
                      : ""
                  }`}
                >
                  <p className="label text-[0.62rem] text-moss/70">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-4 font-display text-[1.6rem] font-light leading-tight text-moss md:text-[2rem]">
                    {service.name}
                  </h3>
                  <p className="mt-3 max-w-[48ch] leading-relaxed text-ink/75">{service.summary}</p>
                  <Meta service={service}  />
                </li>
              ))}
            </ol>

            <div className="mt-16 flex flex-col items-start gap-4 sm:flex-row sm:items-center" data-reveal>
              <Button href="/contact" variant="solid">
                Discuss a programme
              </Button>
              <Button href={site.whatsapp} variant="ghost" external>
                Message on WhatsApp
              </Button>
            </div>
          </Section>
        </section>

        {/* RETREATS - a plate across the measure, then a wide stacked list. */}
        <section id={retreats.slug} className="bg-linen py-24 md:py-32">
          <Section wide>
            <div className="overflow-hidden" data-reveal>
              <img
                /* A quiet plate, deliberately. What stood here was a tight
                   close-up of a student being spotted in crow pose - a good
                   photograph, but the section it heads is "Away from the
                   city" and the frame was the most physically intense thing
                   on the page.

                   An open book on a tiled floor is the opposite, and it is
                   not decoration: the retreat copy below says "morning
                   practice, afternoon study". This is the study. */
                src="/media/gallery/meditation-01.webp"
                alt="A well-thumbed book lies open on a tiled floor at a page describing the Ashtanga sequence, a bare foot resting at the edge of the frame."
                width={1500}
                height={2666}
                loading="lazy"
                decoding="async"
                data-scrub-scale
                className="aspect-[4/5] w-full object-cover object-center sm:aspect-[16/9] lg:aspect-[21/9]"
              />
            </div>
          </Section>

          <Section className="mt-16 md:mt-20">
            <SectionHead eyebrow={retreats.eyebrow} title={retreats.title} standfirst={retreats.intro} />
            <LeafRule className="mt-14 max-w-[240px]" />

            <div className="mt-14 space-y-14" data-reveal-stagger>
              {retreats.services.map((service) => (
                <article key={service.slug} className="grid gap-6 md:grid-cols-12 md:gap-10">
                  <h3 className="font-display text-[1.6rem] font-light leading-tight text-moss md:col-span-4 md:text-[2rem]">
                    {service.name}
                  </h3>
                  <div className="md:col-span-8">
                    <p className="max-w-[58ch] leading-relaxed text-ink/80">{service.summary}</p>
                    {service.includes ? (
                      <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
                        {service.includes.map((item) => (
                          <li
                            key={item}
                            className="label rounded-full border border-gold/50 px-4 py-2 text-[0.6rem] text-ink/80"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <Meta service={service} />
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-14 max-w-[58ch] leading-relaxed text-ink/80" data-reveal>
              Dates are announced as they are set. Past and upcoming immersions live on the{" "}
              <Link href="/workshops" className="link">
                Workshops page
              </Link>
              .
            </p>
          </Section>
        </section>

        {/* SCHOOLS - hairline grid. `.hairline` is the shared grid rule from
            globals.css: gap-px over a tinted parent, so no cell owns a border. */}
        <Section id={schools.slug} className="tex tex-stone bg-sand/45 py-24 md:py-32">
          <SectionHead eyebrow={schools.eyebrow} title={schools.title} standfirst={schools.intro} />
          <ul className="hairline mt-14 md:grid-cols-3" data-reveal-stagger>
            {schools.services.map((service) => (
              <li key={service.slug} className="bg-linen p-8 md:p-10">
                <h3 className="font-display text-[1.6rem] font-light leading-tight text-moss md:text-[2rem]">
                  {service.name}
                </h3>
                <p className="mt-4 leading-relaxed text-ink/80">{service.summary}</p>
                <Meta service={service} />
              </li>
            ))}
          </ul>
        </Section>

        {/* ONLINE - three open columns divided by hairlines. It used to be a
            12-column heading-left / body-right list, which is the shape
            Retreats already uses: side by side the two groups read as the same
            block. Columns on bare linen also stay distinct from Schools, whose
            cards are filled panels on sand. */}
        <Section id={online.slug} className="bg-linen py-24 md:py-32">
          <SectionHead eyebrow={online.eyebrow} title={online.title} standfirst={online.intro} />
          <ul className="mt-14 grid border-y border-ink/15 md:grid-cols-3" data-reveal-stagger>
            {online.services.map((service) => (
              <li
                key={service.slug}
                className="border-b border-ink/15 py-8 last:border-b-0 md:border-b-0 md:border-l md:px-8 md:py-10 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
              >
                <h3 className="font-display text-[1.6rem] font-light leading-tight text-moss md:text-[1.85rem]">
                  {service.name}
                </h3>
                <p className="mt-4 leading-relaxed text-ink/80">{service.summary}</p>
                <Meta service={service} />
              </li>
            ))}
          </ul>
        </Section>

        {/* HOW IT WORKS - four steps, no booking widget, because there is no
            booking system on this site. */}
        <Section className="bg-linen py-24 md:py-32">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHead
                eyebrow="How it works"
                title="Four steps, and none of them is a form"
                standfirst="There is no booking system here on purpose. A class is a person teaching a person, so it starts with a conversation."
              />
              <ol className="mt-12 space-y-10" data-reveal-stagger>
                {howItWorks.map((step) => (
                  <li key={step.n} className="grid gap-2 sm:grid-cols-12 sm:gap-8">
                    <p className="label text-[0.62rem] text-moss/85 sm:col-span-2">{step.n}</p>
                    <div className="sm:col-span-10">
                      <h3 className="font-display text-[1.35rem] font-light leading-tight text-moss md:text-[1.6rem]">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-[54ch] leading-relaxed text-ink/80">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="lg:col-span-5" data-reveal>
              <img
                src="/media/gallery/raji-13.webp"
                alt="The founder arches back in a kneeling lunge with one leg extended, head tilted skyward in a grassy park."
                width={1500}
                height={2246}
                loading="lazy"
                decoding="async"
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
          </div>
        </Section>

        <CtaBand
          title="Begin where you are"
          body="Tell us which of these sounds like you, or describe the week you are having and let Raji suggest one."
          primary={{ href: "/contact", label: "Start a conversation" }}
          secondary={{ href: "/workshops", label: "See Workshops" }}
        />
      </main>

      <SiteFooter />

      <JsonLd data={[breadcrumbLd([{ name: "Mentorship", path: "/mentorship" }]), catalogueLd]} />
    </>
  );
}
