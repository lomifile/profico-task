import { LoginForm } from "@app/forms/login-form";
import styles from "./page.module.scss";

export default function LoginPage() {
  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-title"]}>
        <h1>Login</h1>
      </div>
      <div className={styles["login-form-container"]}>
        <LoginForm />
      </div>
    </div>
  );
}
