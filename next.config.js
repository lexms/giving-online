const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // No experimental config needed for App Router in Next.js 14
  async rewrites() {
    return []
  },
}

module.exports = withPWA(nextConfig)
