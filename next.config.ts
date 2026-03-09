import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required to run transformers.js client-side without webpack errors
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "onnxruntime-node": false,
    }
    return config;
  },
};

export default nextConfig;
