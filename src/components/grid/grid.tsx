import { PropsWithChildren } from "react";
import styles from "./grid.module.scss";

export const CardGrid = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles["desktop-cards"]}>
      <div className={styles["grid-articles"]}>{children}</div>
    </div>
  );
};
