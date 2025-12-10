"use client";

import React, { useState, useMemo, useCallback, useRef } from "react";

import { ChevronLeft, ChevronRight } from "@/shared/assets/icons";

import styles from "./Calendar.module.scss";
import CalendarDay from "./CalendarDay";
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
  const [dragStartDate, setDragStartDate] = useState<Date | null>(null);
  const [dragEndDate, setDragEndDate] = useState<Date | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
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

  const isInDragRange = useCallback(
    (date: Date): boolean => {
      if (!dragStartDate || !dragEndDate) {
        return false;
      }
      if (
        date.getMonth() !== currentMonth.getMonth() ||
        date.getFullYear() !== currentMonth.getFullYear()
      ) {
        return false;
      }
      const dateKey = getDateKey(date);
      const dateData = datesMap.get(dateKey);
      if (!dateData) {
        return false;
      }
      const dateTime = date.getTime();
      const startTime = Math.min(
        dragStartDate.getTime(),
        dragEndDate.getTime(),
      );
      const endTime = Math.max(dragStartDate.getTime(), dragEndDate.getTime());
      return dateTime >= startTime && dateTime <= endTime;
    },
    [dragStartDate, dragEndDate, currentMonth, datesMap],
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

  const todayKey = useMemo(() => {
    const today = new Date();
    return getDateKey(today);
  }, []);

  const isToday = useCallback(
    (date: Date): boolean => {
      return getDateKey(date) === todayKey;
    },
    [todayKey],
  );

  const handleDateMouseDown = useCallback(
    (date: Date, e?: React.MouseEvent | React.TouchEvent) => {
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

      if (e && "touches" in e) {
        e.preventDefault();
      }

      setDragStartDate(date);
      setDragEndDate(date);
      setIsDragging(false);
    },
    [currentMonth, datesMap],
  );

  const handleDateMouseEnter = useCallback(
    (date: Date) => {
      if (!dragStartDate) {
        return;
      }

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

      setIsDragging(true);
      setDragEndDate(date);
    },
    [dragStartDate, datesMap, currentMonth],
  );

  const handleDateMouseUp = useCallback(() => {
    if (!dragStartDate || !dragEndDate) {
      setDragStartDate(null);
      setDragEndDate(null);
      setIsDragging(false);
      return;
    }

    if (isDragging) {
      const startTime = Math.min(
        dragStartDate.getTime(),
        dragEndDate.getTime(),
      );
      const endTime = Math.max(dragStartDate.getTime(), dragEndDate.getTime());

      const datesInRange: Date[] = [];
      const currentDate = new Date(startTime);
      while (currentDate.getTime() <= endTime) {
        if (
          currentDate.getMonth() === currentMonth.getMonth() &&
          currentDate.getFullYear() === currentMonth.getFullYear()
        ) {
          const dateKey = getDateKey(currentDate);
          const dateData = datesMap.get(dateKey);
          if (dateData) {
            datesInRange.push(new Date(currentDate));
          }
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      const updateSelectedDates = (newDates: Date[]) => {
        if (externalSelectedDates === undefined) {
          setInternalSelectedDates(newDates);
        }
        onDateSelect?.(newDates);
      };

      const existingKeys = new Set(selectedDates.map(getDateKey));
      const rangeKeys = new Set(datesInRange.map(getDateKey));
      const allSelected = datesInRange.every((d) =>
        existingKeys.has(getDateKey(d)),
      );

      const newSelectedDates = allSelected
        ? selectedDates.filter((d) => !rangeKeys.has(getDateKey(d)))
        : [
            ...selectedDates.filter((d) => !rangeKeys.has(getDateKey(d))),
            ...datesInRange,
          ];

      updateSelectedDates(newSelectedDates);
    }

    setTimeout(() => {
      setDragStartDate(null);
      setDragEndDate(null);
      setIsDragging(false);
    }, 0);
  }, [
    dragStartDate,
    dragEndDate,
    isDragging,
    datesMap,
    externalSelectedDates,
    onDateSelect,
    selectedDates,
    currentMonth,
  ]);

  const handleDateClick = useCallback(
    (date: Date) => {
      if (isDragging) {
        return;
      }

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
      isDragging,
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

  const handleMouseLeave = useCallback(() => {
    if (dragStartDate) {
      setDragStartDate(null);
      setDragEndDate(null);
    }
  }, [dragStartDate]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent, date: Date) => {
      e.preventDefault();
      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
      };
      handleDateMouseDown(date, e);
    },
    [handleDateMouseDown],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!dragStartDate || !touchStartRef.current) return;

      e.preventDefault();
      e.stopPropagation();

      const touch = e.touches[0];
      const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
      const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);

      if (deltaX > 5 || deltaY > 5) {
        setIsDragging(true);
      }

      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (target) {
        const button = target.closest("button[data-date]");
        if (button) {
          const dateAttr = button.getAttribute("data-date");
          if (dateAttr) {
            const touchDate = new Date(parseInt(dateAttr, 10));
            handleDateMouseEnter(touchDate);
          }
        }
      }
    },
    [dragStartDate, handleDateMouseEnter],
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
      }
      handleDateMouseUp();
      touchStartRef.current = null;
    },
    [isDragging, handleDateMouseUp],
  );

  return (
    <div className={styles.calendar} onMouseLeave={handleMouseLeave}>
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
            const inDragRange = isInDragRange(date);

            return (
              <CalendarDay
                key={`${date.getTime()}-${index}`}
                date={date}
                dateData={dateData}
                selected={selected}
                currentMonthDay={currentMonthDay}
                today={today}
                isCurrentUnit={isCurrentUnit}
                isOtherUnit={isOtherUnit}
                inDragRange={inDragRange}
                onDateClick={handleDateClick}
                onMouseDown={handleDateMouseDown}
                onMouseEnter={handleDateMouseEnter}
                onMouseUp={handleDateMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                getStatusClassName={getStatusClassName}
              />
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
