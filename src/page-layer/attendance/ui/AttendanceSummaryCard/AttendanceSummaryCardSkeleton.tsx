"use client";

import { Card, Skeleton } from "@/shared/ui";

import { CARD_TITLES } from "../../constants";

import styles from "./AttendanceSummaryCard.module.scss";

const AttendanceSummaryCardSkeleton = () => {
  return (
    <Card variant="solid" title={CARD_TITLES.ATTENDANCE_SUMMARY}>
      <div className={styles.list}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className={styles.item}>
            <Skeleton width={24} height={24} borderRadius="var(--radius-4)" />
            <Skeleton width={60} height={20} />
            <Skeleton width={40} height={20} />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AttendanceSummaryCardSkeleton;
