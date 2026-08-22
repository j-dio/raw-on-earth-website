/* Home page content. Client copy is stored verbatim where she supplied it and is
   marked `// verbatim`. Everything unmarked is placeholder written to hold the
   layout and MUST be replaced with RJ's own words before launch. */

export type Pillar = {
  slug: string;
  name: string;
  line: string;
};

/* The five practices the brief asks the hero to name. */
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

/* The six Offerings tabs named in the content PDF. */
export const offerings: Offering[] = [
  { n: "01", title: "Holistic Health", body: "Whole-person practice: movement, breath, rest and the habits that carry them.", href: "/services" },
  { n: "02", title: "Private & Group Class", body: "One-to-one attention, or a small group that keeps its own rhythm. Online and in person.", href: "/services" },
  { n: "03", title: "Events & Workshops", body: "Immersions, retreats and day workshops. 35+ run so far, in India and online.", href: "/workshops" },
  { n: "04", title: "Mindfulness & Breathwork", body: "Pranayama and meditation taught as tools, not theory. Something you can use on a Tuesday.", href: "/services" },
  { n: "05", title: "Corporate Well-being", body: "Programmes for teams under load. Desk yoga, resilience, leadership mindfulness.", href: "/services" },
  { n: "06", title: "Counselling", body: "A held conversation, where the practice needs support that a class cannot give.", href: "/contact" },
];

export type Stat = { value: string; label: string };

/* From her credentials in the brief. */
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
