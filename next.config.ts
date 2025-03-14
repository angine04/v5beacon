import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['key.npu5v5.cn'], // 允许从 Authentik 服务器加载头像
  },
};

export default nextConfig;
