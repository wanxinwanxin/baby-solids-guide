import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Railway serves both apex and www, but the apex is canonical: auth
        // cookies, the OAuth callback, and every indexed URL live on one origin.
        source: "/:path*",
        has: [{ type: "host", value: "www.opensolids.org" }],
        destination: "https://opensolids.org/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
