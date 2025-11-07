// next.config.js
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig = {
  images: {
    qualities: [50, 75, 85, 90, 100],
  },
  turbopack: {
    rules: {
      // support SVG as React Component
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
    ];
  },
};

export default withNextIntl(nextConfig);
