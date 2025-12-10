"use client";

import React, { useState, useMemo, useCallback } from "react";

import { ChevronLeft, ChevronRight } from "@/shared/assets/icons";

import styles from "./Calendar.module.scss";
import FloatingBar from "./FloatingBar";

export type AttendanceStatus =
  | "present"
  | "late"
  | "leftEarly"
  | "leave"
  | "annual"
  | "absent";

export interface DateData {
  date: Date;
  status?: AttendanceStatus;
  isCurrentUnit?: boolean;
  isOtherUnit?: boolean;
}

interface CalendarProps {
  dates?: DateData[];
  selectedDates?: Date[];
  onDateSelect?: (dates: Date[]) => void;
  onEdit?: (dates: Date[]) => void;
  initialMonth?: Date;
  onMonthChange?: (month: Date) => void;
}

const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

const getDateKey = (date: Date): string => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

const getStatusClassName = (status?: AttendanceStatus): string => {
  if (!status) return "";
  const statusMap: Record<AttendanceStatus, string> = {
    present: "statusPresent",
    late: "statusLate",
    leftEarly: "statusLeftEarly",
    leave: "statusLeave",
    annual: "statusAnnual",
    absent: "statusAbsent",
  };
  return styles[statusMap[status]] || "";
};

const Calendar = ({
  dates = [],
  selectedDates: externalSelectedDates,
  onDateSelect,
  onEdit,
  initialMonth = new Date(),
  onMonthChange,
}: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(
    new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1),
  );
  const [internalSelectedDates, setInternalSelectedDates] = useState<Date[]>(
    [],
  );
  const selectedDates =
    externalSelectedDates !== undefined
      ? externalSelectedDates
      : internalSelectedDates;

  const monthYear = useMemo(() => {
    return currentMonth.toLocaleDateString("ko-KR", {
      month: "long",
      year: "numeric",
    });
  }, [currentMonth]);

  const datesMap = useMemo(() => {
    const map = new Map<string, DateData>();
    dates.forEach((dateData) => {
      map.set(getDateKey(dateData.date), dateData);
    });
    return map;
  }, [dates]);

  const selectedDatesSet = useMemo(() => {
    return new Set(selectedDates.map(getDateKey));
  }, [selectedDates]);

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: Date[] = [];

    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push(new Date(year, month + 1, day));
    }

    return days;
  }, [currentMonth]);

  const getDateData = useCallback(
    (date: Date): DateData | undefined => {
      return datesMap.get(getDateKey(date));
    },
    [datesMap],
  );

  const isSelected = useCallback(
    (date: Date): boolean => {
      return selectedDatesSet.has(getDateKey(date));
    },
    [selectedDatesSet],
  );

  const isCurrentMonth = useCallback(
    (date: Date): boolean => {
      return (
        date.getMonth() === currentMonth.getMonth() &&
        date.getFullYear() === currentMonth.getFullYear()
      );
    },
    [currentMonth],
  );

  const isToday = useCallback((date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }, []);

  const handleDateClick = useCallback(
    (date: Date) => {
      if (
        date.getMonth() !== currentMonth.getMonth() ||
        date.getFullYear() !== currentMonth.getFullYear()
      ) {
        return;
      }

      const dateKey = getDateKey(date);
      const dateData = datesMap.get(dateKey);
      if (!dateData) {
        return;
      }

      const updateSelectedDates = (newDates: Date[]) => {
        if (externalSelectedDates === undefined) {
          setInternalSelectedDates(newDates);
        }
        onDateSelect?.(newDates);
      };

      const prevKeys = new Set(selectedDates.map(getDateKey));
      const isCurrentlySelected = prevKeys.has(dateKey);
      const newSelectedDates = isCurrentlySelected
        ? selectedDates.filter((d) => getDateKey(d) !== dateKey)
        : [...selectedDates, date];
      updateSelectedDates(newSelectedDates);
    },
    [
      currentMonth,
      onDateSelect,
      externalSelectedDates,
      selectedDates,
      datesMap,
    ],
  );

  const handlePreviousMonth = useCallback(() => {
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1,
    );
    setCurrentMonth(newMonth);
    onMonthChange?.(newMonth);
  }, [currentMonth, onMonthChange]);

  const handleNextMonth = useCallback(() => {
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1,
    );
    setCurrentMonth(newMonth);
    onMonthChange?.(newMonth);
  }, [currentMonth, onMonthChange]);

  const handleClearSelection = useCallback(() => {
    if (externalSelectedDates === undefined) {
      setInternalSelectedDates([]);
    }
    onDateSelect?.([]);
  }, [onDateSelect, externalSelectedDates]);

  const handleEdit = useCallback(() => {
    if (selectedDates.length > 0) {
      onEdit?.(selectedDates);
    }
  }, [selectedDates, onEdit]);

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <div className={styles.monthYear}>{monthYear}</div>
        <div className={styles.navigation}>
          <button
            type="button"
            className={styles.navButton}
            onClick={handlePreviousMonth}
            aria-label="이전 달"
          >
            <ChevronLeft width={20} height={20} />
          </button>
          <button
            type="button"
            className={styles.navButton}
            onClick={handleNextMonth}
            aria-label="다음 달"
          >
            <ChevronRight width={20} height={20} />
          </button>
        </div>
      </div>

      <div className={styles.calendarGrid}>
        <div className={styles.weekDays}>
          {weekDays.map((day) => (
            <div key={day} className={styles.weekDay}>
              {day}
            </div>
          ))}
        </div>

        <div className={styles.grid}>
          {calendarDays.map((date, index) => {
            const dateData = getDateData(date);
            const selected = isSelected(date);
            const currentMonthDay = isCurrentMonth(date);
            const today = isToday(date);
            const isCurrentUnit = dateData?.isCurrentUnit;
            const isOtherUnit = dateData?.isOtherUnit;

            const dayClasses = [
              styles.day,
              !currentMonthDay && styles.otherMonth,
              selected && styles.selected,
              today && styles.today,
              isCurrentUnit && styles.currentUnit,
              isOtherUnit && styles.otherUnit,
              getStatusClassName(dateData?.status),
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <button
                key={`${date.getTime()}-${index}`}
                type="button"
                className={dayClasses}
                onClick={() => handleDateClick(date)}
                disabled={!currentMonthDay}
              >
                <span className={styles.dayNumber}>{date.getDate()}</span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedDates.length > 0 && (
        <FloatingBar
          selectedCount={selectedDates.length}
          onClear={handleClearSelection}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default Calendar;
