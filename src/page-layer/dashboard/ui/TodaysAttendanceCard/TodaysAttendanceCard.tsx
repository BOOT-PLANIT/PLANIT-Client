"use client";

import { useMemo } from "react";

import {
  mapApiStatusToCalendarStatus,
  mapCalendarStatusToApiStatus,
} from "@/entities/attendance/model";
import { useDailyAttendance, useUpdateAttendance } from "@/feature/attendance";
import { useMe } from "@/feature/user";
import { attendanceOptions } from "@/page-layer/attendance/model";
import type { AttendanceStatus } from "@/shared/api";
import { Button, Card } from "@/shared/ui";
import type { CalendarAttendanceStatus } from "@/shared/ui/Calendar";
import { formatDateToString } from "@/shared/utils";

import styles from "./TodaysAttendanceCard.module.scss";

interface Props {
  bootcampId?: number;
}

const TodaysAttendanceCard = ({ bootcampId }: Props) => {
  const { data: meRes } = useMe();
  const userId = meRes?.id ?? null;
  const today = formatDateToString(new Date());

  const { data: dailyRes, isLoading } = useDailyAttendance(
    userId,
    today,
    bootcampId ?? null,
  );

  const serverStatus: AttendanceStatus | null = dailyRes?.data?.status ?? null;

  const uiState = useMemo<{
    guideText: string;
    disabled: boolean;
    selectedStatus: CalendarAttendanceStatus | null;
  }>(() => {
    if (isLoading) {
      return {
        guideText: "오늘의 출결을 확인 중입니다.",
        disabled: true,
        selectedStatus: null,
      };
    }

    if (!serverStatus || serverStatus === "no_attendance") {
      return {
        guideText: "오늘의 출결을 등록해주세요.",
        disabled: false,
        selectedStatus: null,
      };
    }

    if (serverStatus === "no_session") {
      return {
        guideText: "오늘은 강의가 없습니다.",
        disabled: true,
        selectedStatus: null,
      };
    }

    const calendarStatus = mapApiStatusToCalendarStatus(serverStatus) ?? null;

    return {
      guideText: "오늘의 출결이 이미 등록되었습니다.",
      disabled: true,
      selectedStatus: calendarStatus,
    };
  }, [isLoading, serverStatus]);

  const { mutate, isPending } = useUpdateAttendance();

  const handleClick = (status: CalendarAttendanceStatus) => {
    if (!userId || !bootcampId || uiState.disabled) return;

    mutate({
      userId,
      bootcampId,
      status: mapCalendarStatusToApiStatus(status),
      classDates: [today],
    });
  };

  return (
    <Card title="오늘의 출석">
      <p className={styles.guide}>{uiState.guideText}</p>

      <div className={styles.container}>
        {attendanceOptions.map((option) => (
          <Button
            key={option.value}
            variant="outline"
            icon={option.icon}
            disabled={isPending || uiState.disabled}
            onClick={() =>
              handleClick(option.value as CalendarAttendanceStatus)
            }
            className={
              uiState.selectedStatus === option.value
                ? styles.selected
                : undefined
            }
          >
            {option.label}
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default TodaysAttendanceCard;
