import NextAuth, {
  AuthOptions,
  Awaitable,
  DefaultSession,
  Profile,
  User,
} from "next-auth";
//import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import { createUser } from "../../database/user/create/action";
import { doesUserExist } from "../../database/user/exists/action";
import { getDatabase } from "@/internal/core";

enum ProviderType {
  Google = "google",
  Discord = "discord",
}

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      name: "Google",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    /*DiscordProvider({
        name: "Discord",
        clientId: process.env.DISCORD_CLIENT_ID!,
        clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      }),*/
  ],
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("!!!!!");
      if (account?.provider == ProviderType.Google) {
        if (!user.email) {
          return false;
        }

        if (await doesUserExist(user.email, undefined, user.name ?? undefined))
          return true;

        if (!user.email?.includes("@pinewood.edu")) return false;
        createUser(user.name ?? "", user.email);

        return true;
      }

      return false;
    },

    async jwt({ token, user, account, profile }) {
      if (user) {
        const db = getDatabase();

        // Corrected query with proper parameter usage
        const res = (
          await db<{ id: number }[]>`
            SELECT id FROM account_contest WHERE email = ${
              user.email ?? ""
            } AND name = ${user.name ?? ""};
          `
        )[0];

        if (res) {
          console.log(res.id + " <- jwt");
          return { ...token, id: res.id };
        }
      }

      return token;
    },

    async session({ session, token, user }) {
      console.log(JSON.stringify(token) + " <- token session");
      const res: { id: number; name: string; first: boolean } = (
        await getDatabase()<{ id: number; name: string; first: boolean }[]>`
        SELECT id, name, first FROM account_contest WHERE id = ${token.id};
      `
      )[0];

      console.log(JSON.stringify(res) + " <- session");

      session.user = res;

      return session;
    },
  },
};

const h = NextAuth(authOptions);

export const POST = h;
export const GET = h;
