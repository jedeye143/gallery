/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Prevent ESLint errors from failing production builds on Vercel
    ignoreDuringBuilds: true,
  },
  images: {
    // Allow images from local public directory
    unoptimized: false,
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
