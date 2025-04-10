"use client";
import styles from "./auth-container.module.scss";
import { MenuButton } from "@app/ui/button/menu-button";
import { Spinner } from "@app/ui/custom-icons/spinner";
import { LogOut, LogIn, UserPlus } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export const AuthContainer = () => {
  const path = usePathname();
  const router = useRouter();
  const { status, data } = useSession();

  return (
    <div className={styles["auth-container"]}>
      {status === "loading" && <Spinner />}
      {status === "authenticated" && (
        <MenuButton
          text={`${data?.user?.email}`}
          icon={<LogOut />}
          onClick={() => {
            signOut({
              redirect: false,
            }).then(() => {
              router.refresh();
            });
          }}
        />
      )}
      {status === "unauthenticated" && (
        <MenuButton
          text="Login"
          icon={<LogIn />}
          active={path === "/login"}
          onClick={() => {
            router.push("/login");
          }}
        />
      )}
      {status === "unauthenticated" && (
        <MenuButton
          text="Register"
          icon={<UserPlus />}
          active={path === "/register"}
          onClick={() => {
            router.push("/register");
          }}
        />
      )}
    </div>
  );
};
