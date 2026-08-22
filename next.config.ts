import path from "node:path";
import type { NextConfig } from "next";

// Production is Hostinger Web Apps, not Vercel. `next/image`'s default optimiser
// needs a writable cache dir that the shared plan has not been proven to provide,
// so images stay unoptimised until that is measured on a real Hostinger deploy.
const nextConfig: NextConfig = {
  images: { unoptimized: true },
  // A stray package-lock.json sits above this repo, so Next infers the wrong
  // workspace root and traces the wrong files. Pin it to this directory.
  outputFileTracingRoot: path.resolve("."),
};

export default nextConfig;
