import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.pexels.com"], // ✅ allow images from Pexels
  },
};

export default nextConfig;
