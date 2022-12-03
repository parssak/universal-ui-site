/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  experimental: {
    appDir: true
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en"
  },
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "/docs/getting-started",
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
