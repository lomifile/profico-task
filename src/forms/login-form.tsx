"use client";

import styles from "./login-form.module.scss";
import { Button } from "@app/ui/button/button";
import { loginAction } from "@app/actions/login";
import { Input } from "@app/ui/input/input";
import { useActionState } from "react";
import { useActionErrors } from "@app/hooks/use-action-errors";
import Link from "next/link";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, {
    errors: undefined,
  });
  const { errors, setFieldError } = useActionErrors(state);

  const fieldErrors = errors?.fieldErrors || {};
  const formErrors = errors?.formErrors;

  return (
    <>
      <div>
        {formErrors?.map((error, index) => (
          <div key={`form-error-${index}`}>{error}</div>
        ))}
      </div>
      <form className={styles["login-form"]} action={formAction}>
        <Input
          name="email"
          placeholder="Email"
          type="email"
          isInvalid={!!fieldErrors.email}
          onChange={() => setFieldError("email")}
          errorMessage={fieldErrors.email}
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          isInvalid={!!fieldErrors.password}
          onChange={() => setFieldError("password")}
          errorMessage={fieldErrors.password}
        />
        <div className={styles["not-user"]}>
          Don&apos;t have account? Register&nbsp;
          <Link href="/register">here</Link>
        </div>
        <div className={styles["login-button"]}>
          <Button type="submit" isLoading={pending}>
            Login
          </Button>
        </div>
      </form>
    </>
  );
}
