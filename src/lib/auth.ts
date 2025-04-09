import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import { credentialsProvider } from "./credentials-provider";

export const { handlers, auth, signOut, signIn } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [credentialsProvider],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: async () => {
      return true;
    },
    async session({ session }) {
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
