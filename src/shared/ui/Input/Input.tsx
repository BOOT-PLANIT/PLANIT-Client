"use client";

import React, { forwardRef, useId } from "react";

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
      id,
      ...props
    }: InputProps,
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className={`${styles.wrapper}`}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}

        <div
          className={`${styles.inputContainer} ${errorMessage ? styles.error : ""}`}
          style={{ width }}
        >
          {icon && (
            <div className={styles.icon} aria-hidden="true">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`${styles.input} ${className} ${icon ? styles.withIcon : ""}`}
            aria-invalid={errorMessage ? true : undefined}
            aria-describedby={errorMessage ? errorId : undefined}
            {...props}
          />
        </div>

        {errorMessage && (
          <p id={errorId} className={styles.errorMessage} role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
