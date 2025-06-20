/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.lottiefiles.com',
      },
    ],
  },
}

module.exports = nextConfig 