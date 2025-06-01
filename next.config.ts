import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images : {
    remotePatterns : [
      {
        hostname : "ghost-snapcast.b-cdn.net",
        protocol : "https",
        port : "",
        pathname : "/**"
      },
      {
        hostname : "lh3.googleusercontent.com",
        protocol : "https",
        port : "",
        pathname : "/**"
      }
    ]
  },
  eslint : {
    ignoreDuringBuilds : true,
  },
  typescript : {
    ignoreBuildErrors : true
  }
};

export default nextConfig;
