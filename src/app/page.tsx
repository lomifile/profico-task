"use client";
import styles from "./page.module.scss";
import { AuthContainer } from "@app/components/auth-container/auth-container";
import { Bookmarks } from "@app/components/bookmarks/bookmarks";
import { CardDisplay } from "@app/components/card-display/card-display";
import { Logo } from "@app/components/logo/logo";
import { Menu } from "@app/components/mobile-menu/menu";
import { SearchBar } from "@app/components/search-bar/search-bar";
import { useSearchParams } from "next/navigation";
import { Separator } from "radix-ui";

export default function Home() {
  const queryParmas = useSearchParams();
  const q = queryParmas.get("q");

  return (
    <div className={styles["home-container"]}>
      <div className={styles["home-data-container"]}>
        <div className={styles["search-bar"]}>
          <div className={styles["base-search-bar"]}>
            <Logo lg />
            <SearchBar includeButton />
          </div>
          <AuthContainer />
        </div>
        <Separator.Root className={styles.separator} />
        <div className={styles["home-content"]}>
          <div className={styles["menu-container"]}>
            <Menu />
          </div>
          {q !== "bookmarks" && <CardDisplay />}
          {q === "bookmarks" && <Bookmarks />}
        </div>
      </div>
    </div>
  );
}
