import { SearchBar } from "@app/components/search-bar/search-bar";
import styles from "./page.module.scss";
import { CardDisplay } from "@app/components/card-display/card-display";

export default function Home() {
  return (
    <div className={styles["home-container"]}>
      <SearchBar />
      <div className={styles["home-content"]}>
        <CardDisplay />
      </div>
    </div>
  );
}
