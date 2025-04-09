import clsx from "clsx";
import styles from "./input.module.scss";
import { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
  errorMessage?: string;
}

export const Input = ({
  isInvalid,
  errorMessage,
  className,
  ...props
}: InputProps) => {
  return (
    <div className={clsx(styles["input-container"])}>
      <input
        className={clsx(
          styles.input,
          className && className,
          isInvalid && styles["error-border"],
        )}
        {...props}
      />
      {isInvalid && <span className={styles["error"]}>{errorMessage}</span>}
    </div>
  );
};
