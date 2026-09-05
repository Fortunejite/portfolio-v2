import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-218b36c1b3044259aa3c5974a4438661.r2.dev",
      },
    ],
  },
};

export default nextConfig;
