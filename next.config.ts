import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // - base it on the image address, for example https://images.pexels.com/photos/13461021/pexels-photo-13461021.jpeg
        hostname: "utfs.io",
      },
    ],
  },
};

export default nextConfig;
