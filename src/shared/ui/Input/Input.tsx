"use client";

import React, { forwardRef } from "react";

import styles from "./Input.module.scss";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  width?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      errorMessage,
      width = "100%",
      className = "",
      icon,
      ...props
    }: InputProps,
    ref,
  ) => {
    return (
      <div className={`${styles.wrapper}`}>
        {label && <label className={styles.label}>{label}</label>}

        <div
          className={`${styles.inputContainer} ${errorMessage ? styles.error : ""}`}
          style={{ width }}
        >
          {icon && <div className={styles.icon}>{icon}</div>}
          <input
            ref={ref}
            className={`${styles.input} ${className} ${icon ? styles.withIcon : ""}`}
            {...props}
          />
        </div>

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
