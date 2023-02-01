/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com',"localhost", "api.ragam.co.in", "api.staging.ragam.co.in"],
  },
}

module.exports = nextConfig
