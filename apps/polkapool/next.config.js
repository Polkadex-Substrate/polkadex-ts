/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    DISABLED_TOKENS: process.env.DISABLED_TOKENS,
    NETWORK_ENDPOINT: process.env.NETWORK_ENDPOINT,
  },
};

module.exports = nextConfig;
