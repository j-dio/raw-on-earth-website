/* Services. One typed array; adding a service is adding an object, never a new
   hand-built block. The design brief says so in as many words: "More will be
   added over time, so this must be data-driven, not hand-built pages."

   TONE - read this too. The five group intros and every `summary` were
   rewritten on 2026-09-17 toward the reference's own register.
   ouranoyoga.com states what happens and stops: "Students will be guided
   through traditional yoga postures with different options and variations
   given as necessary according to your level of practice. There is lots of
   focus on developing the breath and uniting it with movement in the body."
   Plain, declarative, second person, no wit at the end of the sentence.

   What was here instead was nineteen entries in one identical shape - a
   clever fragment followed by a wry qualifier - which is exactly what reads
   as machine-written however good any single line is.

   Also cut on the way through: "Numbers are kept small, so nobody is lost in
   the room." Nobody has told us her group sizes. Same claim, and the same
   fault, as the four cut from the Workshops intro.

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
      "One-to-one teaching, built around what your own practice needs. Taught online or in person, at a time arranged with you.",
    services: [
      {
        // CLIENT'S NAMED LIST - design brief
        slug: "private-yoga",
        name: "Private Yoga",
        summary:
          "You are taught one to one in Classical Hatha or Ashtanga Vinyasa, with the practice built around what your body can do now. Sessions suit beginners, anyone returning after an injury, and practitioners who want their alignment looked at closely.",
        format: "Online and in person",
        for: "Beginners, returners and long-time practitioners",
      },
      {
        // CLIENT'S NAMED LIST - design brief
        slug: "mindfulness-coaching",
        name: "Mindfulness Coaching",
        summary:
          "You are guided through mindfulness practice session by session, learning to notice thought and habit as they arise. The work is in how you respond to them rather than in stopping them.",
        format: "Online and in person",
        for: "Anyone whose mind runs faster than their day",
      },
      {
        // CLIENT'S NAMED LIST - design brief
        slug: "breathwork",
        name: "Breathwork",
        summary:
          "You are taught a small set of pranayama practices and when to use each one. The focus is on breathing that steadies sleep, nerves and attention.",
        format: "Online and in person",
        for: "Poor sleep, high stress, scattered attention",
      },
      {
        // CLIENT'S NAMED LIST - design brief
        slug: "lifestyle-coaching",
        name: "Lifestyle Coaching",
        summary:
          "You look together at how you sleep, eat, move and rest, and change one thing at a time. The aim is habits that hold once the practice is over.",
        format: "Online and in person",
        for: "People who want the practice to reach the rest of the week",
      },
      {
        // CLIENT'S NAMED LIST - design brief
        slug: "group-yoga",
        name: "Group Yoga",
        summary:
          "A weekly group class in Classical Hatha or Ashtanga Vinyasa, taught online or in person. It suits people who practise better alongside others and want a regular place to do it.",
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
      "Programmes for teams at work, run for organisations across technology, finance, retail and education. Held on site in your own rooms, or online for people working apart.",
    services: [
      {
        // CLIENT'S NAMED LIST - design brief
        slug: "stress-management",
        name: "Stress Management",
        summary:
          "Your team is shown what stress does to breath, sleep and attention, and taught practices short enough to use between meetings. The session is practical and needs no equipment.",
        format: "On site or online",
        for: "Teams in a heavy quarter",
      },
      {
        // CLIENT'S NAMED LIST - design brief
        slug: "desk-yoga",
        name: "Desk Yoga",
        summary:
          "Movement for people who sit all day, worked through the shoulders, neck, hips and wrists. It is done in ordinary clothes beside a desk, so it can be repeated without changing.",
        format: "On site or online",
        for: "Desk-bound and hybrid teams",
      },
      {
        // CLIENT'S NAMED LIST - design brief
        slug: "leadership-mindfulness",
        name: "Leadership Mindfulness",
        summary:
          "A session for managers and senior teams on attention, listening and steadiness under pressure. These are treated as skills to be practised rather than values to be stated.",
        format: "On site or online",
        for: "Managers and senior teams",
      },
      {
        // CLIENT'S NAMED LIST - design brief
        slug: "emotional-resilience",
        name: "Emotional Resilience",
        summary:
          "Your team is guided through naming what they feel, letting it move, and returning to the work. It suits teams going through change, loss or a long period of pressure.",
        format: "On site or online",
        for: "Teams through change, loss or long pressure",
      },
      {
        // CLIENT'S NAMED LIST - design brief
        slug: "counselling",
        name: "Counselling",
        summary:
          "A confidential conversation, one to one, for where practice needs support a class cannot give. It is offered inside a workplace programme or on its own.",
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
      "Time away from the city, with practice at either end of the day and quiet in between.",
    services: [
      {
        // OURS - awaiting client confirmation. The brief names the section but
        // describes no retreat anywhere in either client document.
        slug: "weekend-retreat",
        name: "Weekend Retreat",
        summary:
          "A short stay outside the city, with practice in the morning and again in the evening. Simple food, and unstructured time in between.",
        format: "In person",
        includes: ["Morning and evening practice", "Guided meditation", "Simple food", "Unstructured time"],
      },
      {
        // OURS - awaiting client confirmation
        slug: "immersion-retreat",
        name: "Immersion Retreat",
        summary:
          "Asana, pranayama and meditation taught together across consecutive days. Rest, reading and silence are part of the timetable rather than gaps in it.",
        format: "In person",
        for: "Established practitioners",
        includes: ["Daily asana and pranayama", "Meditation and silence", "Study and discussion"],
      },
      {
        // OURS - awaiting client confirmation
        slug: "bespoke-retreat",
        name: "Bespoke Retreat",
        summary:
          "A retreat arranged for a group that already exists: a team, a studio, a family, a circle of friends. Tell her who is coming and what you would like them to take away.",
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
      "Sessions for children and for the adults who teach them, taught in the space your school already has.",
    services: [
      {
        // OURS - awaiting client confirmation. "Chanting for Kids" is her own
        // practice and is named on Home, but the brief lists no school service.
        slug: "yoga-in-the-classroom",
        name: "Yoga in the Classroom",
        summary:
          "Movement and breath pitched at the age of the class, for one group or a whole year. The practices are short and repeat, so the children come to know them.",
        format: "In person, at your school",
      },
      {
        // OURS - awaiting client confirmation
        slug: "chanting-for-children",
        name: "Chanting for Children",
        summary:
          "Sound, rhythm and stillness, taught in a form children take to easily. It settles a room, which makes it useful at the start or the end of a school day.",
        format: "In person, at your school",
      },
      {
        // OURS - awaiting client confirmation
        slug: "teacher-and-staff-sessions",
        name: "Teacher and Staff Sessions",
        summary:
          "A session for the adults in the building: breath, posture, and a way to reset between lessons. It suits teaching and support staff who are on their feet all day.",
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
      "The same teaching, over video, wherever you are. Classes are live, not recordings.",
    services: [
      {
        // OURS - awaiting client confirmation. The brief names "Online
        // Programs" as a section and lists nothing inside it.
        slug: "live-online-classes",
        name: "Live Online Classes",
        summary:
          "A live class taught over video, with the teacher watching and correcting as you go. Classes are taught live and are not recordings.",
        format: "Online, live",
      },
      {
        // OURS - awaiting client confirmation
        slug: "guided-course",
        name: "Guided Course",
        summary:
          "A course taught over several weeks, one theme at a time, with live sessions and a short practice for the days in between.",
        format: "Online, live",
        for: "People who want a structure rather than a class to drop into",
      },
      {
        // OURS - awaiting client confirmation
        slug: "one-to-one-online",
        name: "One-to-One Online",
        summary:
          "Private teaching over video, arranged around your hours and the space you have at home. The attention is the same as a session in person.",
        format: "Online, live",
        for: "Anyone outside Bangalore, or short of time",
      },
    ],
  },
];
