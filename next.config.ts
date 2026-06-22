import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The centre's own photography is served locally from /public/images;
    // images uploaded through Sanity are served from the Sanity image CDN.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
