import { useMemo } from "react";

import type { DateData } from "@/shared/ui/Calendar";

import type {
  AttendanceSummaryValues,
  PeriodAllowance,
  UnitPeriod,
  UnitStats,
} from "../types";
import {
  calculatePeriodAllowance,
  calculateStatusCounts,
  calculateUnitStats,
} from "../utils/calculator";

interface UseAttendanceStatsOptions {
  allCalendarDates: DateData[];
  selectedPeriod: UnitPeriod | null;
  isKdt?: boolean;
}

interface UseAttendanceStatsReturn {
  attendanceSummaryValues: AttendanceSummaryValues;
  unitStats: UnitStats;
  periodAllowance: PeriodAllowance;
}

export const useAttendanceStats = (
  options: UseAttendanceStatsOptions,
): UseAttendanceStatsReturn => {
  const { allCalendarDates, selectedPeriod, isKdt } = options;

  const periodDates = useMemo(() => {
    if (!selectedPeriod) return [];
    return allCalendarDates.filter(
      (dateData) =>
        dateData.date.getTime() >= selectedPeriod.startDate.getTime() &&
        dateData.date.getTime() <= selectedPeriod.endDate.getTime(),
    );
  }, [allCalendarDates, selectedPeriod]);

  const statusCounts = useMemo(() => {
    return calculateStatusCounts(periodDates);
  }, [periodDates]);

  const attendanceSummaryValues = useMemo(
    () => ({
      present: statusCounts.present || 0,
      late: statusCounts.late || 0,
      leftEarly: statusCounts.leftEarly || 0,
      leave: statusCounts.leave || 0,
      annual: statusCounts.annual || 0,
      absent: statusCounts.absent || 0,
    }),
    [statusCounts],
  );

  const unitStats = useMemo(() => {
    return calculateUnitStats(periodDates, statusCounts);
  }, [periodDates, statusCounts]);

  const periodAllowance = useMemo(() => {
    return calculatePeriodAllowance(
      selectedPeriod,
      unitStats.totalAttendance,
      isKdt ?? false,
    );
  }, [selectedPeriod, unitStats.totalAttendance, isKdt]);

  return {
    attendanceSummaryValues,
    unitStats,
    periodAllowance,
  };
};
