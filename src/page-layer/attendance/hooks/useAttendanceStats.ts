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
  customDateRange?: {
    startDate: Date;
    endDate: Date;
  } | null;
}

interface UseAttendanceStatsReturn {
  attendanceSummaryValues: AttendanceSummaryValues;
  unitStats: UnitStats;
  periodAllowance: PeriodAllowance;
}

export const useAttendanceStats = (
  options: UseAttendanceStatsOptions,
): UseAttendanceStatsReturn => {
  const { allCalendarDates, selectedPeriod, isKdt, customDateRange } = options;

  const periodTimeRange = useMemo(() => {
    const normalizeStartDate = (date: Date) => {
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
      ).getTime();
    };

    const normalizeEndDate = (date: Date) => {
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        23,
        59,
        59,
        999,
      ).getTime();
    };

    if (customDateRange) {
      return {
        startTime: normalizeStartDate(customDateRange.startDate),
        endTime: normalizeEndDate(customDateRange.endDate),
      };
    }
    if (!selectedPeriod) return null;
    return {
      startTime: normalizeStartDate(selectedPeriod.startDate),
      endTime: normalizeEndDate(selectedPeriod.endDate),
    };
  }, [selectedPeriod, customDateRange]);

  const periodDates = useMemo(() => {
    if (!periodTimeRange) return [];

    const normalizeDate = (date: Date) => {
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
      ).getTime();
    };

    return allCalendarDates.filter((dateData) => {
      const dateTime = normalizeDate(dateData.date);
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
    if (customDateRange || !selectedPeriod) {
      return { amount: 0, dateRange: "" };
    }
    return calculatePeriodAllowance(
      selectedPeriod,
      unitStats.totalAttendance,
      isKdt ?? false,
    );
  }, [selectedPeriod, unitStats.totalAttendance, isKdt, customDateRange]);

  return {
    attendanceSummaryValues,
    unitStats,
    periodAllowance,
  };
};
