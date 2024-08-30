/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/**", // Path yang lebih spesifik sesuai dengan pola URL Firebase Storage
      },
    ],
  },
};

export default nextConfig;
