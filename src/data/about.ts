/* About page content.

   One story, from "Raw on Earth - Website Design Brief.pdf", pages 3-4. That is
   the only client document we build from.

   There used to be three more blocks here: a second story, a founder biography
   and a signed letter. They came from a content document the owner never gave
   instructions against, they repeated each other, and the page read as three
   biographies of the same person. Removed 2026-09-15. They are in git history.

   Her words are stored exactly as she typed them. Her em dashes, her ellipsis
   and her spellings stay. Do not tidy the punctuation. */

export type Story = {
  heading: string;
  subheading?: string;
  paragraphs: string[];
  /* The last few lines, set as display type rather than running prose because
     that is the job they do in the source. */
  closing: string[];
};

/* The brief's own note under this draft: "Your architecture identity should not
   be mixed into this particular story unless you specifically want it there."
   So the opening line is the only place architecture appears, and it stays that
   way until she asks otherwise. */
export const story: Story = {
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

/* The belief the design brief sets apart from the running copy, indented and
   on its own two lines. It gets its own panel on the page for that reason. */
export const belief = {
  // verbatim client copy
  intro: "At the heart of her teaching is a simple belief:",
  // verbatim client copy
  quote: "Well-being isn't about becoming someone else. It is about returning to yourself.",
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

   The brief's eighth bullet, "Organisations worked with", is now published -
   see `corporateClients` below. */
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

/* Corporate credentials. She asked for these herself, unprompted, on the call
   of 6 September 2026 (00:55:45): "I do workshops for Volvo, JP Morgan,
   Amazon, Sayronics. So these companies have to be projected somewhere."

   Four names, in her order, and nothing else. No logos - we have no licence to
   use anyone's mark. No project descriptions, no dates, no testimonials: she
   named the companies and said nothing else about the work, and inventing the
   rest is how a credential turns into a claim.

   Her business cards list eleven more organisations. She named four, so it is
   four until she says otherwise.

   OPEN QUESTION: the last name is spelled "Sayronics" in the call transcript
   and "Saironics" in the meeting notes. Nobody has asked her which. Confirm
   before this goes to a live domain. */
export const corporateClients = ["Volvo", "JP Morgan", "Amazon", "Sayronics"];
