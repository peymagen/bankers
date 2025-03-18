/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api-bankers.basukalaiti.com",
      },
      {
        protocol: "https",
        hostname: "www.igp.com",
      },
    ],
  },
};

module.exports = nextConfig;
