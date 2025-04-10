import { ChevronRight } from "lucide-react";
import { LatestNewsIcon } from "@app/ui/custom-icons/icons";
import styles from "./latest.module.scss";
import { HTMLAttributes } from "react";
import clsx from "clsx";

export interface LatestProps extends HTMLAttributes<HTMLDivElement> {}

export const Latest = ({ children, className }: LatestProps) => {
  return (
    <div className={clsx(styles.latest, className && className)}>
      <div className={styles["title-container"]}>
        <LatestNewsIcon />
        <h3 className={styles["title"]}>Latest news</h3>
      </div>
      <ul className={styles.items}>{children}</ul>
      <div className={styles["bottom-container"]}>
        <span>See all news</span>
        <ChevronRight />
      </div>
    </div>
  );
};
