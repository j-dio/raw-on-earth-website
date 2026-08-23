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

/* Contact. The design brief asks for one thing here - "Form with name, email,
   phone number, Instagram. Plus the footer details above" - and that is what
   this page is. There is no booking system on this site and the brief
   specifies none, so nothing here embeds a scheduler or a calendar.

   No masthead photograph. Every other inner page opens on one, but this page's
   job is a form, and a 21:9 plate pushes the first input below the fold on a
   laptop. The two reserved photographs are used further down where their
   portrait crop is not fighting the layout. */

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description:
    "Write to Rajalakshmi V about yoga, mindfulness or corporate well-being sessions in JP Nagar, Bangalore and online. Enquiry form, phone, WhatsApp and Instagram.",
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
  {
    q: "How quickly will I hear back?",
    a: "Every enquiry is read by Rajalakshmi herself, so a reply usually takes a couple of days rather than a couple of minutes. WhatsApp reaches her faster than email if something is time-sensitive.",
  },
];

/* Her details, in the order a person actually reaches for them. The footer
   carries the same facts; this page states them in full because a contact page
   that makes you scroll to the footer for a phone number has failed. */
const details: { label: string; value: string; href?: string; external?: boolean }[] = [
  { label: "Phone", value: site.phone, href: site.phoneHref },
  { label: "WhatsApp", value: "Message on WhatsApp", href: site.whatsapp, external: true },
  { label: "Email", value: site.email, href: site.emailHref },
  { label: "Instagram", value: "@raw_on_earth", href: site.social.instagram, external: true },
  { label: "LinkedIn", value: site.founder, href: site.social.linkedin, external: true },
  { label: "Substack", value: "Raw On Earth", href: site.social.substack, external: true },
  { label: "Where", value: `${site.locality} – taught in person and online` },
];

export default function ContactPage() {
  return (
    <>
      <SiteHeader />

      <main id="main">
        <PageHero
          eyebrow="Contact"
          title="Start with a message"
          standfirst="A question, a class you are curious about, or a programme for your team. Every enquiry is read by Rajalakshmi, and a reply usually takes a couple of days."
        />

        {/* FORM + DETAILS
            Form first in the DOM, so on a phone the details fall below it
            rather than standing between the heading and the first input. The
            grid only splits them from lg up. */}
        <Section className="py-24 md:py-32">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7" data-reveal>
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

            <aside className="lg:col-span-5" data-reveal>
              <h2 className="font-display text-[1.6rem] font-light leading-tight text-moss md:text-[2rem]">
                Or reach her directly
              </h2>

              <dl className="mt-10 border-t border-ink/15">
                {details.map((d) => (
                  <div key={d.label} className="flex flex-col gap-1 border-b border-ink/15 py-5 sm:flex-row sm:gap-6">
                    <dt className="label w-32 shrink-0 text-[0.68rem] text-moss">{d.label}</dt>
                    <dd className="leading-relaxed text-ink/80">
                      {d.href ? (
                        <a
                          href={d.href}
                          {...(d.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                          className="underline decoration-ink/25 underline-offset-4 transition-colors duration-300 hover:decoration-moss"
                        >
                          {d.value}
                        </a>
                      ) : (
                        d.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              <img
                src="/media/thumb/raji-24.webp"
                width={760}
                height={1138}
                loading="lazy"
                decoding="async"
                alt="The founder sits in meditation with palms joined at her chest, eyes closed, on a mat in soft evening park light."
                className="mt-12 aspect-[4/5] w-full object-cover"
              />
            </aside>
          </div>
        </Section>

        {/* FAQ - native <details>, so it is keyboard and screen-reader correct
            with no JavaScript and works on the first paint. */}
        <section className="tex tex-stone bg-sand/45">
          <Section as="div" className="py-24 md:py-32">
            <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
              <div className="lg:col-span-5" data-reveal>
                <img
                  src="/media/thumb/raji-14.webp"
                  width={760}
                  height={1138}
                  loading="lazy"
                  decoding="async"
                  alt="The founder folds forward into child's pose on a mat in a grassy park, hair falling to the ground."
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>

              <div className="lg:col-span-7">
                <SectionHead
                  eyebrow="Before you write"
                  title="Questions people ask first"
                  standfirst="If your question is not here, the form is the right place for it."
                />

                <div className="mt-12 border-t border-ink/15">
                  {faqs.map((f) => (
                    <details key={f.q} className="group border-b border-ink/15">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 font-display text-[1.3rem] leading-snug text-moss md:text-[1.5rem]">
                        {f.q}
                        <span
                          aria-hidden
                          className="mt-2 shrink-0 text-ink/45 transition-transform duration-300 group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <p className="max-w-[58ch] pb-7 leading-relaxed text-ink/80">{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        </section>

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
