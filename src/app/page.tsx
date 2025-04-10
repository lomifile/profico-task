import styles from "./page.module.scss";
import { CardDisplay } from "@app/components/card-display/card-display";
import { Logo } from "@app/components/logo/logo";
import { Menu } from "@app/components/menu/menu";
import { SearchBar } from "@app/components/search-bar/search-bar";
import { Separator } from "radix-ui";

export default function Home() {
  return (
    <div className={styles["home-container"]}>
      <div className={styles["home-data-container"]}>
        <div className={styles["search-bar"]}>
          <Logo lg />
          <SearchBar includeButton />
        </div>
        <Separator.Root className={styles.separator} />
        <div className={styles["home-content"]}>
          <div className={styles["menu-container"]}>
            <Menu />
          </div>
          <CardDisplay />
        </div>
      </div>
    </div>
  );
}
