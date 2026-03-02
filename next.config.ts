import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Suppress warnings for optional peer deps not needed in this app
    config.ignoreWarnings = [
      { module: /pino-pretty/ },
      { module: /@farcaster/ },
    ];
    return config;
  },
};

export default nextConfig;
