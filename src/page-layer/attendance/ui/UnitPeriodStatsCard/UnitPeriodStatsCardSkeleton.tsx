"use client";

import { Card, Skeleton } from "@/shared/ui";

import { CARD_TITLES } from "../../../../entities/attendance/model/constants";

import styles from "./UnitPeriodStatsCardSkeleton.module.scss";

const UnitPeriodStatsCardSkeleton = () => {
  return (
    <Card title={CARD_TITLES.PERIOD_STATS}>
      <div className={styles.container}>
        <div className={styles.chartBox}>
          <Skeleton
            width={150}
            height={150}
            borderRadius="var(--radius-full)"
          />
        </div>
        <div className={styles.legend}>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className={styles.legendItem}>
              <Skeleton
                width={12}
                height={12}
                borderRadius="var(--radius-full)"
              />
              <Skeleton width={60} height={16} />
              <Skeleton width={30} height={16} />
              <Skeleton width={40} height={16} />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default UnitPeriodStatsCardSkeleton;
