"use client";

import { useMemo } from "react";

import type { ChartItem } from "@/shared/ui/Chart/DoughnutChart";
import { DoughnutChartCard } from "@/widgets/ui/DoughnutChartCard";

interface UnitPeriodStatsCardProps {
  totalAttendance: number;
  totalAbsent: number;
  totalUnrecorded: number;
  totalDays: number;
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
  const chartData = useMemo<ChartItem[]>(() => {
    return [
      {
        label: "총출석",
        value: totalAttendance,
        color: ATTENDANCE_COLORS.attendance,
      },
      {
        label: "총결석",
        value: totalAbsent,
        color: ATTENDANCE_COLORS.absent,
      },
      {
        label: "미출결",
        value: totalUnrecorded,
        color: ATTENDANCE_COLORS.unrecorded,
      },
    ];
  }, [totalAttendance, totalAbsent, totalUnrecorded]);

  return <DoughnutChartCard title="기간 통계" data={chartData} />;
};

export default UnitPeriodStatsCard;
