"use client";

import { useMemo } from "react";

import type { DoughnutChartItem } from "@/shared/ui/Chart";
import { DoughnutChartCard } from "@/widgets/ui";

import {
  CARD_TITLES,
  STATS_LABELS,
} from "../../../../entities/attendance/model/constants";

interface UnitPeriodStatsCardProps {
  totalAttendance: number;
  totalAbsent: number;
  totalUnrecorded: number;
}

const ATTENDANCE_COLORS = {
  attendance: "var(--color-attendance-present)",
  absent: "var(--color-attendance-absent)",
  unrecorded: "var(--foreground-disable)",
} as const;

const UnitPeriodStatsCard = ({
  totalAttendance,
  totalAbsent,
  totalUnrecorded,
}: UnitPeriodStatsCardProps) => {
  const chartData = useMemo<DoughnutChartItem[]>(() => {
    return [
      {
        label: STATS_LABELS.TOTAL_ATTENDANCE,
        value: totalAttendance,
        color: ATTENDANCE_COLORS.attendance,
      },
      {
        label: STATS_LABELS.TOTAL_ABSENT,
        value: totalAbsent,
        color: ATTENDANCE_COLORS.absent,
      },
      {
        label: STATS_LABELS.UNRECORDED,
        value: totalUnrecorded,
        color: ATTENDANCE_COLORS.unrecorded,
      },
    ];
  }, [totalAttendance, totalAbsent, totalUnrecorded]);

  return (
    <DoughnutChartCard title={CARD_TITLES.PERIOD_STATS} data={chartData} />
  );
};

export default UnitPeriodStatsCard;
