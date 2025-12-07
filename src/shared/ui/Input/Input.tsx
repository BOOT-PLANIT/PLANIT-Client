"use client";

import React, { forwardRef } from "react";

import styles from "./Input.module.scss";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      wrapperClassName = "",
      className = "",
      ...props
    }: InputProps,
    ref,
  ) => {
    return (
      <div className={`${styles.wrapper} ${wrapperClassName}`}>
        {label && <label className={styles.label}>{label}</label>}

        <input
          ref={ref}
          className={`${styles.input} ${className} ${error ? styles.error : ""}`}
          {...props}
        />

        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
