const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/assets/:path*",
        destination: "/:path*",
      },
    ];
  },
};
export default nextConfig;
