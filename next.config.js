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
  images: {
    domains: ["lh3.googleusercontent.com", "res.cloudinary.com"],
  },
};
export default nextConfig;
