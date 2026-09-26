import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/agroharvest-os",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
