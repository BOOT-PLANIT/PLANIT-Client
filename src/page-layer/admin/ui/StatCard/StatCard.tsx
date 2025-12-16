import { Card } from "@/shared/ui";

import styles from "./StatCard.module.scss";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: "blue" | "green" | "purple";
}

const StatCard = ({ icon, label, value, color }: StatCardProps) => {
  return (
    <Card>
      <div className={styles.cardContainer}>
        <div className={`${styles.icon} ${styles[color]}`}>{icon}</div>
        <div className={styles.content}>
          <div className={styles.label}>{label}</div>
          <div className={styles.value}>{value}</div>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
