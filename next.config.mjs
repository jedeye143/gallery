/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow images from local public directory
    unoptimized: false,
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
