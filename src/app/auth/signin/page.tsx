"use client";

import { Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from "next/image";

function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const error = searchParams.get("error");

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Image 
            src="/service-logos/beacon.png" 
            alt="Beacon Logo" 
            width={80} 
            height={80} 
            className="object-contain"
          />
        </div>
        <CardTitle className="text-3xl font-bold">v5Beacon</CardTitle>
        <CardDescription className="mt-2">
          登录以访问 Team v5++服务
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-6 rounded-md bg-destructive/10 p-4 text-sm text-destructive">
            {error === "CredentialsSignin"
              ? "登录失败，请检查您的凭据。"
              : "登录时发生错误，请重试。"}
          </div>
        )}

        <Button
          onClick={() => signIn("authentik", { callbackUrl })}
          className="w-full"
          size="lg"
        >
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          使用 v5Key 登录
        </Button>
      </CardContent>
    </Card>
  );
}

export default function SignIn() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <Suspense fallback={
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-muted animate-pulse"></div>
            </div>
            <CardTitle className="text-3xl font-bold">加载中...</CardTitle>
          </CardHeader>
        </Card>
      }>
        <SignInContent />
      </Suspense>
    </div>
  );
} 