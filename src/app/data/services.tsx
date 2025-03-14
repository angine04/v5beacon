import React from 'react';
import Image from 'next/image';

// 服务项类型定义
export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  url: string;
  enabled: boolean;
}

// 服务列表数据
export const services: ServiceItem[] = [
  {
    title: "Aide",
    description: "AI助手",
    icon: (
      <Image 
        src="/service-logos/aide.png" 
        alt="v5Aide Logo" 
        width={48} 
        height={48}
        className="object-contain"
      />
    ),
    url: "https://aide.npu5v5.cn",
    enabled: true,
  },
  {
    title: "Blog",
    description: "技术博客",
    icon: (
      <Image 
        src="/service-logos/blog.png" 
        alt="v5Blog Logo" 
        width={48} 
        height={48}
        className="object-contain"
      />
    ),
    url: "https://blog.npu5v5.cn",
    enabled: true,
  },
  {
    title: "Aideapi",
    description: "AI API",
    icon: (
      <Image 
        src="/service-logos/aideapi.png" 
        alt="v5Aideapi Logo" 
        width={48} 
        height={48}
        className="object-contain"
      />
    ),
    url: "https://api.aide.npu5v5.cn",
    enabled: true,
  },
  {
    title: "Cloud",
    description: "云存储",
    icon: (
      <Image 
        src="/service-logos/cloud.png" 
        alt="v5Cloud Logo" 
        width={48} 
        height={48}
        className="object-contain"
      />
    ),
    url: "https://cloud.npu5v5.cn",
    enabled: true,
  },
  {
    title: "Git",
    description: "版本管理",
    icon: (
      <Image 
        src="/service-logos/git.png" 
        alt="v5Git Logo" 
        width={48} 
        height={48}
        className="object-contain"
      />
    ),
    url: "https://git.npu5v5.cn",
    enabled: true,
  },
  {
    title: "Key",
    description: "身份认证",
    icon: (
      <Image 
        src="/service-logos/key.png" 
        alt="v5Key Logo" 
        width={48} 
        height={48}
        className="object-contain"
      />
    ),
    url: "https://key.npu5v5.cn",
    enabled: true,
  },
  {
    title: "Llama",
    description: "Llama接口",
    icon: (
      <Image 
        src="/service-logos/llama.png" 
        alt="v5Llama Logo" 
        width={48} 
        height={48}
        className="object-contain"
      />
    ),
    url: "https://ollama.aide.npu5v5.cn",
    enabled: false,
  },
  {
    title: "Pulse",
    description: "状态监控",
    icon: (
      <Image 
        src="/service-logos/pulse.png" 
        alt="v5Pulse Logo" 
        width={48} 
        height={48}
        className="object-contain"
      />
    ),
    url: "https://pulse.npu5v5.cn",
    enabled: true,
  },
  {
    title: "Atlas",
    description: "文档&知识库",
    icon: (
      <Image 
        src="/service-logos/atlas.png" 
        alt="Atlas Logo" 
        width={48} 
        height={48}
        className="object-contain"
      />
    ),
    url: "https://atlas.npu5v5.cn",
    enabled: true,
  },
]; 