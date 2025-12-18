"use client";

import { useState } from "react";

import { attendanceOptions } from "@/page-layer/attendance/model";
import { Card, OptionButton } from "@/shared/ui";
import type { CalendarAttendanceStatus } from "@/shared/ui/Calendar";

import styles from "./TodaysAttendanceCard.module.scss";

const TodaysAttendanceCard = () => {
  const [selectedStatus, setSelectedStatus] = useState<
    CalendarAttendanceStatus | "clear"
  >(attendanceOptions[0].value);
  return (
    <Card title="오늘의 출석">
      <span className={styles.guide}>오늘의 출결을 선택해주세요</span>
      <div className={styles.container}>
        {attendanceOptions.map((option) => (
          <OptionButton
            key={option.value}
            value={option.value}
            label={option.label}
            icon={option.icon}
            checked={selectedStatus === option.value}
            onChange={(value) =>
              setSelectedStatus(value as CalendarAttendanceStatus | "clear")
            }
            name="attendanceStatus"
          />
        ))}
      </div>
    </Card>
  );
};

export default TodaysAttendanceCard;
