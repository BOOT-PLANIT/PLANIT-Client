"use client";

import { Card, Skeleton } from "@/shared/ui";

import styles from "./CalendarSkeleton.module.scss";

const CalendarSkeleton = () => {
  return (
    <Card variant="solid" width="100%">
      <div className={styles.container}>
        <Skeleton width="100%" height={400} borderRadius="var(--radius-12)" />
      </div>
    </Card>
  );
};

export default CalendarSkeleton;
