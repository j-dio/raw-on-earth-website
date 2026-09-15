/* Home page content. Client copy is stored verbatim where she supplied it and is
   marked `// verbatim`. Everything unmarked is placeholder written to hold the
   layout and MUST be replaced with RJ's own words before launch. */

export type Pillar = {
  slug: string;
  name: string;
  line: string;
};

/* The five practices the brief's Home paragraph asks the page to name. Home
   renders `name` only, inside the Offerings block.

   `line` IS NOT RENDERED and has not been since 2026-09-15. Those five sentences
   were written by us to hold a layout, never by her, and they were sitting on
   the landing page reading as her words. Kept because the field is typed and a
   future page may want it - but if she ever supplies her own, replace them
   before rendering, do not ship these. */
export const pillars: Pillar[] = [
  { slug: "yoga", name: "Yoga", line: "Classical Hatha and Ashtanga Vinyasa, taught at the pace of a body that is listening." },
  { slug: "mindfulness", name: "Mindfulness", line: "Attention as a practised skill. Breathwork, meditation and the long quiet in between." },
  { slug: "corporate-wellbeing", name: "Corporate Well-being", line: "Stress management, desk yoga and leadership mindfulness for organisations that work hard." },
  { slug: "conscious-living", name: "Conscious Living", line: "Slow, deliberate habits that hold once the mat is rolled away." },
  { slug: "chanting-for-kids", name: "Chanting for Kids", line: "Sound, rhythm and stillness, offered to children in a form they take to easily." },
];

export type Offering = {
  n: string;
  title: string;
  body: string;
  href: string;
};

/* The six Offerings tabs the 27 July notes list under "Page 1-4".

   Each href carries a section anchor on /mentorship (renamed from /services on
   2026-09-06), so a card lands on the part it names rather than at the top of a
   long page. The anchors are the `slug` values in src/data/services.ts, which is
   what that page renders its section `id`s from. */
export const offerings: Offering[] = [
  { n: "01", title: "Holistic Health", body: "Whole-person practice: movement, breath, rest and the habits that carry them.", href: "/mentorship#individual" },
  { n: "02", title: "Private & Group Class", body: "One-to-one attention, or a small group that keeps its own rhythm. Online and in person.", href: "/mentorship#individual" },
  { n: "03", title: "Events & Workshops", body: "Immersions, retreats and day workshops. 35+ run so far, in India and online.", href: "/workshops" },
  { n: "04", title: "Mindfulness & Breathwork", body: "Pranayama and meditation taught as tools, not theory. Something you can use on a Tuesday.", href: "/mentorship#individual" },
  { n: "05", title: "Corporate Well-being", body: "Programmes for teams under load. Desk yoga, resilience, leadership mindfulness.", href: "/mentorship#corporate" },
  { n: "06", title: "Counselling", body: "A held conversation, where the practice needs support that a class cannot give.", href: "/mentorship#corporate" },
];

export type Stat = { value: string; label: string };

/* From her credentials in the brief. NOT RENDERED ANYWHERE as of 2026-09-15:
   the landing page used to carry these as a four-figure band and the project
   owner cut it, because About's Journey list already says the same numbers and
   saying them twice on one site is what "too much" looks like. Kept typed so
   nobody retypes them off a PDF. */
/* Not rendered on Home any more (2026-08-23). The design brief files these
   figures under About -> Journey, and the 27 July notes put testimonials under
   "Tab 2 - Second Page: About". Kept here, typed and ready, for when that page
   is built - deleting them would only mean retyping them from the PDFs. */
export const stats: Stat[] = [
  { value: "13+", label: "Years of practice" },
  { value: "5,000+", label: "Participants taught" },
  { value: "35+", label: "Workshops led" },
  { value: "2", label: "Lineages: Rishikesh & Dharamshala" },
];

export type Testimonial = { quote: string; name: string; context: string };

/* PLACEHOLDER. Real testimonials are on the outstanding "RJ to share" list. */
export const testimonials: Testimonial[] = [
  { quote: "Placeholder testimonial. Awaiting the real quotes from the client.", name: "Online student", context: "Weekly online class" },
  { quote: "Placeholder testimonial. Awaiting the real quotes from the client.", name: "Corporate participant", context: "Workplace programme" },
  { quote: "Placeholder testimonial. Awaiting the real quotes from the client.", name: "Offline student", context: "Bangalore, in person" },
];
