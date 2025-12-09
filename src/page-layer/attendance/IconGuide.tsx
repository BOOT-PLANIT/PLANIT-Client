"use client";

import styles from "./IconGuide.module.scss";

interface IconGuideItem {
  icon: React.ReactNode;
  label: string;
}

interface IconGuideProps {
  items: IconGuideItem[];
}

const IconGuide = ({ items }: IconGuideProps) => {
  return (
    <div className={styles.iconGuide}>
      {items.map((item, index) => (
        <div key={index} className={styles.item}>
          <div className={styles.icon}>{item.icon}</div>
          <span className={styles.label}>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default IconGuide;
