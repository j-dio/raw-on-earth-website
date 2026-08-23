/* Workshops, classes and immersions.

   READ THIS BEFORE ADDING ANYTHING: no workshop dates, prices, venues or
   registration links have ever been supplied. She has run 35+ workshops and
   none of that detail reached us, so every entry below is a placeholder.

   The schema is complete and correct, so filling it in later is editing an
   object, not building a page. Until then the rule is: the DATA may be a
   placeholder, but what a VISITOR reads must be true. Nothing here invents a
   date, a price or a venue - `date`, `price` and `registrationUrl` are simply
   unset, and the page prints "Dates announced soon" rather than a number
   somebody would turn up for.

   Sources: design brief, "Workshops / Events" (upcoming and past, retreat
   calendar, corporate and school workshops, each with description, date,
   duration, location and registration) and the 27 July notes (this page also
   carries regular classes and one-to-one, split online / offline). */

export type WorkshopKind =
  | "regular-class"
  | "one-to-one"
  | "workshop"
  | "retreat"
  | "corporate"
  | "schools";

export type WorkshopMode = "online" | "in-person" | "both";

/* "announced" = real and running, no date fixed yet (register interest).
   "scheduled" = a date IS confirmed and `date` is set.
   "past"      = already run; listed as history, not on offer. */
export type WorkshopStatus = "announced" | "scheduled" | "past";

export type Workshop = {
  slug: string;
  title: string;
  kind: WorkshopKind;
  mode: WorkshopMode;
  summary: string;
  description: string;
  duration: string;
  location: string;
  status: WorkshopStatus;
  /* ISO date, only ever set when status is "scheduled". Do not fill this in to
     make a card look busier - the page prints exactly what is here. */
  date?: string;
  price?: string;
  /* Unset everywhere, deliberately. There is no booking system and the brief
     specifies none, so each card links to /contact?about=<slug> instead. */
  registrationUrl?: string;
};

export const kindLabels: Record<WorkshopKind, string> = {
  "regular-class": "Regular class",
  "one-to-one": "One-to-one",
  workshop: "Workshop",
  retreat: "Retreat",
  corporate: "Corporate",
  schools: "Schools",
};

export const modeLabels: Record<WorkshopMode, string> = {
  online: "Online",
  "in-person": "In person",
  both: "Online and in person",
};

/* PLACEHOLDER - awaiting client content.
   Formats she genuinely runs, per the brief and her business cards. No named
   event, no date, no fee. Every line of copy here needs her words before
   launch. */
export const workshops: Workshop[] = [
  {
    slug: "weekly-hatha-class",
    title: "Weekly Hatha class",
    kind: "regular-class",
    mode: "both",
    summary: "Classical Hatha, taught at the pace of a body that is listening.",
    description:
      "A steady weekly group class in Classical Hatha Yoga: posture held long enough to be felt, pranayama, and a proper closing rest. Small numbers, so alignment is watched rather than assumed.",
    duration: "60 minutes, weekly",
    location: "JP Nagar, Bangalore, and online",
    status: "announced",
  },
  {
    slug: "ashtanga-vinyasa-class",
    title: "Ashtanga Vinyasa class",
    kind: "regular-class",
    mode: "both",
    summary: "A breath-led sequence, for a practice with some ground under it.",
    description:
      "A moving practice built on the Ashtanga Vinyasa sequence, linked breath to breath. Suited to people who are past the first few months and want the count.",
    duration: "75 minutes, weekly",
    location: "JP Nagar, Bangalore, and online",
    status: "announced",
  },
  {
    slug: "one-to-one-yoga",
    title: "One-to-one yoga",
    kind: "one-to-one",
    mode: "both",
    summary: "A practice built around one body, one history and one week.",
    description:
      "Private sessions planned around what your body is actually doing, rather than a class average. Useful when there is an injury, a long gap, or one thing you want to build.",
    duration: "60 minutes per session",
    location: "JP Nagar, Bangalore, or online",
    status: "announced",
  },
  {
    slug: "one-to-one-breathwork",
    title: "One-to-one breathwork and meditation",
    kind: "one-to-one",
    mode: "online",
    summary: "Pranayama and meditation taught as tools, not theory.",
    description:
      "Private breathwork and meditation coaching. Technique first, then a short daily practice you can keep without rearranging your life around it.",
    duration: "45 minutes per session",
    location: "Online",
    status: "announced",
  },
  {
    slug: "day-workshop-breath-and-stillness",
    title: "Day workshop: breath and stillness",
    kind: "workshop",
    mode: "in-person",
    summary: "A full day given to breath, held posture and the quiet in between.",
    description:
      "A day-long workshop that slows everything down: extended pranayama, held posture, silence, and time to talk about what came up. Practical arrangements are confirmed with everyone who registers.",
    duration: "One day",
    location: "Bangalore",
    status: "announced",
  },
  {
    slug: "immersion-weekend",
    title: "Weekend immersion",
    kind: "workshop",
    mode: "in-person",
    summary: "Two days of practice, rest and conversation, away from a screen.",
    description:
      "An immersion for people who want more than an hour a week: morning practice, afternoon study, evening stillness. The group is kept small on purpose.",
    duration: "Two days",
    location: "Bangalore and nearby",
    status: "announced",
  },
  {
    slug: "nature-retreat",
    title: "Nature retreat",
    kind: "retreat",
    mode: "in-person",
    summary: "Practice outdoors, walking, and food that is not an afterthought.",
    description:
      "A residential retreat away from the city. Practice morning and evening, walking and rest in between, and no attempt to fill every hour. The retreat calendar is set with each venue.",
    duration: "Two to four days",
    location: "Outside Bangalore",
    status: "announced",
  },
  {
    slug: "corporate-wellbeing-programme",
    title: "Corporate well-being programme",
    kind: "corporate",
    mode: "both",
    summary: "Stress management, desk yoga and leadership mindfulness for teams under load.",
    description:
      "A programme run inside the organisation over several weeks, not a one-off talk. Desk yoga, breath for stress, emotional resilience, and mindfulness for the people who lead. Shaped around the team's hours.",
    duration: "Agreed per organisation",
    location: "At your workplace, or online",
    status: "announced",
  },
  {
    slug: "corporate-session",
    title: "Corporate single session",
    kind: "corporate",
    mode: "both",
    summary: "One session, for an offsite, a wellness day or a heavy quarter.",
    description:
      "Self-contained: movement for people who sit all day, breath practice for pressure, and something everyone can take back to a desk the same afternoon.",
    duration: "60 to 90 minutes",
    location: "At your workplace, or online",
    status: "announced",
  },
  {
    slug: "school-chanting-and-movement",
    title: "School chanting and movement",
    kind: "schools",
    mode: "in-person",
    summary: "Sound, rhythm and stillness, in a form children take to easily.",
    description:
      "Sessions for schools: chanting, simple movement and short stillness, pitched at the age group and run with the school's own staff present.",
    duration: "45 minutes per session",
    location: "At your school, Bangalore",
    status: "announced",
  },
  {
    slug: "school-teacher-wellbeing",
    title: "Teacher well-being session",
    kind: "schools",
    mode: "both",
    summary: "For the staff room, not the assembly hall.",
    description:
      "A session for teaching staff: breath and movement for long days on your feet, and practical ways to steady a class by steadying yourself first.",
    duration: "60 minutes",
    location: "At your school, or online",
    status: "announced",
  },
];

/* PLACEHOLDER - awaiting client content.
   Past work, described as formats rather than as events. She has run 35+
   workshops; not one title, date or venue reached us, and a plausible-looking
   invented event is the worst kind of lie because it is checkable. Replace
   this with her real archive when she sends it. */
export type PastFormat = { title: string; note: string };

export const pastFormats: PastFormat[] = [
  { title: "Day workshops on breath and stillness", note: "Run in Bangalore over several years" },
  { title: "Weekend immersions", note: "Small groups, practice and study" },
  { title: "Corporate well-being programmes", note: "Inside organisations, on site and online" },
  { title: "Workplace sessions and wellness days", note: "Single sessions for teams" },
  { title: "School chanting and movement sessions", note: "With children, alongside their own teachers" },
  { title: "Nature retreats", note: "Residential, outside the city" },
  // No fee stated: nobody has told us how community sessions are charged.
  { title: "Community and volunteer gatherings", note: "Open sessions, run with the community" },
];
