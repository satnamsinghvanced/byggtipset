import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["https://byggtipset.no"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "https://byggtipset.no",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "https://byggtipset.no",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
