import styles from "./layout.module.scss";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <section className={styles.section}>
      <main className={styles.main}>{children}</main>
    </section>
  );
}
