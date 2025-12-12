import { useMemo } from "react";

import type { UnitPeriod } from "@/entities/attendance/model";
import type { DateData } from "@/shared/ui/Calendar";

import type { DateRange, ExtendedDateData } from "../types";

interface UseCalendarDatesOptions {
  allCalendarDates: DateData[];
  unitPeriods: UnitPeriod[];
  currentMonth: Date;
}

interface UseCalendarDatesReturn {
  calendarDates: ExtendedDateData[];
  selectedPeriod: UnitPeriod | null;
  dateRange: DateRange | null;
}

export const useCalendarDates = (
  options: UseCalendarDatesOptions,
): UseCalendarDatesReturn => {
  const { allCalendarDates, unitPeriods, currentMonth } = options;

  const targetYear = currentMonth.getFullYear();
  const targetMonthIndex = currentMonth.getMonth();

  const monthStart = useMemo(
    () => new Date(targetYear, targetMonthIndex, 1),
    [targetYear, targetMonthIndex],
  );
  const monthEnd = useMemo(
    () => new Date(targetYear, targetMonthIndex + 1, 0),
    [targetYear, targetMonthIndex],
  );

  const dateTimestampSet = useMemo(() => {
    return new Set(allCalendarDates.map((dateData) => dateData.date.getTime()));
  }, [allCalendarDates]);

  const overlappingPeriods = useMemo(() => {
    const monthStartTime = monthStart.getTime();
    const monthEndTime = monthEnd.getTime();

    return unitPeriods
      .map((period) => {
        const overlapStartTime = Math.max(
          period.startDate.getTime(),
          monthStartTime,
        );
        const overlapEndTime = Math.min(period.endDate.getTime(), monthEndTime);

        if (overlapStartTime <= overlapEndTime) {
          let dayCount = 0;
          for (const timestamp of dateTimestampSet) {
            if (timestamp >= overlapStartTime && timestamp <= overlapEndTime) {
              dayCount++;
            }
          }

          return {
            period,
            dayCount,
          };
        }
        return null;
      })
      .filter(
        (item): item is { period: UnitPeriod; dayCount: number } =>
          item !== null,
      );
  }, [unitPeriods, monthStart, monthEnd, dateTimestampSet]);

  const selectedPeriod = useMemo(() => {
    if (overlappingPeriods.length === 0) return null;
    return overlappingPeriods.reduce((max, current) =>
      current.dayCount > max.dayCount ? current : max,
    ).period;
  }, [overlappingPeriods]);

  const dateRange = useMemo(() => {
    if (!selectedPeriod) return null;

    const startTime = selectedPeriod.startDate.getTime();
    const endTime = selectedPeriod.endDate.getTime();
    let sessionCount = 0;

    for (const timestamp of dateTimestampSet) {
      if (timestamp >= startTime && timestamp <= endTime) {
        sessionCount++;
      }
    }

    return {
      startDate: selectedPeriod.startDate,
      endDate: selectedPeriod.endDate,
      sessionCount,
    };
  }, [selectedPeriod, dateTimestampSet]);

  const currentPeriodForCalendar = useMemo(() => {
    const today = new Date();
    return unitPeriods.find(
      (period) =>
        today.getTime() >= period.startDate.getTime() &&
        today.getTime() <= period.endDate.getTime(),
    );
  }, [unitPeriods]);

  const calendarDates = useMemo(() => {
    const prevMonth = new Date(targetYear, targetMonthIndex, 1);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    const nextMonth = new Date(targetYear, targetMonthIndex, 1);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    return allCalendarDates
      .filter((dateData) => {
        const date = dateData.date;
        const isInTargetMonth =
          date.getFullYear() === targetYear &&
          date.getMonth() === targetMonthIndex;

        const isInPrevMonth =
          date.getFullYear() === prevMonth.getFullYear() &&
          date.getMonth() === prevMonth.getMonth();

        const isInNextMonth =
          date.getFullYear() === nextMonth.getFullYear() &&
          date.getMonth() === nextMonth.getMonth();

        if (!isInTargetMonth && !isInPrevMonth && !isInNextMonth) {
          return false;
        }

        return unitPeriods.some(
          (period) =>
            date.getTime() >= period.startDate.getTime() &&
            date.getTime() <= period.endDate.getTime(),
        );
      })
      .map((dateData) => {
        const date = dateData.date;
        const dateTime = date.getTime();

        if (!currentPeriodForCalendar) {
          return {
            ...dateData,
            isCurrentUnit: undefined,
            isOtherUnit: undefined,
          };
        }

        const isInCurrentPeriod =
          dateTime >= currentPeriodForCalendar.startDate.getTime() &&
          dateTime <= currentPeriodForCalendar.endDate.getTime();

        const isInOtherPeriod = unitPeriods.some(
          (period) =>
            period !== currentPeriodForCalendar &&
            dateTime >= period.startDate.getTime() &&
            dateTime <= period.endDate.getTime(),
        );

        return {
          ...dateData,
          isCurrentUnit: isInCurrentPeriod ? true : undefined,
          isOtherUnit: isInOtherPeriod ? true : undefined,
        };
      });
  }, [
    allCalendarDates,
    targetYear,
    targetMonthIndex,
    unitPeriods,
    currentPeriodForCalendar,
  ]);

  return {
    calendarDates,
    selectedPeriod,
    dateRange,
  };
};
