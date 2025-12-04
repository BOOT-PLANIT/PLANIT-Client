import React from "react";

import styles from "./Button.module.scss";

type ButtonVariant = "primary" | "secondary" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  width?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Button = ({
  variant = "primary",
  width = "100%",
  icon,
  children,
  className,
  style,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className || ""}`}
      style={{
        width,
        ...style,
      }}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
