import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      first: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
  }
}
