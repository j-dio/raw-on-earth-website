import type { Metadata } from "next";
import { Suspense } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import ContactForm from "@/components/ContactForm";
import { Section, SectionHead, CtaBand } from "@/components/ui";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { site } from "@/data/site";

/* Contact. The form is the page.

   Three fields, single-line, no boxes - the client's own instruction, recorded
   in docs/feedback. There is no booking system on this site and none is
   specified, so nothing here embeds a scheduler or a calendar.

   Her phone, email, WhatsApp and Instagram are NOT repeated here. The footer
   carries all four on every page, and a second copy beside the form was what
   made this page need a filler photograph to balance it.

   No photographs at all, and no masthead plate: a 21:9 image pushes the first
   input below the fold on a laptop, and the page's job is the form. */

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description:
    "Write to Rajalakshmi V about yoga, mindfulness or corporate well-being sessions in JP Nagar, Bangalore and online. A short enquiry form, and WhatsApp if it is quicker.",
  path: "/contact",
});

/* ONE array, rendered by the accordion below AND used to build the FAQPage
   schema at the foot of the file. Two copies would drift, and marking up an
   answer that is not on the page is a structured-data violation.

   Nothing here states a price, a class time, a studio address or a
   cancellation policy: the client has supplied none of those. Answers cover
   only what the brief and her own copy support. */
const faqs: { q: string; a: string }[] = [
  {
    q: "Do you teach online as well as in person?",
    a: "Both. Classes and sessions run online, and in person in and around JP Nagar, Bangalore. Say which you would prefer in your message and she will tell you what is running.",
  },
  {
    q: "I have never practised before. Is that a problem?",
    a: "Not at all. Beginners are welcome, and so is anyone coming back after a long gap. She teaches the person in front of her rather than a level, so say where you are starting from and the practice is built around that.",
  },
  {
    q: "Can you run sessions for my organisation?",
    a: "Yes. Workplace well-being is a large part of the practice: yoga, breathwork, meditation, and stress and resilience sessions for teams, online or on site. Tell her the size of the group and what you are hoping it does for them.",
  },
  {
    q: "What should I bring to a class?",
    a: "Loose clothes you can move in, water, and a mat if you own one. If you do not, mention it when you write and it will be sorted before you arrive.",
  },
];

export default function ContactPage() {
  return (
    <>
      <SiteHeader />

      <main id="main">
        {/* No standfirst. The heading says start with a message and the form is
            directly under it; a paragraph in between only delayed it. */}
        {/* No enso here: at 371px this is the shortest masthead on the site
            and a 620px circle cannot fit it without being cut by a straight
            line. See the `mark` prop in PageHero. */}
        <PageHero eyebrow="Contact" title="Start with a message" mark={false} />

        {/* Short top padding on purpose. This is the page every CTA points at, so
            the form has to be visible without a scroll: the hero rule sits at
            about y=516 on a 1280x720 laptop, and the standard py-32 put "Send an
            enquiry" on the fold line at y=644. pt-10/pt-14 lands the heading at
            about y=570 and the first field in view. */}
        <Section className="pb-24 pt-10 md:pb-32 md:pt-14">
          {/* One column, centred, and the form is all of it. It used to sit in
              seven of twelve columns beside a "reach her directly" list - phone,
              email, WhatsApp and Instagram - which is the same four things the
              footer carries on every page, plus a photograph to fill the space
              that duplication made.

              Centred rather than left-aligned: `Section` indents to 208px at
              1440 and the masthead above starts at 60px, so a left-aligned
              column here lands 148px right of the heading and reads as a
              mistake. Centred, it reads as a choice. */}
          <div className="mx-auto max-w-2xl" data-reveal>
            <h2 className="font-display text-[1.6rem] font-light leading-tight text-moss md:text-[2rem]">
              Send an enquiry
            </h2>
            {/* Suspense is not optional: ContactForm reads useSearchParams
                (the ?about= prefill) and Next 15 fails the build without a
                boundary around it. */}
            <div className="mt-10">
              <Suspense fallback={<p className="leading-relaxed text-ink/60">Loading the form…</p>}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </Section>

        {/* FAQ - native <details>, so it is keyboard and screen-reader correct
            with no JavaScript and works on the first paint.

            One column on linen, the same width as the form above it. It used to
            run beside a photograph on a sand ground: the picture was decoration
            and the extra ground was a fourth change of colour on a page that
            only needs one. */}
        <Section className="pb-24 md:pb-32">
          {/* No data-reveal here: SectionHead renders its own, and two nested
              reveals compound the offset and run two ScrollTriggers. */}
          <div className="mx-auto max-w-2xl">
            <SectionHead
              eyebrow="Before you write"
              title="Questions people ask first"
              standfirst="If your question is not here, the form is the right place for it."
            />

            <div className="mt-12 border-t border-ink/15">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-ink/15">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 font-display text-[1.3rem] leading-snug text-moss md:text-[1.5rem] [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span
                      aria-hidden
                      className="mt-2 shrink-0 text-ink/70 transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="pb-7 leading-relaxed text-ink/80">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Section>

        <CtaBand
          eyebrow="Begin your journey inward"
          title="Rather just talk?"
          body="WhatsApp reaches her directly, and is the quickest way to ask a short question or find out what is running this week."
          primary={{ href: site.whatsapp, label: "Message on WhatsApp" }}
          secondary={{ href: site.emailHref, label: "Email instead" }}
        />
      </main>

      <SiteFooter />

      <JsonLd
        data={[
          breadcrumbLd([{ name: "Contact", path: "/contact" }]),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": `${site.url}/contact`,
            url: `${site.url}/contact`,
            name: `Contact — ${site.name}`,
            inLanguage: "en-GB",
            /* Points at the LocalBusiness node the root layout already emits,
               rather than restating her phone and address a second time. */
            mainEntity: { "@id": `${site.url}#business` },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": `${site.url}/contact#faq`,
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]}
      />
    </>
  );
}
