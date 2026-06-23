import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The centre's own photography is served locally from /public/images;
    // images uploaded through Sanity are served from the Sanity image CDN.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  // Ship the site photos with the /api/seed function so the one-time content
  // import can read them on the server (falls back to fetching them otherwise).
  outputFileTracingIncludes: {
    "/api/seed": ["./public/images/**"],
  },
};

export default nextConfig;
