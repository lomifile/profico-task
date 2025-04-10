"use client";
import styles from "./mobile-menu.module.scss";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@app/ui/drawer/drawer";
import { LogIn, LogOut, MenuIcon, UserPlus } from "lucide-react";
import { Logo } from "@app/components/logo/logo";
import { MenuButton } from "@app/ui/button/menu-button";
import {
  BusinessIcon,
  GeneralIcon,
  HealthIcon,
  HomeIcon,
  ScienceIcon,
  SportsIcon,
  TechnologyIcon,
} from "@app/ui/custom-icons/icons";
import { SearchBar } from "../search-bar/search-bar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Spinner } from "@app/ui/custom-icons/spinner";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

export const MobileMenu = () => {
  const { data, status, update } = useSession();
  const path = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const queryParams = useSearchParams();
  const param = queryParams.get("q");
  const router = useRouter();
  const redirectSearchParams = new URLSearchParams(queryParams);

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

  useEffect(() => {
    const interval = setInterval(() => update(), 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, [update]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className={styles["menu-button"]} asChild>
        <MenuIcon />
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className={styles["menu-content"]}
      >
        <div className={styles["menu-close-button-container"]}>
          <DialogClose className={styles["menu-close-button"]} />
        </div>
        <DialogTitle className={styles["menu-title"]}>
          <Logo lg />
        </DialogTitle>
        <div className={styles["menu-navigation"]}>
          <SearchBar />
          <div className={styles["navigation"]}>
            {menuItems.map(({ title, icon, route }, idx) => (
              <MenuButton
                active={param === route}
                key={`__menu_item_${idx}`}
                text={title}
                icon={icon}
                onClick={() => {
                  redirectSearchParams.delete("q");
                  redirectSearchParams.append("q", route);
                  setIsOpen(false);
                  router.push(`?${redirectSearchParams.toString()}`);
                }}
              />
            ))}
          </div>
          <div className={styles["auth-button"]}>
            {status === "loading" && <Spinner />}
            {status === "authenticated" && (
              <MenuButton
                text={`${data?.user?.email}`}
                icon={<LogOut />}
                onClick={() => {
                  signOut({
                    redirect: false,
                  }).then(() => {
                    setIsOpen(false);
                    router.refresh();
                  });
                }}
              />
            )}
            {status === "unauthenticated" && (
              <>
                <MenuButton
                  text="Login"
                  icon={<LogIn />}
                  active={path === "/login"}
                  onClick={() => {
                    router.push("/login");
                    setIsOpen(false);
                  }}
                />
                <MenuButton
                  text="Register"
                  icon={<UserPlus />}
                  active={path === "/register"}
                  onClick={() => {
                    router.push("/register");
                    setIsOpen(false);
                  }}
                />
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
