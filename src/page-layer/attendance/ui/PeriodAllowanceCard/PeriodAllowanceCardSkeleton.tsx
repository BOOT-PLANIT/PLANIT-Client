"use client";

import { Card, Skeleton } from "@/shared/ui";

import { CARD_TITLES } from "../../constants";

import styles from "./PeriodAllowanceCard.module.scss";

const PeriodAllowanceCardSkeleton = () => {
  return (
    <Card variant="solid" title={CARD_TITLES.PERIOD_ALLOWANCE}>
      <div className={styles.container}>
        <Skeleton width="80%" height={48} borderRadius="var(--radius-4)" />
        <Skeleton width="60%" height={20} borderRadius="var(--radius-4)" />
      </div>
    </Card>
  );
};

export default PeriodAllowanceCardSkeleton;
