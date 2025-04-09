import { clsx } from "clsx";
import styles from "./input-group.module.scss";
import { HTMLAttributes, ReactNode } from "react";

export interface InputGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "prefix"> {
  prefix?: ReactNode;
  suffix?: ReactNode;
}

export const InputGroup = ({
  prefix,
  suffix,
  children,
  className,
}: InputGroupProps) => {
  return (
    <div className={clsx(styles["input-group"], className && className)}>
      {prefix && prefix}
      {children}
      {suffix && suffix}
    </div>
  );
};
