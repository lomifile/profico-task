import { RegisterForm } from "@app/forms/register-form";
import styles from "./page.module.scss";

export default function LoginPage() {
  return (
    <div className={styles["register-container"]}>
      <div className={styles["register-title"]}>
        <h1>Register</h1>
      </div>
      <div className={styles["register-form-container"]}>
        <RegisterForm />
      </div>
    </div>
  );
}
