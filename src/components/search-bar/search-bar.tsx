"use client";
import { SearchIcon, X } from "lucide-react";
import styles from "./search-bar.module.scss";
import { InputGroup } from "@app/ui/input-group/input-group";
import { Button } from "@app/ui/button/button";
import { useSearchParams, useRouter } from "next/navigation";

export interface SearchBarProps {
  includeButton?: boolean;
}

export const SearchBar = ({ includeButton = false }: SearchBarProps) => {
  const queryParams = useSearchParams();
  const router = useRouter();
  const filter = queryParams.get("title");
  const redirectSearchParams = new URLSearchParams(queryParams);

  return (
    <InputGroup
      prefix={<SearchIcon className={styles["search-bar-icon"]} />}
      className={styles["search-bar"]}
    >
      <input
        placeholder="Search news"
        className={styles["search-bar-input"]}
        onChange={(e) => {
          redirectSearchParams.delete("title");
          redirectSearchParams.append("title", e.target.value);
          if (includeButton) return;
          router.push(`?${redirectSearchParams.toString()}`);
        }}
      />
      {filter && (
        <button
          className={styles.clear}
          onClick={() => {
            redirectSearchParams.delete("title");
            router.push(`?${redirectSearchParams.toString()}`);
          }}
        >
          <X />
        </button>
      )}
      {includeButton && (
        <Button
          className={styles["search-button"]}
          onClick={() => {
            router.push(`?${redirectSearchParams.toString()}`);
          }}
        >
          Search
        </Button>
      )}
    </InputGroup>
  );
};
