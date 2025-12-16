"use client";

import { LeaveIcon } from "@/shared/assets/icons";
import { Combobox } from "@/shared/ui";
import { formatDate } from "@/shared/utils";

import styles from "./BootcampInfo.module.scss";

interface BootcampOption {
  value: string;
  label: string;
}

interface DateRange {
  startedAt: Date;
  endedAt: Date;
  sessionCount?: number;
}

interface BootcampInfoProps {
  options: BootcampOption[];
  selectedIndex: number;
  onIndexChange: (index: number) => void;
  dateRange: DateRange | null;
}

export const BootcampInfo = ({
  options,
  selectedIndex,
  onIndexChange,
  dateRange,
}: BootcampInfoProps) => {
  const displayText = dateRange
    ? (() => {
        const startStr = formatDate(dateRange.startedAt);
        const endStr = formatDate(dateRange.endedAt);
        const sessionCount = dateRange.sessionCount
          ? ` (${dateRange.sessionCount}일)`
          : "";

        return `${startStr} - ${endStr}${sessionCount}`;
      })()
    : "기간 정보 없음";

  return (
    <div className={styles.bootcampInfo}>
      <Combobox
        options={options}
        value={selectedIndex}
        onChange={onIndexChange}
      />
      <div className={styles.currentUnit}>
        <LeaveIcon
          width={16}
          height={16}
          color="currentColor"
          className={styles.calendarIcon}
        />
        <span>{displayText}</span>
      </div>
    </div>
  );
};
