"use client";

import React, { useState, useMemo } from "react";

import {
  X as XIcon,
  ChevronLeft,
  ChevronRight,
  Pencil,
} from "@/shared/assets/icons";

import styles from "./Calendar.module.scss";

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
}

interface CalendarProps {
  dates?: DateData[];
  onDateSelect?: (dates: Date[]) => void;
  onEdit?: (dates: Date[]) => void;
  initialMonth?: Date;
}

const getDateKey = (date: Date): string => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

const Calendar = ({
  dates = [],
  onDateSelect,
  onEdit,
  initialMonth = new Date(),
}: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(
    new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1),
  );
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

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

  const getDateData = (date: Date): DateData | undefined => {
    return datesMap.get(getDateKey(date));
  };

  const isSelected = (date: Date): boolean => {
    return selectedDatesSet.has(getDateKey(date));
  };

  const isCurrentMonth = (date: Date): boolean => {
    return (
      date.getMonth() === currentMonth.getMonth() &&
      date.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isWeekend = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const handleDateClick = (date: Date) => {
    if (!isCurrentMonth(date)) return;

    const dateKey = getDateKey(date);
    const newSelectedDates = isSelected(date)
      ? selectedDates.filter((d) => getDateKey(d) !== dateKey)
      : [...selectedDates, date];

    setSelectedDates(newSelectedDates);
    onDateSelect?.(newSelectedDates);
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  const handleClearSelection = () => {
    setSelectedDates([]);
    onDateSelect?.([]);
  };

  const handleEdit = () => {
    if (selectedDates.length > 0) {
      onEdit?.(selectedDates);
    }
  };

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

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
            const weekend = isWeekend(date);
            const isCurrentUnit = dateData?.isCurrentUnit;
            const today = isToday(date);

            return (
              <button
                key={`${date.getTime()}-${index}`}
                type="button"
                className={`${styles.day} ${!currentMonthDay ? styles.otherMonth : ""} ${selected ? styles.selected : ""} ${isCurrentUnit ? styles.currentUnit : ""} ${weekend ? styles.weekend : ""} ${today ? styles.today : ""} ${dateData?.status ? styles[`status-${dateData.status}`] : ""}`}
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
        <div className={styles.floatingBar}>
          <span className={styles.selectionText}>
            {selectedDates.length}개 날짜 선택됨
          </span>
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClearSelection}
            aria-label="선택 초기화"
          >
            <XIcon width={16} height={16} />
          </button>
          <button
            type="button"
            className={styles.editButton}
            onClick={handleEdit}
            aria-label="출결 등록"
          >
            <Pencil width={16} height={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
