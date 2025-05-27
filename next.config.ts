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
      }
    ]
  }
};

export default nextConfig;
