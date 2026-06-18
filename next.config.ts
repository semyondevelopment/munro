import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photography is the centre's own, served locally from /public/images.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
