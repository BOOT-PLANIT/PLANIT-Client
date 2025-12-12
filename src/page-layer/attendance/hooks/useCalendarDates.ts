import { useMemo } from "react";

import type { DateData } from "@/shared/ui/Calendar";

import type { DateRange, ExtendedDateData, UnitPeriod } from "../types";

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

  const overlappingPeriods = useMemo(() => {
    return unitPeriods
      .map((period) => {
        const overlapStart = new Date(
          Math.max(period.startDate.getTime(), monthStart.getTime()),
        );
        const overlapEnd = new Date(
          Math.min(period.endDate.getTime(), monthEnd.getTime()),
        );

        if (overlapStart <= overlapEnd) {
          const dayCount = allCalendarDates.filter((dateData) => {
            const date = dateData.date;
            return (
              date.getTime() >= overlapStart.getTime() &&
              date.getTime() <= overlapEnd.getTime()
            );
          }).length;

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
  }, [unitPeriods, monthStart, monthEnd, allCalendarDates]);

  const selectedPeriod = useMemo(() => {
    if (overlappingPeriods.length === 0) return null;
    return overlappingPeriods.reduce((max, current) =>
      current.dayCount > max.dayCount ? current : max,
    ).period;
  }, [overlappingPeriods]);

  const dateRange = useMemo(() => {
    if (!selectedPeriod) return null;

    return {
      startDate: selectedPeriod.startDate,
      endDate: selectedPeriod.endDate,
      sessionCount: allCalendarDates.filter((dateData) => {
        const date = dateData.date;
        return (
          date.getTime() >= selectedPeriod.startDate.getTime() &&
          date.getTime() <= selectedPeriod.endDate.getTime()
        );
      }).length,
    };
  }, [selectedPeriod, allCalendarDates]);

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
        const isInCurrentPeriod =
          currentPeriodForCalendar !== undefined &&
          date.getTime() >= currentPeriodForCalendar.startDate.getTime() &&
          date.getTime() <= currentPeriodForCalendar.endDate.getTime();

        const isInOtherPeriod = unitPeriods.some(
          (period) =>
            period !== currentPeriodForCalendar &&
            date.getTime() >= period.startDate.getTime() &&
            date.getTime() <= period.endDate.getTime(),
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
