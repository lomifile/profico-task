"use client";
import styles from "./menu.module.scss";
import { MenuButton } from "@app/ui/button/menu-button";
import {
  HomeIcon,
  GeneralIcon,
  BusinessIcon,
  HealthIcon,
  ScienceIcon,
  SportsIcon,
  TechnologyIcon,
} from "@app/ui/custom-icons/icons";
import { redirect, useRouter, useSearchParams } from "next/navigation";

export const Menu = () => {
  const queryParams = useSearchParams();
  const param = queryParams.get("q");
  const router = useRouter();
  const redirectSearchParams = new URLSearchParams(queryParams);

  const params = useSearchParams();

  if (!params.get("q")) redirect("/?q=featured");

  const menuItems = [
    {
      icon: <HomeIcon />,
      title: "Home",
      route: "featured",
    },
    {
      title: "General",
      icon: <GeneralIcon />,
      route: "general",
    },
    {
      title: "Business",
      icon: <BusinessIcon />,
      route: "business",
    },
    {
      title: "Health",
      icon: <HealthIcon />,
      route: "health",
    },
    {
      title: "Science",
      icon: <ScienceIcon />,
      route: "science",
    },
    {
      title: "Sports",
      icon: <SportsIcon />,
      route: "sports",
    },
    {
      title: "Technology",
      icon: <TechnologyIcon />,
      route: "technology",
    },
  ];

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
