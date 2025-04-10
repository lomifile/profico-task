import { Articles } from "@app/types/model/news";
import styles from "./latest-item.module.scss";

export interface LatestItemProps {
  data: Articles;
}

export const LatestItem = ({ data }: LatestItemProps) => {
  return (
    <li className={styles["latest-item"]}>
      <span className={styles.time}>{data.publishedAt.substring(11, 16)}</span>
      <span className={styles.title}>{data.title}</span>
      <div className={styles.separator}></div>
    </li>
  );
};
