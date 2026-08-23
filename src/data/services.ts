/* Services. One typed array; adding a service is adding an object, never a new
   hand-built block. The design brief says so in as many words: "More will be
   added over time, so this must be data-driven, not hand-built pages."

   PROVENANCE - read this before editing:

   - The five Individual names (Private Yoga, Mindfulness Coaching, Breathwork,
     Lifestyle Coaching, Group Yoga) and the five Corporate names (Stress
     Management, Desk Yoga, Leadership Mindfulness, Emotional Resilience,
     Counselling) are the CLIENT'S OWN LIST, taken verbatim from the design
     brief.
   - The brief names Retreats, Schools and Online Programs as sections but
     lists no services inside them. Every entry in those three groups is OURS,
     written to hold the page, and each is marked
     `// OURS - awaiting client confirmation`. She may rename, merge or drop
     any of them.
   - Every `summary` is ours. No description copy exists in either client
     document.
   - `format` values come only from the 27 July notes ("Classes - online and
     offline"). Nothing else about delivery is stated anywhere.
   - `duration` is deliberately unused. Nobody has stated a session length, a
     retreat length, a class size, a price, a date or a location, so none
     appears here. The field is on the type for when she supplies them. */

export type Service = {
  slug: string;
  name: string;
  summary: string;
  /** How it is delivered. Only ever what the 27 July notes actually say. */
  format?: string;
  /** Session or programme length. Unset everywhere until the client states one. */
  duration?: string;
  /** Who it suits. Short phrase, sentence case. */
  for?: string;
  /** What a session or stay contains. Only where it is honestly known. */
  includes?: string[];
};

export type ServiceGroup = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  services: Service[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    slug: "individual",
    title: "Individual",
    eyebrow: "For yourself",
    intro:
      "Work that starts with one body and one set of habits. Taught online or in person, at whatever hour fits the life you actually have.",
    services: [
      {
        // CLIENT'S NAMED LIST - design brief
        slug: "private-yoga",
        name: "Private Yoga",
        summary:
          "One-to-one classical Hatha or Ashtanga Vinyasa, built around the body you have today. Useful if you are starting out, returning after an injury, or want your practice looked at closely.",
        format: "Online and in person",
        for: "Beginners, returners and long-time practitioners",
      },
      {
        // CLIENT'S NAMED LIST - design brief
        slug: "mindfulness-coaching",
        name: "Mindfulness Coaching",
        summary:
          "A guided practice of paying attention, session by session. You learn to notice thought and habit as they happen, and to work with them rather than argue with them.",
        format: "Online and in person",
        for: "Anyone whose mind runs faster than their day",
      },
      {
        // CLIENT'S NAMED LIST - design brief
        slug: "breathwork",
        name: "Breathwork",
        summary:
          "Pranayama taught as something you can use on an ordinary Tuesday. A small set of breathing practices for steadying sleep, nerves and attention, and when to reach for each one.",
        format: "Online and in person",
        for: "Poor sleep, high stress, scattered attention",
      },
      {
        // CLIENT'S NAMED LIST - design brief
        slug: "lifestyle-coaching",
        name: "Lifestyle Coaching",
        summary:
          "We look at how you sleep, eat, move and rest, then change one thing at a time. Slow, deliberate habits that hold once the mat is rolled away.",
        format: "Online and in person",
        for: "People who want the practice to reach the rest of the week",
      },
      {
        // CLIENT'S NAMED LIST - design brief
        slug: "group-yoga",
        name: "Group Yoga",
        summary:
          "A small group that keeps its own rhythm, with room enough for the teacher to see every mat. Good if you practise better in company and want a steady weekly place to do it.",
        format: "Online and in person",
        for: "People who practise better alongside others",
      },
    ],
  },

  {
    slug: "corporate",
    title: "Corporate",
    eyebrow: "For your team",
    intro:
      "Programmes for teams under load, run for organisations across technology, finance, retail and education. Held on site in your own rooms, or online for people working apart.",
    services: [
      {
        // CLIENT'S NAMED LIST - design brief
        slug: "stress-management",
        name: "Stress Management",
        summary:
          "A practical session for a team carrying too much. Your people learn what stress does to breath, sleep and attention, and take away practices short enough to use between meetings.",
        format: "On site or online",
        for: "Teams in a heavy quarter",
      },
      {
        // CLIENT'S NAMED LIST - design brief
        slug: "desk-yoga",
        name: "Desk Yoga",
        summary:
          "Movement for bodies that sit all day. Shoulders, neck, hips and wrists, done in ordinary clothes beside a desk, in a form your team will still remember next week.",
        format: "On site or online",
        for: "Desk-bound and hybrid teams",
      },
      {
        // CLIENT'S NAMED LIST - design brief
        slug: "leadership-mindfulness",
        name: "Leadership Mindfulness",
        summary:
          "For the people who set the pace. Attention, listening and steadiness under pressure, worked on as a skill to be practised rather than talked about as a value.",
        format: "On site or online",
        for: "Managers and senior teams",
      },
      {
        // CLIENT'S NAMED LIST - design brief
        slug: "emotional-resilience",
        name: "Emotional Resilience",
        summary:
          "How to stay steady when the work is hard. Naming what you feel, letting it move, and coming back to the task without carrying the whole day home with you.",
        format: "On site or online",
        for: "Teams through change, loss or long pressure",
      },
      {
        // CLIENT'S NAMED LIST - design brief
        slug: "counselling",
        name: "Counselling",
        summary:
          "A held conversation, one to one and in confidence, for where practice needs support that a class cannot give. Offered inside a workplace programme or on its own.",
        format: "Online and in person",
        for: "Individuals, privately",
      },
    ],
  },

  {
    slug: "retreats",
    title: "Retreats",
    eyebrow: "Away from the city",
    intro:
      "Time away, with practice at either end of the day and quiet in between. Numbers are kept small, so nobody is lost in the room.",
    services: [
      {
        // OURS - awaiting client confirmation. The brief names the section but
        // describes no retreat anywhere in either client document.
        slug: "weekend-retreat",
        name: "Weekend Retreat",
        summary:
          "A short stay out of the city. Practice in the morning and again as the light goes, simple food, and long enough between the two to do nothing at all.",
        format: "In person",
        includes: ["Morning and evening practice", "Guided meditation", "Simple food", "Unstructured time"],
      },
      {
        // OURS - awaiting client confirmation
        slug: "immersion-retreat",
        name: "Immersion Retreat",
        summary:
          "For people who want to go further in. Asana, pranayama and meditation held together across consecutive days, with rest, reading and silence built into the shape of it.",
        format: "In person",
        for: "Established practitioners",
        includes: ["Daily asana and pranayama", "Meditation and silence", "Study and discussion"],
      },
      {
        // OURS - awaiting client confirmation
        slug: "bespoke-retreat",
        name: "Bespoke Retreat",
        summary:
          "A retreat built for a group that already exists: a team, a studio, a family, a circle of friends. Tell us who is coming and what you want them to leave with.",
        format: "In person",
        for: "Teams and private groups",
      },
    ],
  },

  {
    slug: "schools",
    title: "Schools",
    eyebrow: "For students and staff",
    intro:
      "Sessions taught in the space a school already has, in a form a teacher can carry on with once we have gone.",
    services: [
      {
        // OURS - awaiting client confirmation. "Chanting for Kids" is her own
        // practice and is named on Home, but the brief lists no school service.
        slug: "yoga-in-the-classroom",
        name: "Yoga in the Classroom",
        summary:
          "Movement and breath pitched at the age of the room, for a single class or a whole year group. Short practices that repeat, so they become something the children know.",
        format: "In person, at your school",
      },
      {
        // OURS - awaiting client confirmation
        slug: "chanting-for-children",
        name: "Chanting for Children",
        summary:
          "Sound, rhythm and stillness, offered to children in a form they take to easily. It settles a room, which makes it useful at the start or the end of a school day.",
        format: "In person, at your school",
      },
      {
        // OURS - awaiting client confirmation
        slug: "teacher-and-staff-sessions",
        name: "Teacher and Staff Sessions",
        summary:
          "A session for the adults in the building. Breath, posture and a way to reset between lessons, for people who spend the whole day holding a room together.",
        format: "In person, at your school",
        for: "Teaching and support staff",
      },
    ],
  },

  {
    slug: "online-programmes",
    title: "Online Programmes",
    eyebrow: "Wherever you are",
    intro:
      // "Half of this practice has run online for years" was cut: the 27 July
      // notes say classes are taught online and offline and nothing more, so
      // the proportion was ours to invent and it read as a claim.
      "The same teaching, over video. This is taught as its own thing, not as a lesser version of the room.",
    services: [
      {
        // OURS - awaiting client confirmation. The brief names "Online
        // Programs" as a section and lists nothing inside it.
        slug: "live-online-classes",
        name: "Live Online Classes",
        summary:
          "A live class with the teacher watching and correcting, not a recording playing at you. For people who practise better in company but cannot get across the city.",
        format: "Online, live",
      },
      {
        // OURS - awaiting client confirmation
        slug: "guided-course",
        name: "Guided Course",
        summary:
          "A course you follow over several weeks, one theme at a time, with live sessions and something small to practise on the days in between.",
        format: "Online, live",
        for: "People who want a structure rather than a class to drop into",
      },
      {
        // OURS - awaiting client confirmation
        slug: "one-to-one-online",
        name: "One-to-One Online",
        summary:
          "Private teaching over video, arranged around your hours and the room you have at home. The same close attention as a session in person, without the journey.",
        format: "Online, live",
        for: "Anyone outside Bangalore, or short of time",
      },
    ],
  },
];
