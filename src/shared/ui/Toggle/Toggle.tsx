"use client";

import styles from "./Toggle.module.scss";

export interface ToggleOption<T extends string> {
  value: T;
  label: string;
}

interface ToggleProps<T extends string> {
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

const Toggle = <T extends string>({
  options,
  value,
  onChange,
  className,
}: ToggleProps<T>) => {
  return (
    <div className={`${styles.toggle} ${className || ""}`}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`${styles.button} ${
            value === option.value ? styles.active : ""
          }`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default Toggle;
