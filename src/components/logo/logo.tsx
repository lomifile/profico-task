import clsx from "clsx";
import styles from "./logo.module.scss";

export interface LogoProps {
  lg?: boolean;
}

export const Logo = ({ lg = false }: LogoProps) => {
  return (
    <div className={clsx(styles["logo-container"], lg && styles["large"])}>
      <span className={styles["first-part"]}>My</span>
      <span className={styles["last-part"]}>News</span>
    </div>
  );
};
