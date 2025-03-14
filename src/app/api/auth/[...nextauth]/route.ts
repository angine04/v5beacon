import NextAuth from "next-auth";
import { authOptions } from "../options";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 