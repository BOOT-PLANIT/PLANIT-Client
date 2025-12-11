import React, { memo } from "react";

import type { AttendanceStatus, DateData } from "./Calendar";
import styles from "./Calendar.module.scss";

interface CalendarDayProps {
  date: Date;
  dateData?: DateData;
  selected: boolean;
  currentMonthDay: boolean;
  today: boolean;
  isCurrentUnit?: boolean;
  isOtherUnit?: boolean;
  inDragRange: boolean;
  onDateClick: (date: Date) => void;
  onMouseDown: (date: Date, e?: React.MouseEvent | React.TouchEvent) => void;
  onMouseEnter: (date: Date) => void;
  onMouseUp: () => void;
  onTouchStart: (e: React.TouchEvent, date: Date) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  getStatusClassName: (status?: AttendanceStatus) => string;
}

const CalendarDay = memo(
  ({
    date,
    dateData,
    selected,
    currentMonthDay,
    today,
    isCurrentUnit,
    isOtherUnit,
    inDragRange,
    onDateClick,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    getStatusClassName,
  }: CalendarDayProps) => {
    const dayClasses = [
      styles.day,
      !currentMonthDay && styles.otherMonth,
      selected && styles.selected,
      today && styles.today,
      isCurrentUnit && styles.currentUnit,
      isOtherUnit && styles.otherUnit,
      inDragRange && styles.dragRange,
      getStatusClassName(dateData?.status),
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        type="button"
        className={dayClasses}
        onClick={() => onDateClick(date)}
        onMouseDown={() => onMouseDown(date)}
        onMouseEnter={() => onMouseEnter(date)}
        onMouseUp={onMouseUp}
        onTouchStart={(e) => onTouchStart(e, date)}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        data-date={date.getTime()}
        disabled={!currentMonthDay}
      >
        <span className={styles.dayNumber}>{date.getDate()}</span>
      </button>
    );
  },
  (prevProps, nextProps) => {
    const visualPropsEqual =
      prevProps.date.getTime() === nextProps.date.getTime() &&
      prevProps.selected === nextProps.selected &&
      prevProps.currentMonthDay === nextProps.currentMonthDay &&
      prevProps.today === nextProps.today &&
      prevProps.isCurrentUnit === nextProps.isCurrentUnit &&
      prevProps.isOtherUnit === nextProps.isOtherUnit &&
      prevProps.inDragRange === nextProps.inDragRange &&
      prevProps.dateData?.status === nextProps.dateData?.status;

    const handlersEqual =
      prevProps.onDateClick === nextProps.onDateClick &&
      prevProps.onMouseDown === nextProps.onMouseDown &&
      prevProps.onMouseEnter === nextProps.onMouseEnter &&
      prevProps.onMouseUp === nextProps.onMouseUp &&
      prevProps.onTouchStart === nextProps.onTouchStart &&
      prevProps.onTouchMove === nextProps.onTouchMove &&
      prevProps.onTouchEnd === nextProps.onTouchEnd &&
      prevProps.getStatusClassName === nextProps.getStatusClassName;

    return visualPropsEqual && handlersEqual;
  },
);

CalendarDay.displayName = "CalendarDay";

export default CalendarDay;
