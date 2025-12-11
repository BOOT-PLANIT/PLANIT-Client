"use client";

import styles from "./OptionButton.module.scss";

interface OptionButtonProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  checked: boolean;
  onChange: (value: string) => void;
  name?: string;
}

const OptionButton = ({
  value,
  label,
  icon,
  checked,
  onChange,
  name = "option",
}: OptionButtonProps) => {
  return (
    <label className={`${styles.option} ${checked ? styles.selected : ""}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className={styles.radio}
      />
      <div className={styles.icon}>{icon}</div>
      <span className={styles.label}>{label}</span>
    </label>
  );
};

export default OptionButton;
