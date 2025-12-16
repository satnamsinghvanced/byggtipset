import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["byggtipset.no"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "byggtipset.no",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "byggtipset.no",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
