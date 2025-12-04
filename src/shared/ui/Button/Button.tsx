import React from "react";

import styles from "./Button.module.scss";

type ButtonVariant = "primary" | "secondary" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  width?: number | string;
  height?: number | string;
  children: React.ReactNode;
}

const Button = ({
  variant = "primary",
  width = "100%",
  height,
  children,
  className,
  style,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className || ""}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
