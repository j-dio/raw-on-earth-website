/* Community page content.

   Source: the design brief's "Community" page, verbatim - Theme "Grow Together".
   Student stories, testimonials, photos, volunteer work, book club, donations,
   nature walks, retreat memories, community events." The 27 July notes add the
   running club and "community interactions and group photos".

   The brief names the strands. It gives no dates, no times, no meeting points
   and no fees, so none are written here.

   PLACEHOLDER - cadence awaiting client confirmation. Every `cadence` line
   below says where a date will be announced, because that is the only thing
   anybody at Raw On Earth has actually told us. Do not replace them with
   invented schedules ("every second Saturday, 6:30am"); replace them with what
   she confirms.

   A `snaps` array used to sit at the foot of this file, feeding a horizontal
   photo strip that teased the old /gallery route. The gallery is a section on
   the Community page now (2026-09-15), so the strip was the same photographs
   twice and both went. They are in git history.

   Image dimensions were measured off the files, not copied from the catalogue:
   /media/thumb/* is capped at 760px wide, /media/gallery/* is the full frame.
   Alt text is the catalogue's own, written per image. */

export type StrandImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Strand = {
  slug: string;
  name: string;
  /* PLACEHOLDER - cadence awaiting client confirmation. */
  cadence: string;
  summary: string;
  image?: StrandImage;
};

/* Order is load-bearing: the mosaic on /community tiles a six-column grid from
   this array in sequence, and it pairs the photographed strands with each other
   so no text-only panel is stretched to the height of an image beside it. If
   you reorder or add a strand, update SPAN in src/app/community/page.tsx or the
   grid leaves an empty track, which draws as a grey rectangle. */
export const strands: Strand[] = [
  {
    slug: "nature-walks",
    name: "Nature walks",
    cadence: "Dates announced on Instagram and in the WhatsApp group",
    summary:
      "A slow walk, usually early, usually somewhere green. No pace to keep up with and nothing to sign up for. People talk for the first half and go quiet for the second.",
    image: {
      src: "/media/thumb/community-02.webp",
      alt: "A large joyful group of practitioners celebrating together outdoors in front of a retreat centre, arms raised and smiling.",
      width: 760,
      height: 946,
    },
  },
  {
    slug: "volunteer-work",
    name: "Volunteer work",
    cadence: "Ongoing. Each drive is announced when it is confirmed",
    summary:
      "Yoga taken to schools, clubs and community centres that would not otherwise pay for it. This is where most of the practice actually happens.",
    image: {
      src: "/media/thumb/kids-37.webp",
      alt: "An instructor stands with palms together in a gesture of thanks alongside a group of children doing the same outside a building.",
      width: 760,
      height: 506,
    },
  },
  {
    slug: "running-club",
    name: "Running club",
    cadence: "Meeting points shared on WhatsApp",
    summary:
      "Running as a breathing practice rather than a race. Every distance is welcome and nobody is left behind at the turn.",
    image: {
      src: "/media/thumb/community-03.webp",
      alt: "A small group of practitioners doing yoga together on mats in a park under a large spreading tree.",
      width: 760,
      height: 428,
    },
  },
  {
    slug: "book-club",
    name: "Book club",
    cadence: "One book at a time. The next title is announced on Instagram",
    summary:
      "One book, read slowly, discussed in a room where nobody has to have finished it. Philosophy, psychology, and the occasional novel that earns its place.",
    image: {
      src: "/media/thumb/meditation-01.webp",
      alt: "A yoga practitioner reading a book about Ashtanga, seated cross-legged in a quiet indoor setting.",
      width: 760,
      height: 1352,
    },
  },
  {
    slug: "donations",
    name: "Donations",
    cadence: "Open all year. Ask which cause is being supported now",
    summary:
      "Community sessions are funded by the people who can afford to give. If you would like to contribute, write and ask what is needed - it is more often mats and time than money.",
    image: {
      src: "/media/thumb/kids-39.webp",
      alt: "A teacher leads a session with schoolchildren on colourful yoga mats in an open outdoor courtyard.",
      width: 760,
      height: 1628,
    },
  },
  {
    slug: "retreats",
    name: "Retreats",
    cadence: "A handful each year, announced on Instagram and by email",
    summary:
      "Two or three days away from the phone. Practice at both ends of the day, food eaten slowly, and the long unstructured afternoon that does most of the work.",
    image: {
      src: "/media/thumb/meditation-09.webp",
      alt: "A group lies in savasana on scattered mats inside a concrete pavilion, arms relaxed at their sides under low evening light.",
      width: 760,
      height: 428,
    },
  },
  {
    slug: "community-events",
    name: "Community events",
    cadence: "Announced on Instagram",
    summary:
      "Open days, festivals, ceremonies and the sessions we are invited to run by somebody else. Come as a guest, stay as a regular if it suits you.",
    image: {
      src: "/media/thumb/community-10.webp",
      alt: "A monk in maroon robes shares a blessing ritual with a man and a woman over a small bowl, in a bright room with yoga mats stacked in the background.",
      width: 760,
      height: 570,
    },
  },
];
