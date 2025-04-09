"use server";

import bcryptjs from "bcryptjs";
import { db } from "@app/lib/db";
import { users } from "@app/lib/schema";
import { eq } from "drizzle-orm";

export async function validateUser(email: string, password: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (!user.hash) throw new Error("There was an unexpected error");
  const isValid = await bcryptjs.compare(password, user.hash);
  if (!isValid) throw new Error("Invalid email or password");

  return user;
}
