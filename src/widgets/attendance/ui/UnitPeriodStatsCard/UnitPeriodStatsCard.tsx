"use client";

import { Card } from "@/shared/ui";

import styles from "./UnitPeriodStatsCard.module.scss";

interface UnitPeriodStatsCardProps {
  totalAttendance: number;
  totalAbsent: number;
  totalUnrecorded: number;
  totalDays: number;
}

const UnitPeriodStatsCard = ({
  totalAttendance,
  totalAbsent,
  totalUnrecorded,
  totalDays,
}: UnitPeriodStatsCardProps) => {
  const attendancePercent =
    totalDays > 0 ? (totalAttendance / totalDays) * 100 : 0;
  const absentPercent = totalDays > 0 ? (totalAbsent / totalDays) * 100 : 0;
  const unrecordedPercent =
    totalDays > 0 ? (totalUnrecorded / totalDays) * 100 : 0;

  const circumference = 2 * Math.PI * 40;
  const attendanceOffset =
    circumference - (attendancePercent / 100) * circumference;

  return (
    <Card variant="solid" title="기간 통계">
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.chart}>
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="40"
                fill="none"
                stroke="var(--color-grey-light-intense)"
                strokeWidth="12"
              />
              <circle
                cx="60"
                cy="60"
                r="40"
                fill="none"
                stroke="var(--color-attendance-present)"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={attendanceOffset}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
            </svg>
          </div>
          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <div className={styles.legendText}>
                <div className={styles.labelRow}>
                  <div className={`${styles.legendDot} ${styles.attendance}`} />
                  <span>총출석</span>
                </div>
                <span className={styles.percent}>
                  {totalAttendance} ({attendancePercent.toFixed(0)}%)
                </span>
              </div>
            </div>
            <div className={styles.legendItem}>
              <div className={styles.legendText}>
                <div className={styles.labelRow}>
                  <div className={`${styles.legendDot} ${styles.absent}`} />
                  <span>총결석</span>
                </div>
                <span className={styles.percent}>
                  {totalAbsent} ({absentPercent.toFixed(0)}%)
                </span>
              </div>
            </div>
            <div className={styles.legendItem}>
              <div className={styles.legendText}>
                <div className={styles.labelRow}>
                  <div className={`${styles.legendDot} ${styles.unrecorded}`} />
                  <span>미출결</span>
                </div>
                <span className={styles.percent}>
                  {totalUnrecorded} ({unrecordedPercent.toFixed(0)}%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UnitPeriodStatsCard;
