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

export const strands: Strand[] = [
  {
    slug: "nature-walks",
    name: "Nature walks",
    cadence: "Dates announced on Instagram and in the WhatsApp group",
    summary:
      "A slow walk, usually early, usually somewhere green. No pace to keep up with and nothing to sign up for. People talk for the first half and go quiet for the second.",
    image: {
      src: "/media/thumb/raji-05.webp",
      alt: "The founder stands at the base of a towering tree, hand resting on its bark, looking up into the canopy.",
      width: 760,
      height: 1628,
    },
  },
  {
    slug: "running-club",
    name: "Running club",
    cadence: "Meeting points shared on WhatsApp",
    summary:
      "Running as a breathing practice rather than a race. Every distance is welcome and nobody is left behind at the turn.",
  },
  {
    slug: "book-club",
    name: "Book club",
    cadence: "One book at a time. The next title is announced on Instagram",
    summary:
      "One book, read slowly, discussed in a room where nobody has to have finished it. Philosophy, psychology, and the occasional novel that earns its place.",
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
    slug: "donations",
    name: "Donations",
    cadence: "Open all year. Ask which cause is being supported now",
    summary:
      "Community sessions are funded by the people who can afford to give. If you would like to contribute, write and ask what is needed - it is more often mats and time than money.",
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

/* The scroll strip. Small tiles only, deliberately.

   CONSENT: every `kids-*` frame here is flagged `children_faces: true` in
   .work/catalog-keep.json. Per CLAUDE.md those may run at thumbnail size but
   never as a large feature image, and publishing them at all is an open
   question with the client. If consent is refused, delete these five entries -
   the strip is data-driven and the section survives on the rest.

   community-02.webp has a caption graphic ("Missing my big yoga family at
   ashram") burned into the frame in a black speech bubble. It is kept small
   here so the graphic reads as part of the photograph rather than as a broken
   overlay. Replace it with a clean export when one arrives. */
export type Snap = StrandImage & { caption: string };

export const snaps: Snap[] = [
  {
    src: "/media/thumb/kids-33.webp",
    alt: "An instructor smiles while standing over a seated group of children stretching on mats in an outdoor enclosure lined with trees.",
    caption: "A warm moment mid-session",
    width: 760,
    height: 506,
  },
  {
    src: "/media/thumb/kids-35.webp",
    alt: "An instructor shares a high-five with a child on a tiled terrace, with a decorative painted wall and a bench behind them.",
    caption: "A high-five after practice",
    width: 760,
    height: 1140,
  },
  {
    src: "/media/thumb/kids-31.webp",
    alt: "An instructor kneels among a group of children practising seated forward folds outdoors on colourful mats near a wooded chain-link boundary.",
    caption: "Outdoor practice, side by side",
    width: 760,
    height: 506,
  },
  {
    src: "/media/thumb/community-02.webp",
    alt: "A large crowd of yoga practitioners raises their arms and cheers outdoors under trees, with a teacher kneeling at the centre in a red and white outfit.",
    caption: "Missing the yoga family",
    width: 760,
    height: 1352,
  },
  {
    src: "/media/thumb/kids-14.webp",
    alt: "Rows of schoolchildren in white shirts stand at attention on coloured mats arranged in a wide outdoor courtyard, trees and a traditional building visible behind.",
    caption: "A full courtyard, ready to begin",
    width: 760,
    height: 570,
  },
  {
    src: "/media/thumb/kids-20.webp",
    alt: "An instructor guides a girl into a supported headstand on a mat in front of a community building, a seated child watching in the foreground.",
    caption: "Learning to hold still, upside down",
    width: 760,
    height: 1014,
  },
];
