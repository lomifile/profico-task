import { ChevronRight } from "lucide-react";
import { LatestNewsIcon } from "@app/ui/custom-icons/icons";
import styles from "./latest.module.scss";
import { PropsWithChildren } from "react";

export const Latest = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.latest}>
      <div className={styles["title-container"]}>
        <LatestNewsIcon />
        <h3 className={styles["title"]}>Latest news</h3>
      </div>
      <div className={styles.items}>{children}</div>
      <div className={styles["bottom-container"]}>
        <span>See all news</span>
        <ChevronRight />
      </div>
    </div>
  );
};
