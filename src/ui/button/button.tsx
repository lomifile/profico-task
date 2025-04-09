import clsx from "clsx";
import styles from "./buttons.module.scss";
import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  color?: "primary" | "white" | "transparent";
}

export const Button = ({
  isLoading,
  className,
  children,
  color = "primary",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        styles["button-base"],
        styles[color],
        className && className
      )}
      disabled={isLoading}
      {...props}
    >
      {children}
    </button>
  );
};
