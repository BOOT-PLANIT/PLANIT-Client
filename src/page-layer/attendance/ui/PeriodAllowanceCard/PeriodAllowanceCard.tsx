"use client";

import { Card } from "@/shared/ui";
import { formatCurrency } from "@/shared/utils";

import { CARD_TITLES } from "../../../../entities/attendance/model/constants";

import styles from "./PeriodAllowanceCard.module.scss";

interface PeriodAllowanceCardProps {
  amount: number;
  dateRange: string;
}

const PeriodAllowanceCard = ({
  amount,
  dateRange,
}: PeriodAllowanceCardProps) => {
  const formattedAmount = formatCurrency(amount);

  return (
    <Card title={CARD_TITLES.PERIOD_ALLOWANCE}>
      <div className={styles.container}>
        <div className={styles.amount}>{formattedAmount}</div>
        <div className={styles.dateRange}>{dateRange}</div>
      </div>
    </Card>
  );
};

export default PeriodAllowanceCard;
