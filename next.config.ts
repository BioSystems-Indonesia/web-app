// next.config.js
import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // qualities: [50, 75, 85, 90, 100],
    // domains: ["biosystems.id"],
    unoptimized: true,
  },

  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  async rewrites() {
    return [
      {
        source: "/:locale/inside-our-lab.mp4",
        destination: "/inside-our-lab.mp4",
      },
      {
        source: "/:locale/logo.png",
        destination: "/logo.png",
      },
      {
        source: "/:locale/uploads/:path*",
        destination: "/uploads/:path*",
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  trailingSlash: false,
};

export default withNextIntl(nextConfig);
