import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Section, SectionHead, LeafRule, Button, CtaBand } from "@/components/ui";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { site } from "@/data/site";
import { serviceGroups, type Service } from "@/data/services";
import JsonLd from "@/components/JsonLd";

/* Mentorship sub-page — organised content sections, not clickable cards.
   Each service is listed under its group exactly as in the original
   mentorship page (hairline-bordered list with name, summary, meta).

   Created 2026-09-17, revised same day: reverted clickable-card / modal
   pattern back to the editorial list the client approved for readability. */

/* Audience configuration — mirrors the index page cards */
const AUDIENCE_CONFIG: Record<
  string,
  {
    title: string;
    eyebrow: string;
    intro: string;
    groupSlugs: string[];
    heroImg: { src: string; alt: string };
  }
> = {
  "for-yourself": {
    title: "For yourself",
    eyebrow: "Individual & Online",
    intro:
      "Work that starts with one body and one set of habits. Taught online or in person, at whatever hour fits the life you actually have.",
    groupSlugs: ["individual", "online-programmes"],
    heroImg: {
      src: "/media/gallery/raji-11.webp",
      alt: "The founder folds into a standing side stretch with her eyes closed, lit from behind in a park at dusk.",
    },
  },
  "for-your-team": {
    title: "For your team",
    eyebrow: "Corporate",
    intro:
      "Programmes for teams under load, run for organisations across technology, finance, retail and education. Held on site in your own rooms, or online for people working apart.",
    groupSlugs: ["corporate"],
    heroImg: {
      src: "/media/gallery/teaching-07.webp",
      alt: "A teacher leads a standing group class with palms pressed together, students lined up on mats inside a long thatched hall.",
    },
  },
  "for-a-group": {
    title: "For a group you gather",
    eyebrow: "Retreats & Schools",
    intro:
      "A school, a studio, a circle of friends. Time away, or a practice brought into a room you already have.",
    groupSlugs: ["retreats", "schools"],
    heroImg: {
      src: "/media/gallery/kids-14.webp",
      alt: "Rows of schoolchildren in white shirts stand at attention on coloured mats arranged in a wide outdoor courtyard.",
    },
  },
};

/* Format / who-it-suits meta line — same logic as original page */
function Meta({ service }: { service: Service }) {
  const format = [service.format, service.duration].filter(Boolean).join("  ·  ");
  if (!format && !service.for) return null;
  return (
    <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-ink/70">
      {format ? <span className="label text-[0.62rem]">{format}</span> : null}
      {service.for ? <span className="text-[0.85rem] leading-snug">{service.for}</span> : null}
    </p>
  );
}

/* Representative image for each group's portrait column */
const GROUP_IMAGES: Record<string, { src: string; alt: string }> = {
  individual: {
    src: "/media/gallery/raji-11.webp",
    alt: "The founder folds into a standing side stretch with her eyes closed, lit from behind in a park at dusk.",
  },
  corporate: {
    src: "/media/gallery/teaching-01.webp",
    alt: "A teacher leads a seated meditation group, gesturing with her hands as four students sit cross-legged behind her in a studio.",
  },
  retreats: {
    src: "/media/gallery/teaching-08.webp",
    alt: "A teacher spots a laughing student attempting crow pose on a black mat inside a thatched pavilion.",
  },
  schools: {
    src: "/media/gallery/kids-15.webp",
    alt: "Rows of children practise a standing pose together on colourful mats in a courtyard guided by an instructor.",
  },
  "online-programmes": {
    src: "/media/gallery/raji-13.webp",
    alt: "The founder arches back in a kneeling lunge with one leg extended, head tilted skyward in a grassy park.",
  },
};

/* One image per service — chosen for contextual fit, not just availability.
   Each caption below records WHY this image was chosen for that service. */
const SERVICE_IMAGES: Record<string, { src: string; alt: string }> = {
  /* Private Yoga — one-to-one teaching, close adjustment */
  "private-yoga":
    { src: "/media/gallery/teaching-02.webp", alt: "A teacher adjusts a student's hips during a wheel pose on a mat — one-to-one instruction." },

  /* Mindfulness Coaching — seated, eyes closed, paying attention */
  "mindfulness-coaching":
    { src: "/media/gallery/raji-17.webp", alt: "The founder sits cross-legged in a meditative pose with palms pressed together, eyes closed on a park lawn." },

  /* Breathwork — pranayama, palms joined at chest, breath focus */
  "breathwork":
    { src: "/media/gallery/raji-24.webp", alt: "The founder sits in meditation with palms joined at her chest, eyes closed, in soft evening park light." },

  /* Lifestyle Coaching — study and reflection between sessions */
  "lifestyle-coaching":
    { src: "/media/gallery/meditation-01.webp", alt: "Crossed bare feet rest beneath an open yoga anatomy book, lit by a warm shaft of afternoon sun." },

  /* Group Yoga — full group class, teacher leading everyone */
  "group-yoga":
    { src: "/media/gallery/teaching-07.webp", alt: "A teacher leads a standing group class with palms pressed together, students lined up on mats inside a long thatched hall." },

  /* Stress Management — group sitting together, collective calm */
  "stress-management":
    { src: "/media/gallery/meditation-05.webp", alt: "A woman in a pink t-shirt sits in lotus position on a pink mat with other participants meditating behind her." },

  /* Desk Yoga — forward fold, stretching the body that sits all day */
  "desk-yoga":
    { src: "/media/gallery/raji-16.webp", alt: "The founder folds into a standing forward bend with one hand resting on her lower back, framed by tall park trees." },

  /* Leadership Mindfulness — commanding stillness, professional portrait */
  "leadership-mindfulness":
    { src: "/media/gallery/raji-08.webp", alt: "The founder sits cross-legged with hands in prayer position, eyes closed, backlit by golden-hour light in a park." },

  /* Emotional Resilience — a moment of ritual connection and shared feeling */
  "emotional-resilience":
    { src: "/media/gallery/community-10.webp", alt: "A monk in maroon robes shares a blessing ritual with a man and a woman over a small bowl." },

  /* Counselling — intimate setting, monks and guests in quiet conversation */
  "counselling":
    { src: "/media/gallery/community-06.webp", alt: "Two Buddhist monks in maroon robes stand with two guests beside a golden Buddha statue in a bright, minimal room." },

  /* Weekend Retreat — community gathered together in shared practice */
  "weekend-retreat":
    { src: "/media/gallery/community-03.webp", alt: "A close gathering of practitioners seated together outdoors in shared practice and reflection." },

  /* Immersion Retreat — intimate group in a moment of ritual and connection */
  "immersion-retreat":
    { src: "/media/gallery/community-06.webp", alt: "Two Buddhist monks in maroon robes stand with two guests beside a golden Buddha statue in a bright, minimal room." },

  /* Bespoke Retreat — a large crowd gathered, collective energy */
  "bespoke-retreat":
    { src: "/media/gallery/community-02.webp", alt: "A large crowd of yoga practitioners raises their arms and cheers outdoors under trees." },

  /* Yoga in the Classroom — community blessing, bringing people together */
  "yoga-in-the-classroom":
    { src: "/media/gallery/community-10.webp", alt: "A monk in maroon robes shares a blessing ritual with a man and a woman over a small bowl." },

  /* Chanting for Children — community gathering outdoors, collective sound */
  "chanting-for-children":
    { src: "/media/gallery/community-02.webp", alt: "A large crowd of practitioners cheers together outdoors under trees, arms raised in collective celebration." },

  /* Teacher and Staff Sessions — community of educators gathered together */
  "teacher-and-staff-sessions":
    { src: "/media/gallery/community-03.webp", alt: "A close gathering of practitioners seated together outdoors in shared practice and reflection." },

  /* Live Online Classes — teacher actively leading, class in session */
  "live-online-classes":
    { src: "/media/gallery/teaching-01.webp", alt: "A teacher leads a seated meditation group, gesturing with her hands as four students sit cross-legged behind her in a studio." },

  /* Guided Course — sustained individual practice, study between sessions */
  "guided-course":
    { src: "/media/gallery/raji-03.webp", alt: "The founder holds boat pose on a mat scattered with dry leaves in a sun-dappled woodland clearing." },

  /* One-to-One Online — quiet, introspective, private moment */
  "one-to-one-online":
    { src: "/media/gallery/raji-09.webp", alt: "The founder meditates in lotus position, hands folded at her chest, seen from the side in warm evening light." },
};

/* Generate static params so Next.js pre-renders these routes */
export function generateStaticParams() {
  return Object.keys(AUDIENCE_CONFIG).map((slug) => ({ category: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const config = AUDIENCE_CONFIG[category];
  if (!config) return {};
  return pageMeta({
    title: `Mentorship – ${config.title}`,
    description: config.intro,
    path: `/mentorship/${category}`,
  });
}

export default async function MentorshipCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const config = AUDIENCE_CONFIG[category];

  if (!config) {
    return (
      <>
        <SiteHeader />
        <main id="main" className="flex min-h-[60vh] items-center justify-center">
          <p className="text-ink/60">Page not found.</p>
        </main>
        <SiteFooter />
      </>
    );
  }

  const matchedGroups = serviceGroups.filter((g) => config.groupSlugs.includes(g.slug));

  return (
    <>
      <SiteHeader />

      <main id="main">

        {/* MINI HERO */}
        <div className="relative flex min-h-[380px] items-end overflow-hidden bg-ink md:min-h-[440px]">
          <img
            src={config.heroImg.src}
            alt={config.heroImg.alt}
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent" />
          <div className="relative mx-auto w-full max-w-[1280px] px-6 pb-16 md:px-10 lg:px-20 xl:px-32">
            {/* Breadcrumb */}
            <nav
              className="mb-5 flex items-center gap-2 label text-[0.62rem] text-linen/45"
              aria-label="Breadcrumb"
            >
              <Link href="/mentorship" className="transition-colors hover:text-linen/80">
                Mentorship
              </Link>
              <span aria-hidden>›</span>
              <span className="text-linen/70">{config.title}</span>
            </nav>
            <p className="label text-[0.62rem] tracking-widest text-gold/80 uppercase">
              {config.eyebrow}
            </p>
            <h1 className="mt-3 font-display text-[2.8rem] font-light leading-tight text-linen md:text-[3.6rem]">
              {config.title}
            </h1>
            <p className="mt-5 max-w-[52ch] leading-relaxed text-linen/70">{config.intro}</p>
          </div>
        </div>

        {/* SERVICE GROUP SECTIONS */}
        <div className="bg-linen divide-y divide-ink/10">
          {matchedGroups.map((group, groupIndex) => {
            const img = GROUP_IMAGES[group.slug];
            const isEven = groupIndex % 2 === 0;

            return (
              <Section key={group.slug} id={group.slug} className="py-24 md:py-32">
                <div className="grid gap-14 lg:grid-cols-12 lg:gap-16 lg:items-start">

                  {/* Sticky portrait image */}
                  <div
                    className={`lg:col-span-4 ${isEven ? "lg:order-1" : "lg:order-2"}`}
                    data-reveal
                  >
                    {img && (
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[3/4] w-full object-cover rounded-2xl lg:sticky lg:top-28 lg:max-h-[calc(100svh-9rem)]"
                      />
                    )}
                  </div>

                  {/* Text content */}
                  <div className={`lg:col-span-8 ${isEven ? "lg:order-2" : "lg:order-1"}`}>

                    {/* Section head — only when there is more than one group */}
                    {matchedGroups.length > 1 && (
                      <SectionHead
                        eyebrow={group.eyebrow}
                        title={group.title}
                        standfirst={group.intro}
                        className="mb-10"
                      />
                    )}

                    {/* Service list — hairline-bordered, images alternate left/right */}
                    <ul className="border-t border-ink/15" data-reveal-stagger>
                      {group.services.map((service, svcIndex) => {
                        const svcImg = SERVICE_IMAGES[service.slug];
                        const imgOnRight = svcIndex % 2 === 0;
                        return (
                          <li key={service.slug} className="border-b border-ink/15 py-8">
                            <div className={`flex items-start gap-6 ${imgOnRight ? "flex-row" : "flex-row-reverse"}`}>
                              {/* Text block */}
                              <div className="flex-1 min-w-0">
                                <h3 className="font-display text-[1.6rem] font-light leading-tight text-moss md:text-[2rem]">
                                  {service.name}
                                </h3>
                                <p className="mt-3 max-w-[54ch] leading-relaxed text-ink/80">
                                  {service.summary}
                                </p>

                                {/* Includes chips (Retreats) */}
                                {service.includes && (
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
                                )}

                                <Meta service={service} />
                              </div>

                              {/* Inline service image — alternates left/right */}
                              {svcImg && (
                                <div className="hidden sm:block shrink-0 w-32 md:w-40 lg:w-48">
                                  <img
                                    src={svcImg.src}
                                    alt={svcImg.alt}
                                    loading="lazy"
                                    decoding="async"
                                    className="aspect-[3/4] w-full object-cover rounded-xl"
                                  />
                                </div>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>

                    {/* Corporate CTA */}
                    {group.slug === "corporate" && (
                      <div
                        className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
                        data-reveal
                      >
                        <Button href="/contact" variant="solid">
                          Discuss a programme
                        </Button>
                        <Button href={site.whatsapp} variant="ghost" external>
                          Message on WhatsApp
                        </Button>
                      </div>
                    )}

                    {/* Retreats note */}
                    {group.slug === "retreats" && (
                      <p className="mt-10 max-w-[58ch] leading-relaxed text-ink/80" data-reveal>
                        Dates are announced as they are set. Past and upcoming immersions live on
                        the{" "}
                        <Link href="/workshops" className="link">
                          Workshops page
                        </Link>
                        .
                      </p>
                    )}

                    {/* Leaf rule between groups */}
                    {matchedGroups.length > 1 && groupIndex < matchedGroups.length - 1 && (
                      <LeafRule className="mt-16 max-w-[240px]" />
                    )}
                  </div>
                </div>
              </Section>
            );
          })}
        </div>

        <CtaBand
          title="Begin where you are"
          body="Tell us which of these sounds like you, or describe the week you are having and let Raji suggest one."
          primary={{ href: "/contact", label: "Start a conversation" }}
          secondary={{ href: "/workshops", label: "See Workshops" }}
        />
      </main>

      <SiteFooter />

      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Mentorship", path: "/mentorship" },
            { name: config.title, path: `/mentorship/${category}` },
          ]),
        ]}
      />
    </>
  );
}
