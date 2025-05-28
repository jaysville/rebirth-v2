import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["i.postimg.cc"],
  },
};

export default nextConfig;
