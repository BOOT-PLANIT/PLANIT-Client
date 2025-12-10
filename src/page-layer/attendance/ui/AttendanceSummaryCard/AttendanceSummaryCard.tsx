"use client";

import { Card } from "@/shared/ui";
import type { AttendanceStatus } from "@/shared/ui/Calendar";

import styles from "./AttendanceSummaryCard.module.scss";

interface AttendanceSummaryItem {
  status: AttendanceStatus;
  label: string;
  count: number;
  icon: React.ReactNode;
}

interface AttendanceSummaryCardProps {
  items: AttendanceSummaryItem[];
}

const AttendanceSummaryCard = ({ items }: AttendanceSummaryCardProps) => {
  return (
    <Card variant="solid" title="출석 요약">
      <div className={styles.list}>
        {items.map((item) => (
          <div key={item.status} className={styles.item}>
            <div className={styles.icon}>{item.icon}</div>
            <span className={styles.label}>{item.label}</span>
            <span className={styles.count}>{item.count}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AttendanceSummaryCard;
