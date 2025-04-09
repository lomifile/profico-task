import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { users } from "./schema";
import { loginSchema } from "@app/schema/login-schema";
import { omit } from "@app/utils/common";

async function getUserFromDb(email: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  return user;
}

export const credentialsProvider = CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: { label: "email", type: "email", placeholder: "jsmith" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    const result = await loginSchema.safeParseAsync(credentials);
    if (!result.success) {
      throw new Error("Invalid email or password");
    }

    const { email, password } = result.data;
    const user = await getUserFromDb(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    if (!user.emailVerified) throw new Error("Account not verified");

    if (!user.hash) throw new Error("There was an unexpected error");
    const isValid = await bcrypt.compare(password, user.hash);
    if (!isValid) throw new Error("Invalid email or password");

    return omit(user, ["hash", "verification_token", "uid"]);
  },
});
