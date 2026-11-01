import type { NextConfig } from "next";

const PRIMARY = "https://www.sastech.com.ng";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Canonical host: apex and the old Vercel URL go to www (301).
      {
        source: "/:path*",
        has: [{ type: "host", value: "sastech.com.ng" }],
        destination: `${PRIMARY}/:path*`,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "sastech-website.vercel.app" }],
        destination: `${PRIMARY}/:path*`,
        permanent: true,
      },
      // Old site URLs, kept alive for anyone who bookmarked or indexed them.
      { source: "/services/web", destination: "/services/websites-seo", permanent: true },
      { source: "/services/ai", destination: "/services/ai-automation", permanent: true },
      { source: "/services/automation", destination: "/services/ai-automation", permanent: true },
      { source: "/services/dashboards", destination: "/services/operations-tools", permanent: true },
      { source: "/services/ecommerce", destination: "/services/operations-tools", permanent: true },
      { source: "/services/apps", destination: "/services", permanent: true },
      { source: "/pricing", destination: "/process#pricing", permanent: true },
      { source: "/quote", destination: "/contact", permanent: true },
      { source: "/intake", destination: "/contact", permanent: true },
      { source: "/blog", destination: "/insights", permanent: true },
      { source: "/blog/:path*", destination: "/insights", permanent: true },
      { source: "/work", destination: "/portfolio/logistics-ai-crm", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
