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
      "One-to-one teaching, built around what your own practice needs. Taught online or in person, at a time arranged with you.",
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
      "Programmes for teams at work, run for organisations across technology, finance, retail and education. Held on site in your own rooms, or online for people working apart.",
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
      "A retreat arranged for a group that already exists: a team, a studio, a family, a circle of friends. Or sessions for children and the adults who teach them, taught in the space your school already has.",
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
    /* Client-supplied 2026-09-18. A full-height 3:4 of the 6000x4000 source
       could not escape the school roof, which took the top 60% and pushed the
       class into the bottom edge, so this is a 2250x3000 window from the foot
       of the frame, centred on the teacher. */
    src: "/media/gallery/kids-41.webp",
    alt: "A teacher rests a hand on a pupil's back to guide a standing forward fold, a row of children bending beside him outside a tiled school building.",
  },
  "online-programmes": {
    src: "/media/gallery/raji-13.webp",
    alt: "The founder arches back in a kneeling lunge with one leg extended, head tilted skyward in a grassy park.",
  },
};

/* One image per service — chosen for contextual fit, not just availability.
   Each caption below records WHY this image was chosen for that service. */
/* `aspect` and `position` are per-image escape hatches, and both are earned.
   A 3:4 portrait slot suits a photograph of a person; it does not suit every
   photograph. Write the class LITERALLY here - Tailwind scans this file, so a
   value assembled at runtime would never be generated. */
const SERVICE_IMAGES: Record<
  string,
  { src: string; alt: string; aspect?: string; position?: string }
> = {
  /* Private Yoga — changed 2026-09-18. The previous frame was shot in a
     public park, under a tree, with the pair small in a wide landscape. A
     service called Private Yoga should not be illustrated in public. This is
     indoors and the one-to-one assist is the subject. */
  "private-yoga":
    { src: "/media/gallery/teaching-04.webp", alt: "A teacher assists a student into a supported bow pose on a purple mat inside a wooden, thatch-roofed pavilion." },

  /* Mindfulness Coaching — takes the frame that used to sit on Breathwork.
     raji-17 and raji-24 were the same woman in the same pose in the same
     park, one slot apart, which read as the page repeating itself. */
  "mindfulness-coaching":
    { src: "/media/gallery/raji-24.webp", alt: "The founder sits in meditation with palms joined at her chest, eyes closed, in soft evening park light." },

  /* Breathwork — changed 2026-09-18, after its frame moved up to Mindfulness
     Coaching. Client-supplied 2026-09-18. Hands open on the knees is the
     pranayama seat rather than the palms-together one, she is caught
     mid-breath, and the setting is not the park - so this section and
     Mindfulness Coaching no longer look like one photograph printed twice.

     The source is square. A 3:4 window trims the outer hands, which is
     worth it: keeping the whole square shrinks her by a third at this
     column width and the breath stops being legible. */
  "breathwork":
    { src: "/media/gallery/meditation-10.webp", alt: "A woman sits cross-legged with her eyes closed and her hands resting open on her knees, mid-breath, two others practising behind her in a quiet indoor hall." },

  /* Lifestyle Coaching — study and reflection between sessions */
  "lifestyle-coaching":
    { src: "/media/gallery/meditation-01.webp", alt: "Crossed bare feet rest beneath an open yoga anatomy book, lit by a warm shaft of afternoon sun." },

  /* Group Yoga — full group class, teacher leading everyone */
  "group-yoga":
    { src: "/media/gallery/teaching-07.webp", alt: "A teacher leads a standing group class with palms pressed together, students lined up on mats inside a long thatched hall." },

  /* Stress Management — group sitting together, collective calm */
  /* Same photograph, framed 2026-09-18. It is 1500x846, so a 3:4 slot shows
     only 42% of its width and a centred crop cut the seated woman in half and
     filled the rest with empty floor. 79% puts her and the pair behind her in
     the frame. Change the file, not this number, if it needs more room. */
  "stress-management":
    { src: "/media/gallery/meditation-05.webp", position: "object-[79%_center]", alt: "A woman sits cross-legged on a pink mat with her eyes closed, other participants meditating on mats behind her." },

  /* Desk Yoga — forward fold, stretching the body that sits all day */
  /* Client-supplied 2026-09-18, an online session. A 2x3 video grid is the one
     picture on this page that a 3:4 slot destroys: the tiles sit in a 1049x885
     box, so a portrait crop cuts a face off BOTH columns. It keeps its own 6:5
     and the dark surround is cropped away rather than shipped. */
  "desk-yoga":
    { src: "/media/gallery/corporate-01.webp", aspect: "aspect-[6/5]", alt: "Six people on a video call, each with their palms pressed together at the chest at the end of an online session." },

  /* Leadership Mindfulness — commanding stillness, professional portrait */
  "leadership-mindfulness":
    { src: "/media/gallery/raji-08.webp", alt: "The founder sits cross-legged with hands in prayer position, eyes closed, backlit by golden-hour light in a park." },

  /* Emotional Resilience — a moment of ritual connection and shared feeling */
  "emotional-resilience":
    { src: "/media/gallery/community-10.webp", alt: "A monk in maroon robes shares a blessing ritual with a man and a woman over a small bowl." },

  /* Counselling — changed 2026-09-18. It ran the same photograph as
     Immersion Retreat, a posed group beside a Buddha statue, which showed
     neither a conversation nor one person. This is the only frame in the
     library of one teacher working with one adult.

     Cropped from the clip-04 video poster into its own still: the poster is
     1080x1920, so the 3:4 slot left both figures small under a wide band of
     roof and floor. A separate file because /media/video/clip-04.webp is the
     poster for a clip that still plays elsewhere. */
  "counselling":
    { src: "/media/gallery/teaching-10.webp", alt: "A teacher explains a posture with her hands to a single student standing on a mat in an open brick hall." },

  /* Weekend Retreat — community gathered together in shared practice */
  "weekend-retreat":
    { src: "/media/gallery/community-03.webp", alt: "A close gathering of practitioners seated together outdoors in shared practice and reflection." },

  /* Immersion Retreat — recropped 2026-09-18.

     community-06 is 1500x2666, so a 3:4 slot cut 666px off it and the
     centred window it left was about half bare floor, with a mobile phone
     lying in the middle of it. This is a 880x1173 window on the four
     figures instead. The Buddha statue is outside it, so the alt text no
     longer claims it.

     A separate file rather than a recrop in place: community-06.webp is
     also a gallery entry and a thumbnail on /community. */
  "immersion-retreat":
    { src: "/media/gallery/community-06-tight.webp", alt: "Two Buddhist monks in maroon robes stand beside two guests in a bright, minimal room." },

  /* Bespoke Retreat — a large crowd gathered, collective energy */
  "bespoke-retreat":
    { src: "/media/gallery/community-02.webp", alt: "A large crowd of yoga practitioners raises their arms and cheers outdoors under trees." },

  /* Yoga in the Classroom — community blessing, bringing people together */
  /* Client-supplied 2026-09-18, replacing a monk's blessing ritual that had
     nothing to do with a classroom. */
  "yoga-in-the-classroom":
    { src: "/media/gallery/kids-40.webp", alt: "A teacher stands with her arms open in front of rows of schoolchildren in white shirts, each standing on a coloured mat in an outdoor court." },

  /* Chanting for Children — community gathering outdoors, collective sound */
  /* Client-supplied 2026-09-18. Already exactly 3:4, so it is uncropped. */
  "chanting-for-children":
    { src: "/media/gallery/kids-42.webp", alt: "A teacher kneels to guide a small boy's palms into a prayer position while a line of children practise behind him." },

  /* Teacher and Staff Sessions — community of educators gathered together */
  /* Client-supplied 2026-09-18. Cropped left of centre off the foreground
     foot, which owned the frame on a centred crop. */
  "teacher-and-staff-sessions":
    { src: "/media/gallery/teaching-09.webp", alt: "An adult class in a seated forward fold, hands clasped around one foot, on mats in a bright indoor hall." },

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
          {/* Second scrim, for the header band only. Added 2026-09-18.

              The gradient above runs bottom-up and reaches `transparent` at the
              TOP, which is precisely where the fixed header sits. The 50% photo
              over ink left that strip mid-tone, so the header's light type
              measured 3.15-3.96:1 on for-your-team and for-a-group - both under
              the 4.5 small text needs, and it is a different number on every
              route because it depends on the photograph.

              160px covers the 96px unscrolled bar with room to fall off before
              the breadcrumb. Re-measure with scripts/shot.mjs if the bar height
              or these photographs change. */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/80 via-ink/40 to-transparent" />
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
                                    className={`w-full object-cover rounded-xl ${svcImg.aspect ?? "aspect-[3/4]"} ${svcImg.position ?? ""}`}
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
          /* There is no booking system on this site and none is specified,
             so this says how it actually starts. Kept from main. */
          body="There is no booking system here. Write, or send a message on WhatsApp, and she will answer you directly."
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
