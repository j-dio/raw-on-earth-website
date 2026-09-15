# Raw On Earth

Marketing site for a yoga and mindfulness practice in Bangalore. Next.js 15
App Router, Tailwind v4, TypeScript. No database, no CMS, no backend.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build, also type-checks
npm run start        # serve the build
```

There is no test runner. We check work by building it and looking at it, at
390px and at 1280px.

```bash
NEXT_DIST_DIR=.next-qa npm run build
NEXT_DIST_DIR=.next-qa npm run start -- -p 4000
node scripts/shot.mjs http://localhost:4000 ./.shots "/:home:390x844" "/:home-wide:1280x900"
```

**Keep `NEXT_DIST_DIR` on those two lines.** `next dev` and `next build` both
write to `.next` and overwrite each other's server chunks. When they collide the
dev server starts throwing `ENOENT ... .next/server/app/page.js` and a 500 that
looks exactly like a bug in your code. It is not. Building to `.next-qa` keeps
the two apart.

`scroll<px>` as a fourth field captures one band with its lazy images loaded —
`"/:offers:1280x900:scroll4200"`. A `full` capture never loads them, so long
pages come back with empty picture frames that look like a broken gallery.

**Do not screenshot a phone with `chrome --headless --window-size=390,844`.**
Chrome on Windows will not open a window under about 500px, so what you get is a
390px crop of a 500px layout, and every mobile bug it shows is invented. This
cost half a session once. `scripts/shot.mjs` drives Chrome over the DevTools
Protocol and sets the real CSS viewport instead. No dependencies, it uses the
WebSocket built into Node 22+.

## Where things are

```
src/app/         one folder per page, Next.js App Router
src/components/  shared UI: header, footer, forms, gallery grid
src/data/        all page content, as typed .ts files
src/lib/         small helpers: SEO, env flags, Substack fetch
public/          images, fonts, brand marks
```

**Content lives in `src/data/`, not in the pages.** Adding a service or a
workshop means adding an object to an array. If you find yourself writing copy
inside a `.tsx` file, it probably belongs in `src/data/`.

The client's own words are stored exactly as she wrote them, marked
`// verbatim`. Do not tidy them up. British spelling everywhere, because that
is how she writes.

## Things that will bite you

**Production is Hostinger, not Vercel.** Vercel is only for review builds. So
no `next/image` optimiser, no ISR, no edge middleware, no `@vercel/*`
packages. A green Vercel preview proves nothing about Hostinger. Images are
plain `<img>` with `images.unoptimized: true` for this reason.

**Check colour contrast on the rendered page, not in the token file.** The
palette is soft greens and creams. Sage on linen looks fine and fails 4.5:1.
Measure the actual pixels.

**Every gallery image needs real alt text.** There are a lot of them. This is
the easiest thing to get wrong.

**`NOINDEX=1`** marks a build as a private review copy. It has to be set at
build time, not after, because robots.txt and the page metadata are generated
during the build.

## How we write comments

Comment the decision, not the code. If a number was measured, say what it was
measured against so the next person knows when it stops being true.

```ts
// Capped at 88px. 100px ran "Earth" into the right edge at 1440.
```

Skip the comment if the code already says it. Keep it to a line or two. Some
older files have long comment blocks from the first build; if you rewrite a
section, shorten its comment while you are in there.

## Working on it together

We work on branches and open pull requests. Nobody pushes to `main`.

Each Vercel preview build gets its own link, so a pull request can be looked at
in a browser before it is merged. That is how we review each other's work.

The current list of work is in `docs/feedback/2026-09-06/BACKLOG.md`. It is
split into two lanes that do not touch the same files. Stay in your lane or we
spend the week resolving conflicts.

`docs/` and `CLAUDE.md` are not in the repo. They hold the client's brief and
her photos, which are hers, not ours. Ask for a copy.
