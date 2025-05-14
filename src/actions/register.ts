"use server";

import bcrypt from "bcryptjs";
import { registerSchema } from "@app/schema/register-schema";
import { ActionResult } from "@app/types/action-result";
import { formatError, getErrorsForField } from "@app/utils/format-error";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@app/lib/db";
import { users } from "@app/lib/schema";
import { eq } from "drizzle-orm";
import { buildEmail, sendEmail } from "@app/utils/email";
import { randomBytes, randomUUID } from "crypto";
import { tryCatch } from "@app/utils/tryCatch";

export async function handleRegister(
  _prevState: ActionResult,
  formData: FormData,
) {
  const data = Object.fromEntries(formData.entries());
  const token = randomBytes(10).toString("hex");

  const validate = await registerSchema.safeParseAsync(data);
  if (!validate.success)
    return {
      errors: formatError(validate.error),
    };

  const { first_name, last_name, email, password, confirm } = validate.data;
  if (password !== confirm)
    return {
      errors: getErrorsForField("confirm", "Passwords do not match"),
    };

  const createUser = async () => {
    const exists = await db.select().from(users).where(eq(users.email, email));
    if (exists.length > 0)
      return {
        errors: getErrorsForField(
          "email",
          "User already exists with this email",
        ),
      };

    const randomHash = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, randomHash);
    const user = await db
      .insert(users)
      .values({
        first_name,
        last_name,
        email,
        emailVerified: null,
        hash,
        uid: randomUUID(),
        verification_token: token,
      })
      .execute();

    if (!user) throw new Error("User failed to register");
    return user;
  };

  const { error } = await tryCatch(createUser());

  if (error)
    return {
      errors: formatError(error),
    };

  sendEmail({
    from: "Team<no-reply@someamazingapp.com>",
    to: email,
    subject: "Verify account",
    html: await buildEmail(first_name, token),
  });

  const path = "/login";
  revalidatePath(path);
  redirect(path);
}
