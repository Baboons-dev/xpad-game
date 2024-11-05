/** @type {import('next').NextConfig} */
const nextConfig = {
  //   reactStrictMode: false,
  eslint: {
    // ignoreDuringBuilds: true,
  },
  typescript: {
    //very very danger if true
    // ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
