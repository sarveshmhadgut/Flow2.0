import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static1.squarespace.com"
      },
      {
        protocol: "https",
        hostname: "ibb.co"
      },
      {
        protocol: "https",
        hostname: "pixlr.com"
      },
      {
        protocol: "https",
        hostname: "links.papareact.com"
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/commons/**"
      }
    ]
  }
};

export default nextConfig;
