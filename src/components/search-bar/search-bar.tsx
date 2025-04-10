import { SearchIcon } from "lucide-react";
import styles from "./search-bar.module.scss";
import { InputGroup } from "@app/ui/input-group/input-group";
import { Button } from "@app/ui/button/button";

export interface SearchBarProps {
  includeButton?: boolean;
}

export const SearchBar = ({ includeButton = false }: SearchBarProps) => {
  return (
    <InputGroup
      prefix={<SearchIcon className={styles["search-bar-icon"]} />}
      className={styles["search-bar"]}
    >
      <input placeholder="Search news" className={styles["search-bar-input"]} />
      {includeButton && (
        <Button className={styles["search-button"]}>Search</Button>
      )}
    </InputGroup>
  );
};
