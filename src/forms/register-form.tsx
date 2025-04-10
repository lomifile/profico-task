"use client";

import { useActionErrors } from "@app/hooks/use-action-errors";
import styles from "./register-form.module.scss";
import { handleRegister } from "@app/actions/register";
import { Button } from "@app/ui/button/button";
import { Input } from "@app/ui/input/input";
import { useActionState } from "react";
import Link from "next/link";

export const RegisterForm = () => {
  const [state, formAction, pending] = useActionState(handleRegister, {
    errors: {},
  });
  const { setFieldError } = useActionErrors(state);

  const fieldErrors = state?.errors.fieldErrors || {};
  const formErrors = state?.errors?.formErrors;

  return (
    <>
      <div>
        {formErrors?.map((error, index) => (
          <div key={`form-error-${index}`}>{error}</div>
        ))}
      </div>
      <form className={styles["register-form"]} action={formAction}>
        <Input
          name="first_name"
          placeholder="First name"
          type="text"
          isInvalid={!!fieldErrors.first_name}
          onChange={() => setFieldError("first_name")}
          errorMessage={fieldErrors.first_name}
        />
        <Input
          name="last_name"
          placeholder="Last name"
          type="text"
          isInvalid={!!fieldErrors.last_name}
          onChange={() => setFieldError("last_name")}
          errorMessage={fieldErrors.last_name}
        />
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
        <Input
          name="confirm"
          placeholder="Confirm password"
          type="password"
          isInvalid={!!fieldErrors.confirm}
          onChange={() => setFieldError("confirm")}
          errorMessage={fieldErrors.confirm}
        />
        <div className={styles["user"]}>
          Already user? Login&nbsp;
          <Link href="/login">here</Link>
        </div>
        <Button type="submit" isLoading={pending}>
          Submit
        </Button>
      </form>
    </>
  );
};
