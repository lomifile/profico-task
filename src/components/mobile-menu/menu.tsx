"use client";
import styles from "./menu.module.scss";
import { MenuButton } from "@app/ui/button/menu-button";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { menuItems } from "./menu-items";
import { useSession } from "next-auth/react";
import { Loading } from "../loading/loading";

export const Menu = () => {
  const { status } = useSession();
  const queryParams = useSearchParams();
  const param = queryParams.get("q");
  const router = useRouter();
  const redirectSearchParams = new URLSearchParams(queryParams);
  if (!queryParams.get("q")) redirect("/?q=featured");

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className={styles["menu"]}>
      {menuItems.map((item, idx) => (
        <MenuButton
          title={item.title}
          icon={item.icon}
          text={item.title}
          key={idx}
          active={item.route === param}
          onClick={() => {
            redirectSearchParams.delete("q");
            redirectSearchParams.append("q", item.route);
            router.push(`?${redirectSearchParams.toString()}`);
          }}
        />
      ))}
    </div>
  );
};
