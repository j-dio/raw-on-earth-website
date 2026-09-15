import path from "node:path";
import type { NextConfig } from "next";

/* Duplicated from src/lib/env.ts rather than imported: next.config.ts is
   evaluated outside the app's module graph and cannot use the "@/" alias. */
const isPreview = process.env.NOINDEX === "1";

// Production is Hostinger Web Apps, not Vercel. `next/image`'s default optimiser
// needs a writable cache dir that the shared plan has not been proven to provide,
// so images stay unoptimised until that is measured on a real Hostinger deploy.
const nextConfig: NextConfig = {
  /* `next dev` and `next build` both write to .next and will happily overwrite
     each other's server chunks. When that happens the running server starts
     throwing ENOENT on .next/server/app/page.js and a 500 that looks like a code
     bug but is not one. It cost this project several false alarms.

     So a QA build gets its own directory: NEXT_DIST_DIR=.next-qa npm run build,
     then NEXT_DIST_DIR=.next-qa npm run start -- -p 4000. Production is
     unaffected - unset, this is exactly the default. */
  distDir: process.env.NEXT_DIST_DIR ?? ".next",

  images: { unoptimized: true },
  // A stray package-lock.json sits above this repo, so Next infers the wrong
  // workspace root and traces the wrong files. Pin it to this directory.
  outputFileTracingRoot: path.resolve("."),

  /* A header as well as robots.txt, because they fail differently. robots.txt
     asks a crawler not to fetch a page; `X-Robots-Tag` tells it not to index
     what it has already fetched, which is what catches a URL someone pasted
     into a chat and a crawler followed. It also covers files that carry no
     meta tag at all, such as the images. */
  async headers() {
    if (!isPreview) return [];
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
