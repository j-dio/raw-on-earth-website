import { site } from "@/data/site";

/* Journal content.

   Two kinds of thing live here, and they are not the same kind:

   1. `topics` - the seven subjects the design brief names for the Journal
      ("mindfulness, human behaviour, conscious living, wellness, slow living,
      stress, breath"). Real client content, used by the browse-by-subject
      strip on /journal.

   2. `fallbackPosts` - what the page shows if the Substack feed cannot be
      reached at build time. They are the same seven topics as cards, NOT
      invented articles: a placeholder with a plausible title, a date and an
      excerpt reads as a real post she wrote, and nobody would catch it before
      it shipped. Topic cards cannot be mistaken for articles.

   Where the posts really come from: src/lib/substack.ts. */

export type Post = {
  title: string;
  /** Where the full piece opens. Always external for feed posts. */
  url: string;
  /** ISO 8601 date, or null when there is no date to state. */
  date: string | null;
  excerpt: string;
  /** First image in the post body, if the feed carried one. */
  image: string | null;
  /** Set only on the fallback cards. The page and the schema both branch on it. */
  placeholder?: true;
};

export type Topic = { name: string; blurb: string };

/* From the design brief's Journal section. The subject names are hers; the
   one-line blurbs are written in her register, since the brief gives the list
   without descriptions. */
export const topics: Topic[] = [
  { name: "Mindfulness", blurb: "Paying attention to the ordinary hour you are already in." },
  { name: "Human Behaviour", blurb: "Why we do the things we say we would rather not do." },
  { name: "Conscious Living", blurb: "Choices made on purpose, from what you eat to what you buy." },
  { name: "Wellness", blurb: "Health as a daily practice rather than a repair job." },
  { name: "Slow Living", blurb: "Doing fewer things, and staying with them longer." },
  { name: "Stress", blurb: "What pressure does to a body, and what helps it settle." },
  { name: "Breath", blurb: "The one part of the nervous system you can steer by hand." },
];

// PLACEHOLDER - shown only if the Substack feed cannot be reached at build time.
export const fallbackPosts: Post[] = topics.map((topic) => ({
  title: topic.name,
  url: site.social.substack,
  date: null,
  excerpt: topic.blurb,
  image: null,
  placeholder: true,
}));
