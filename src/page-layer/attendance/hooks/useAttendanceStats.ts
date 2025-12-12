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

  const periodTimeRange = useMemo(() => {
    if (!selectedPeriod) return null;
    return {
      startTime: selectedPeriod.startDate.getTime(),
      endTime: selectedPeriod.endDate.getTime(),
    };
  }, [selectedPeriod]);

  const periodDates = useMemo(() => {
    if (!periodTimeRange) return [];
    return allCalendarDates.filter((dateData) => {
      const dateTime = dateData.date.getTime();
      return (
        dateTime >= periodTimeRange.startTime &&
        dateTime <= periodTimeRange.endTime
      );
    });
  }, [allCalendarDates, periodTimeRange]);

  const statusCounts = useMemo(() => {
    return calculateStatusCounts(periodDates);
  }, [periodDates]);

  const attendanceSummaryValues = useMemo(
    () => ({
      present: statusCounts.present ?? 0,
      late: statusCounts.late ?? 0,
      leftEarly: statusCounts.leftEarly ?? 0,
      leave: statusCounts.leave ?? 0,
      annual: statusCounts.annual ?? 0,
      absent: statusCounts.absent ?? 0,
    }),
    [statusCounts],
  );

  const unitStats = useMemo(() => {
    return calculateUnitStats(periodDates, statusCounts);
  }, [periodDates, statusCounts]);

  const periodAllowance = useMemo(() => {
    if (!selectedPeriod) {
      return { amount: 0, dateRange: "" };
    }
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
