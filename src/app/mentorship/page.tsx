import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { Section, SectionHead, LeafRule, Button, CtaBand } from "@/components/ui";
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

/* Three ways in. Each card owns the anchors it covers, so all five groups are
   reachable from one screen. */
const waysIn = [
  {
    n: "01",
    title: "For yourself",
    body: "One-to-one teaching, or a small group that keeps its own rhythm. Start where your body is today.",
    links: [individual, online],
  },
  {
    n: "02",
    title: "For your team",
    body: "Programmes for people under load, run on site in your own rooms or online for a team working apart.",
    links: [corporate],
  },
  {
    n: "03",
    title: "For a group you gather",
    body: "A school, a studio, a circle of friends. Time away, or a practice brought into a room you already have.",
    links: [retreats, schools],
  },
];

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

export default function MentorshipPage() {
  return (
    <>
      <SiteHeader />

      <main id="main">
        <PageHero
          eyebrow="Mentorship"
          title="Ways to practise"
          standfirst="Individual teaching, workplace programmes, retreats, schools and online courses. The same practice, sized to whoever is in the room."
          figure={{
            src: "/media/hero/services.webp",
            alt: "A row of students hold crow pose on coloured mats in a bright studio with floor-to-ceiling windows and potted palms, the instructor demonstrating at the front.",
            width: 2400,
            height: 1028,
          }}
        />

        {/* THREE WAYS IN - a quieter interstitial, and the page's index. */}
        <Section className="bg-linen py-16 md:py-20">
          <ul className="grid gap-px bg-ink/15 md:grid-cols-3" data-reveal-stagger>
            {waysIn.map((way) => (
              <li key={way.n} className="bg-linen p-8 md:p-10">
                <p className="label text-[0.62rem] text-moss/85">{way.n}</p>
                <h2 className="mt-5 font-display text-[1.6rem] font-light leading-tight text-moss md:text-[2rem]">
                  {way.title}
                </h2>
                <p className="mt-4 leading-relaxed text-ink/80">{way.body}</p>
                {/* The page index, so these are real targets: inline-flex with
                    a 44px minimum height rather than a 10px line of caps with
                    a hit area you have to aim at. */}
                <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {way.links.map((group) => (
                    <a
                      key={group.slug}
                      href={`#${group.slug}`}
                      className="link label inline-flex min-h-11 items-center text-[0.68rem]"
                    >
                      {group.title}
                    </a>
                  ))}
                </p>
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
                src="/media/gallery/teaching-08.webp"
                alt="A teacher spots a laughing student attempting crow pose on a black mat inside a thatched pavilion."
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
