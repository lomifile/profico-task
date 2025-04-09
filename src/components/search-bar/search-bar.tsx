import { SearchIcon } from "lucide-react";
import styles from "./search-bar.module.scss";
import { InputGroup } from "@app/ui/input-group/input-group";

export const SearchBar = () => {
  return (
    <InputGroup
      prefix={<SearchIcon className={styles["search-bar-icon"]} />}
      className={styles["search-bar"]}
    >
      <input placeholder="Search news" className={styles["search-bar-input"]} />
    </InputGroup>
  );
};
