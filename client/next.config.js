/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_ZEGO_APP_ID: 839870684,
    NEXT_PUBLIC_ZEGO_SERVER_ID: "2340fae0f5145c4a5d0f39cf9c91c913",
  },
  images: {
    domains: ["localhost"],
  },
};

module.exports = nextConfig;
