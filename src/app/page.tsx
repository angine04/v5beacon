"use client";

import React, { useEffect, useState } from 'react';
import { useSession, signOut } from "next-auth/react";
import ProtectedRoute from "./components/ProtectedRoute";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { services, ServiceItem } from "./data/services";

// 用户类型定义
interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

// 获取时间问候语
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12 && hour >= 6) return "早上好";
  if (hour < 18 && hour >= 12) return "下午好";
  if (hour < 6 && hour >= 0) return "夜深了";
  return "晚上好";
}

// 服务卡片组件
function ServiceCard({ title, description, icon, url }: ServiceItem) {
  return (
    <Link href={url} className="block">
      <div className="flex flex-col h-full rounded-2xl bg-card hover:bg-muted/20 transition-all">
        <div className="flex-1 flex flex-col items-center pt-6 px-4 pb-2">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
            {typeof icon === 'string' ? (
              <span className="text-2xl">{icon}</span>
            ) : (
              icon
            )}
          </div>
        </div>
        <div className="px-4 pb-6 text-center">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  );
}

// 用户菜单组件
function UserMenu({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || ""} alt={user.name || ""} />
            <AvatarFallback>{(user.name || "User")[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="flex items-center gap-2">
          <span>{user.name || user.email}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/auth/signin" })}>
          退出登录
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// 主页组件
export default function Home() {
  const { data: session } = useSession();
  const [greeting, setGreeting] = useState("你好");
  
  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-background">
        {/* 用户菜单 - 固定在右上角 */}
        <div className="fixed top-6 right-6 sm:top-10 sm:right-10 lg:top-12 lg:right-16 z-50">
          {session?.user && <UserMenu user={session.user} />}
        </div>

        {/* 移除在手机上限制滚动的类，只在md及以上应用 */}
        <div className="flex-grow flex flex-col md:flex-row md:h-screen md:overflow-hidden">
          {/* 左侧面板 - 在桌面视图下固定不滚动 */}
          <div className="md:w-1/2 lg:w-2/5 xl:w-1/3 flex flex-col bg-card/50 md:h-screen md:overflow-hidden">
            {/* 标题区域 */}
            <div className="py-6 pl-10 pr-6 sm:py-10 sm:pl-16 sm:pr-10 lg:py-12 lg:pl-20 lg:pr-12">
              <div className="flex items-center gap-3">
                <Image 
                  src="/service-logos/beacon.png" 
                  alt="Beacon Logo" 
                  width={42} 
                  height={42} 
                  className="object-contain"
                />
                <h1 className="text-2xl font-bold text-primary">Beacon</h1>
              </div>
            </div>
            
            {/* 问候区域 */}
            <div className="flex-grow flex flex-col pt-[10vh] md:pt-[20vh] pl-10 pr-6 sm:pl-16 sm:pr-10 lg:pl-20 lg:pr-12 mb-16">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-2 md:mb-3 lg:mb-4">
                {session?.user?.name || '同学'}
              </h3>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
                {greeting}
              </h2>
              <div className="mt-6 md:mt-8 lg:mt-10">
                <div className="text-muted-foreground text-lg md:text-base">
                  {new Date().toLocaleDateString('zh-CN', { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit',
                    weekday: 'long'
                  })}
                </div>
              </div>
            </div>

            {/* 页脚 - 在桌面端显示在左侧面板底部 */}
            <div className="hidden md:block py-6 pl-10 pr-6 sm:py-10 sm:pl-16 sm:pr-10 lg:py-12 lg:pl-20 lg:pr-12">
              {/* 团队logo */}
              <div className="flex items-center mb-4">
                <Image 
                  src="/logo.png" 
                  alt="v5++ Team Logo" 
                  width={48} 
                  height={48} 
                  className="object-contain mr-2"
                />
                {/* <span className="text-sm font-medium text-muted-foreground">v5++ 团队</span> */}
              </div>
              <p className="text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} v5++ 团队. 保留所有权利.
              </p>
            </div>
          </div>
          
          {/* 右侧服务卡片区域 - 确保内容完整显示且不被裁剪 */}
          <div className="md:w-1/2 lg:w-3/5 xl:w-2/3 p-6 md:pt-16 md:pb-16 md:px-10 md:h-screen md:overflow-y-auto flex">
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 my-auto">
              {services.filter(service => service.enabled).map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </div>

        {/* 页脚 - 在移动端显示在底部 */}
        <div className="md:hidden py-6 px-6 sm:px-10">
          {/* 团队logo - 移动端 */}
          <div className="flex items-center justify-center mb-6">
            <Image 
              src="/logo.png" 
              alt="v5++ Team Logo" 
              width={48} 
              height={48} 
              className="object-contain mr-2"
            />
            {/* <span className="text-sm font-medium text-muted-foreground">v5++ 团队</span> */}
          </div>
          <p className="text-xs text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} v5++ 团队. 保留所有权利.
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
