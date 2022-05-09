/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_METAMASK_KEY: process.env.NEXT_PUBLIC_METAMASK_KEY,
    INFURA_API_KEY: process.env.INFURA_API_KEY,
  },
};

module.exports = nextConfig;
