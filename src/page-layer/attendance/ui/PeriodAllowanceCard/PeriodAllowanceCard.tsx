"use client";

import { Card } from "@/shared/ui";

import styles from "./PeriodAllowanceCard.module.scss";

interface PeriodAllowanceCardProps {
  amount: number;
  dateRange: string;
}

const PeriodAllowanceCard = ({
  amount,
  dateRange,
}: PeriodAllowanceCardProps) => {
  const formattedAmount = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(amount);

  return (
    <Card variant="solid" title="기간 수당">
      <div className={styles.container}>
        <div className={styles.amount}>{formattedAmount}</div>
        <div className={styles.dateRange}>~ {dateRange}</div>
      </div>
    </Card>
  );
};

export default PeriodAllowanceCard;
