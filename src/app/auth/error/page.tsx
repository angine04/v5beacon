"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages: Record<string, string> = {
    Configuration: "服务器配置错误。",
    AccessDenied: "您没有访问此资源的权限。",
    Verification: "登录链接已过期或已被使用。",
    Default: "发生未知错误。",
  };

  const errorMessage = error && errorMessages[error] ? errorMessages[error] : errorMessages.Default;

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-destructive">认证错误</CardTitle>
        <CardDescription className="mt-2">
          在处理您的请求时遇到了问题
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
          <p>{errorMessage}</p>
          <p className="mt-2">错误代码: {error || "未知"}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button asChild>
          <Link href="/auth/signin">返回登录</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <Suspense fallback={
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">加载中...</CardTitle>
          </CardHeader>
        </Card>
      }>
        <ErrorContent />
      </Suspense>
    </div>
  );
} 