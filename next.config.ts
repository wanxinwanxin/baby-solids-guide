import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // Channel attribution. The view counter stores pathnames only (no
        // query strings), so each channel gets its own path that serves the
        // landing page in place. The URL stays /reddit in the browser, the
        // beacon records it, and the page's canonical still points at "/".
        source: "/reddit",
        destination: "/",
      },
    ];
  },
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
