"use client";

import { Card } from "@/shared/ui";
import type { AttendanceStatus } from "@/shared/ui/Calendar";

import { ATTENDANCE_ICON_MAP, ATTENDANCE_STATUS_LABELS } from "../../model";

import styles from "./AttendanceSummaryCard.module.scss";

interface AttendanceSummaryCardProps {
  title: string;
  values: {
    present: number;
    late: number;
    leftEarly: number;
    leave: number;
    annual: number;
    absent: number;
  };
}

const ATTENDANCE_STATUSES: AttendanceStatus[] = [
  "present",
  "late",
  "leftEarly",
  "leave",
  "annual",
  "absent",
];

const AttendanceSummaryCard = ({
  title,
  values,
}: AttendanceSummaryCardProps) => {
  return (
    <Card variant="solid" title={title}>
      <div className={styles.list}>
        {ATTENDANCE_STATUSES.map((status) => (
          <div key={status} className={styles.item}>
            <div className={styles.icon}>{ATTENDANCE_ICON_MAP[status]}</div>
            <span className={styles.label}>
              {ATTENDANCE_STATUS_LABELS[status]}
            </span>
            <span className={styles.count}>{values[status]}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AttendanceSummaryCard;
