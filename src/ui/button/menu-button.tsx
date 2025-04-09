import clsx from "clsx";
import styles from "./menu-button.module.scss";
import { ButtonHTMLAttributes, ReactNode } from "react";

export interface MenuButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  icon: ReactNode;
  text: string;
  active?: boolean;
}

export const MenuButton = ({
  icon,
  text,
  className,
  active,
  ...props
}: MenuButtonProps) => {
  return (
    <button
      className={clsx(
        className && className,
        styles["menu-button"],
        active && styles["menu-button-active"],
      )}
      {...props}
    >
      {icon}
      <span className={styles["menu-button-text"]}>{text}</span>
    </button>
  );
};
