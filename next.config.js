/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.lottiefiles.com',
      },
    ],
    // Optimisations images
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  // Optimisations performances
  compress: true,
  poweredByHeader: false,
  // Optimisations build
  swcMinify: true,

}

module.exports = nextConfig 