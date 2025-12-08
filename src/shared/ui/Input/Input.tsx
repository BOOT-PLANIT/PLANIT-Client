"use client";

import React, { forwardRef } from "react";

import styles from "./Input.module.scss";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  width?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      errorMessage,
      width = "100%",
      className = "",
      ...props
    }: InputProps,
    ref,
  ) => {
    return (
      <div className={`${styles.wrapper}`}>
        {label && <label className={styles.label}>{label}</label>}

        <input
          ref={ref}
          className={`${styles.input} ${className} ${errorMessage ? styles.error : ""}`}
          style={{ width }}
          {...props}
        />

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
