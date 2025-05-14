"use server";

import { signIn } from "@app/lib/auth";
import { loginSchema } from "@app/schema/login-schema";
import { ActionResult } from "@app/types/action-result";
import { formatError } from "@app/utils/format-error";
import { tryCatch } from "@app/utils/tryCatch";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function loginAction(
  prevsState: ActionResult,
  formData: FormData,
) {
  const parsedFormData = Object.fromEntries(formData.entries());

  const result = await loginSchema.safeParseAsync(parsedFormData);
  if (!result.success)
    return {
      errors: formatError(result.error),
    };

  const { email, password } = result.data;

  const { error } = await tryCatch(
    signIn("credentials", {
      email,
      password,
      redirect: false,
    }),
  );

  if (error) {
    if (error instanceof AuthError) {
      return {
        errors: formatError(error),
      };
    }
    throw error;
  }

  redirect("/?q=featured&isAuth=true");
}
