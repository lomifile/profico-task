import { Spinner } from "@app/ui/custom-icons/spinner";
import styles from "./loading.module.scss";

export const Loading = () => {
  return (
    <div className={styles["loading"]}>
      <Spinner className={styles["spinner"]} />
    </div>
  );
};
