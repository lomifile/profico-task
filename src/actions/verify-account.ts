"use server";

import { db } from "@app/lib/db";
import { users } from "@app/lib/schema";
import { tryCatch } from "@app/utils/tryCatch";
import { eq } from "drizzle-orm";

export async function verifyAccount(token: string) {
  const getUserAndVerifyToken = async () => {
    console.log(token);
    const user = await db.query.users.findFirst({
      where: eq(users.verification_token, token),
    });

    if (!user) throw new Error("Token invalid!");

    const update = await db
      .update(users)
      .set({
        verification_token: null,
        emailVerified: new Date(),
      })
      .returning();

    if (update.length === 0) throw new Error("Cannot verify user!");
    return update;
  };

  return await tryCatch(getUserAndVerifyToken());
}
