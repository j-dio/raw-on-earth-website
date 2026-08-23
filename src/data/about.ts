/* About page content.

   Two complete About drafts exist, both written by the client, and they take
   opposite decisions on whether her architecture background belongs in the
   story. She has not chosen. Both are stored here verbatim so the choice is a
   one-line edit rather than a re-transcription:

     storyBrief    - "Raw on Earth - Website Design Brief.pdf", pages 3-4.
                     Third person. Architecture appears once, as training.
     storyPersonal - "Website content_RawOnEarth.pdf", pages 2-3.
                     First person, longer, and LEADS with the architecture
                     parallel.

   Do not merge them, do not tidy the punctuation, and do not "improve" a
   sentence. Her em dashes, her ellipsis and her spellings stay as typed. */

export type Story = {
  /* Where the words came from, so the next reader can check them. */
  source: string;
  heading: string;
  subheading?: string;
  paragraphs: string[];
  /* The last few lines, set as display type rather than running prose because
     that is the job they do in both drafts. */
  closing: string[];
};

export const storyBrief: Story = {
  source: "Design brief PDF, pages 3-4. Third person.",
  // verbatim client copy
  heading: "Meet Rajalakshmi",
  // verbatim client copy
  subheading: "The person behind Raw On Earth",
  // verbatim client copy
  paragraphs: [
    "An architect by training, a yoga teacher by practice, and a lifelong student of the relationship between the way we live and the way we feel and now a Wellness Architect.",
    "For Rajalakshmi, yoga began as a practice of movement, but gradually became something much deeper - a way of understanding the body, observing the mind, working with the breath, and learning to live with greater awareness.",
    "Over the years, her practice has evolved through Hatha Yoga, Ashtanga, Pranayama, meditation and mindfulness, alongside a continued exploration of different traditions, teachers and approaches to well-being.",
    "What began as a journey inward eventually became a desire to share that experience with others.",
    "Today, Rajalakshmi works with individuals, groups and organisations, creating spaces where people can slow down, reconnect with themselves and develop a more conscious relationship with their body, breath, mind and everyday life.",
    "Her work extends from yoga and mindfulness to corporate well-being, stress management, breathwork and conscious living, with an emphasis on making these practices accessible and relevant beyond the yoga mat.",
    "She has worked with organisations and institutions as well as with people from diverse backgrounds and stages of life.",
  ],
  // verbatim client copy
  closing: [
    "Raw On Earth grew from that belief — a space to pause, breathe, move, listen and become more aware of the way we live.",
    "Because before we can show up fully for our work, our relationships or the world around us, we have to learn to show up for ourselves.",
    "Work on yourself before you work for somebody else.",
  ],
};

export const storyPersonal: Story = {
  source: "Content PDF, pages 2-3. First person.",
  // verbatim client copy
  heading: "Meet The Person Behind Raw On Earth",
  // verbatim client copy
  paragraphs: [
    "Every time we are born, we arrive raw.",
    "Without titles. Without expectations. Without the need to prove who we are.",
    "And one day, when we leave, we leave just as we came—with nothing but the life we've lived in between.",
    "That simple thought inspired the name Raw On Earth.",
    "It is a reminder that life isn't always about becoming someone new. Sometimes, the greatest journey is simply returning to who we have always been.",
    "For me, yoga became that journey.",
    "I'm Rajalakshmi—an architect by profession and a yoga facilitator by calling.",
    "While architecture taught me how thoughtfully designed spaces influence the way people feel, yoga taught me that the most important space we will ever experience is the one within ourselves.",
    "What began as a personal practice slowly became a lifelong journey of understanding the body, calming the mind, and living with greater awareness.",
    "Through years of practice, study, and teaching, I realized that yoga is not about achieving the perfect posture. It is about building a quieter relationship with yourself—one breath, one movement, one moment at a time.",
    "That realization became the foundation of Raw On Earth.",
    "Today, Raw On Earth is a space where movement meets mindfulness, where people are encouraged to slow down, reconnect with themselves, and experience yoga beyond the physical practice.",
    "Whether you're stepping onto the mat for the first time or returning after years away, you're welcome here—exactly as you are.",
  ],
  // verbatim client copy
  closing: [
    "Because before we become anything else...",
    "We are all simply Raw On Earth.",
    "Work on yourself before you work for someone else.",
  ],
};

/* The page reads this one. It is storyBrief because the design brief carries
   the client's own note directly under that draft: "Your architecture identity
   should not be mixed into this particular story unless you specifically want
   it there." Without her answer, the draft that leaves architecture out of the
   story is the safer default. Swapping to storyPersonal is this line, alone. */
export const activeStory: Story = storyBrief;

/* The belief the design brief sets apart from the running copy, indented and
   on its own two lines. It gets its own panel on the page for that reason. */
export const belief = {
  // verbatim client copy
  intro: "At the heart of her teaching is a simple belief:",
  // verbatim client copy
  quote: "Well-being isn't about becoming someone else. It is about returning to yourself.",
};

export type FounderBio = { heading: string; lead: string; paragraphs: string[] };

/* Content PDF, pages 3-4. Third-person biography, and the only place the
   teachers, the lineages and the wider practices are named. Verbatim, including
   the missing full stop before "Today" in the fifth paragraph. */
export const founderBio: FounderBio = {
  // verbatim client copy
  heading: "Meet Rajalakshmi, the Founder",
  // verbatim client copy
  lead: "We'd love for you to meet the heart behind Raw On Earth.",
  // verbatim client copy
  paragraphs: [
    "Rajalakshmi (known by people as Raji) is an architect, yoga facilitator, mindfulness coach, and the founder of Raw On Earth. For over 13 years, she has been a dedicated student of yoga, a passionate teacher, and a compassionate guide to a growing community of individuals seeking health, balance, and conscious living.",
    "Her journey into yoga began in Rishikesh, where she immersed herself in traditional yogic practices and philosophy. What started as a personal exploration gradually became a lifelong path of learning, self-discovery, and transformation. Since then, yoga has become an integral part of the way she lives, teaches, and experiences the world.",
    "Over the years, Raji has studied and practised various traditions of yoga, with a strong foundation in Classical Hatha Yoga, Ashtanga Vinyasa, alignment-based practices, and specialised movement methodologies. Her learning continues to evolve, reflecting her belief that a teacher should always remain a student.",
    "She has had the privilege of learning under respected teachers, including Nitish Batra (Bengaluru), Soham Raghvendra, Praveen (Rishikesh), and Abhishek (Rishikesh), while also serving as an assistant teacher under experienced mentors. These experiences have shaped not only her technical understanding of yoga but also her philosophy of teaching with humility and authenticity.",
    "Beyond yoga, Raji's curiosity for holistic well-being led her to explore mobility training, strength training, breathwork, pranayama, meditation, mindfulness, conscious living and more Today, she thoughtfully weaves these disciplines into her classes, workshops, retreats, and corporate wellness programs, creating experiences that are practical, sustainable, and deeply transformative.",
    "Her teaching is known for its simplicity, clarity, and warmth. Whether she is guiding yoga asana, mindfulness practices, meditation, or cognitive and behavioural well-being for adolescents and professionals, her intention remains the same—to help people reconnect with themselves through awareness and consistent practice.",
    "Today, through Raw On Earth, Raji welcomes you to begin or continue your own journey towards health, balance, and wholeness.",
  ],
};

export type Letter = {
  heading: string;
  note: string;
  paragraphs: string[];
  signOff: string;
  signature: string;
  signatureRole: string;
};

/* Content PDF, pages 4-5. A signed personal letter, so the page sets it as
   one: narrower measure, larger leading, a real signature block. Verbatim. */
export const letter: Letter = {
  // verbatim client copy
  heading: "A Note from Raji's Mat",
  // verbatim client copy - her own parenthetical, directly under the heading
  note: "(Her mindful work space)",
  // verbatim client copy
  paragraphs: [
    "As I sit down to write this, my heart is filled with gratitude and a deep sense of purpose.",
    "Raw On Earth is more than a name or a platform. It is the manifestation of a dream that has quietly grown within me for over 13 years - a dream of creating a space where the wisdom shared by my teachers, the experiences that shaped me, and the lessons I continue to learn can be passed on with sincerity and care.",
    "Yoga entered my life at a time when I was searching for something deeper amidst the busyness of everyday life. What began as a physical practice slowly transformed into a journey inward. It taught me to pause, to breathe, to listen, and to embrace life with greater presence. Somewhere along the way, I realised that yoga wasn't simply something I practised- it had become the way I wanted to live.",
    "Over the years, I have had the privilege of learning from remarkable teachers and exploring yoga far beyond physical postures. Every experience has reminded me that true well-being is not about perfection; it is about cultivating awareness, compassion, resilience, and balance in everyday life.",
    "Raw On Earth was born from the desire to share this journey with others - to create a space where every individual, regardless of age, experience, or background, feels welcomed exactly as they are. A space where movement, breath, mindfulness, and conscious living come together to support a healthier, more meaningful life.",
    "Every time a new student joins a class, attends a workshop, or reaches out with curiosity, I am reminded why and how this journey began. My role is not simply to teach yoga. It is to hold space for people to reconnect with themselves, discover their own strengths, and move closer to the person they are meant to become.",
    "Whether you are here to find relief from stress, deepen your practice, improve your health, or simply begin again, I want you to know that you are welcome here.",
    "Thank you for being part of this journey.",
    "I look forward to practising, learning, and growing alongside you.",
  ],
  // verbatim client copy
  signOff: "With warmth,",
  signature: "Rajalakshmi",
  signatureRole: "Founder, Raw On Earth",
};

export type JourneyItem = {
  label: string;
  /* `lead` is what a reader without JavaScript sees, and the finished state of
     the count. `count` / `suffix` are set only where the line opens on a
     figure, so Motion.tsx counts those three and leaves the rest alone. */
  lead?: string;
  count?: number;
  suffix?: string;
};

/* Design brief PDF, page 4, the "Journey" list, in her order and her wording.
   src/data/home.ts has a shorter four-item `stats` array cut from the same
   list; About uses the full seven from the source rather than importing a
   subset that was written for a band on another page.

   The brief's eighth bullet, "Organisations worked with", is deliberately not
   here. The names are on her business cards, but publishing a client list is
   her call and possibly theirs - see CLAUDE.md. */
export const journey: JourneyItem[] = [
  { lead: "13+", count: 13, suffix: "+", label: "Years of experience" },
  { label: "Yoga training in Rishikesh & Dharamshala" },
  { label: "Hatha & Ashtanga Yoga" },
  { label: "Pranayama & Meditation" },
  { label: "Mindfulness & Corporate Well-being" },
  /* The brief writes this "5000+". The rendered figure is "5,000+" because
     Motion.tsx formats the counter with toLocaleString, and a number that
     changes its own punctuation when JavaScript loads reads as a bug. */
  { lead: "5,000+", count: 5000, suffix: "+", label: "Participants" },
  { lead: "35+", count: 35, suffix: "+", label: "Workshops" },
];
