import { NextAuthOptions } from "next-auth";
import type { OAuthConfig } from "next-auth/providers/oauth";

// 定义用户资料类型
interface AuthProfile {
  sub: string;
  name: string;
  email: string;
  picture?: string;
}

// 配置 NextAuth 选项
export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "authentik",
      name: "Authentik",
      type: "oauth",
      wellKnown: process.env.AUTHENTIK_ISSUER + "/.well-known/openid-configuration",
      authorization: { params: { scope: "openid email profile" } },
      clientId: process.env.AUTHENTIK_CLIENT_ID,
      clientSecret: process.env.AUTHENTIK_CLIENT_SECRET,
      idToken: true,
      profile(profile: AuthProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    } as OAuthConfig<AuthProfile>,
  ],
  callbacks: {
    async jwt({ token, account }) {
      // 保存访问令牌和刷新令牌到JWT
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }
      return token;
    },
    async session({ session, token }) {
      // 将令牌信息添加到会话中
      session.accessToken = token.accessToken;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // 处理重定向
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}; 