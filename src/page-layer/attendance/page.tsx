"use client";

import { useState } from "react";

import {
  AttendanceSummaryCard,
  EditAttendanceModal,
  IconGuide,
  PeriodAllowanceCard,
  UnitPeriodStatsCard,
} from "@/page-layer/attendance/ui";
import {
  AbsentIcon,
  AnnualIcon,
  LateIcon,
  LeftEarlyIcon,
  LeaveIcon,
  PresentIcon,
} from "@/shared/assets/icons";
import { Calendar, Card, Combobox } from "@/shared/ui";
import type { AttendanceStatus, DateData } from "@/shared/ui/Calendar";

import styles from "./Attendance.module.scss";
import {
  generateBootcampOptions,
  generateCalendarDates,
  generateUnitPeriods,
} from "./model/mockData";
import {
  calculateAttendanceSummary,
  calculatePeriodAllowance,
  calculateStatusCounts,
  calculateUnitStats,
} from "./utils/calculator";

const CurrentUnitIcon = () => (
  <div
    style={{
      width: "16px",
      height: "16px",
      backgroundColor: "var(--color-purple-lightest)",
      borderRadius: "var(--radius-4)",
    }}
  />
);

const OtherUnitIcon = () => (
  <div
    style={{
      width: "16px",
      height: "16px",
      backgroundColor: "var(--color-yellow-lightest)",
      borderRadius: "var(--radius-4)",
    }}
  />
);

const getUnitPeriodForDate = (
  date: Date,
  unitPeriods: Array<{ startDate: Date; endDate: Date; unitNumber: number }>,
): { unitNumber: number; startDate: Date; endDate: Date } | null => {
  const targetYear = date.getFullYear();
  const targetMonth = date.getMonth();
  const monthStart = new Date(targetYear, targetMonth, 1);
  const monthEnd = new Date(targetYear, targetMonth + 1, 0);

  for (const period of unitPeriods) {
    const overlapStart = new Date(
      Math.max(period.startDate.getTime(), monthStart.getTime()),
    );
    const overlapEnd = new Date(
      Math.min(period.endDate.getTime(), monthEnd.getTime()),
    );

    if (overlapStart <= overlapEnd) {
      return period;
    }
  }
  return null;
};

const Attendance = () => {
  const [selectedBootcampIndex, setSelectedBootcampIndex] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDatesForEdit, setSelectedDatesForEdit] = useState<Date[]>([]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [allCalendarDates, setAllCalendarDates] = useState<DateData[]>(
    generateCalendarDates(),
  );

  const bootcampOptions = generateBootcampOptions();
  const unitPeriods = generateUnitPeriods();
  const unitPeriod = getUnitPeriodForDate(currentMonth, unitPeriods);
  const currentUnit = unitPeriod
    ? (() => {
        const startStr = unitPeriod.startDate.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        const endStr = unitPeriod.endDate.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        const sessionCount = allCalendarDates.filter((dateData) => {
          const date = dateData.date;
          return (
            date.getTime() >= unitPeriod.startDate.getTime() &&
            date.getTime() <= unitPeriod.endDate.getTime()
          );
        }).length;

        return `${startStr} - ${endStr} (${sessionCount}일)`;
      })()
    : "단위기간 정보 없음";

  const targetYear = currentMonth.getFullYear();
  const targetMonthIndex = currentMonth.getMonth();

  const monthStart = new Date(targetYear, targetMonthIndex, 1);
  const monthEnd = new Date(targetYear, targetMonthIndex + 1, 0);

  const overlappingPeriods = unitPeriods
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
      (item): item is { period: (typeof unitPeriods)[0]; dayCount: number } =>
        item !== null,
    );

  const selectedPeriod =
    overlappingPeriods.length > 0
      ? overlappingPeriods.reduce((max, current) =>
          current.dayCount > max.dayCount ? current : max,
        ).period
      : null;

  const calendarDates = allCalendarDates
    .filter((dateData) => {
      const date = dateData.date;
      const isInTargetMonth =
        date.getFullYear() === targetYear &&
        date.getMonth() === targetMonthIndex;

      const prevMonth = new Date(targetYear, targetMonthIndex, 1);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      const isInPrevMonth =
        date.getFullYear() === prevMonth.getFullYear() &&
        date.getMonth() === prevMonth.getMonth();

      const nextMonth = new Date(targetYear, targetMonthIndex, 1);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
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
        selectedPeriod !== null &&
        date.getTime() >= selectedPeriod.startDate.getTime() &&
        date.getTime() <= selectedPeriod.endDate.getTime();

      const isInOtherPeriod = unitPeriods.some(
        (period) =>
          period !== selectedPeriod &&
          date.getTime() >= period.startDate.getTime() &&
          date.getTime() <= period.endDate.getTime(),
      );

      return {
        ...dateData,
        isCurrentUnit: isInCurrentPeriod ? true : undefined,
        isOtherUnit: isInOtherPeriod ? true : undefined,
      };
    });

  const handleMonthChange = (month: Date) => {
    setCurrentMonth(month);
  };

  const periodDates = selectedPeriod
    ? allCalendarDates.filter(
        (dateData) =>
          dateData.date.getTime() >= selectedPeriod.startDate.getTime() &&
          dateData.date.getTime() <= selectedPeriod.endDate.getTime(),
      )
    : [];

  const statusCounts = calculateStatusCounts(periodDates);

  const iconMap = {
    present: <PresentIcon width={20} height={20} />,
    late: <LateIcon width={20} height={20} />,
    leftEarly: <LeftEarlyIcon width={20} height={20} />,
    leave: <LeaveIcon width={20} height={20} />,
    annual: <AnnualIcon width={20} height={20} />,
    absent: <AbsentIcon width={20} height={20} />,
  };

  const attendanceSummary = calculateAttendanceSummary(statusCounts).map(
    (item) => ({
      ...item,
      icon: iconMap[item.status],
    }),
  );

  const unitStats = calculateUnitStats(periodDates, statusCounts);

  const periodAllowance = calculatePeriodAllowance(selectedPeriod);

  const iconGuideItems = [
    { icon: <PresentIcon width={20} height={20} />, label: "출석" },
    { icon: <LateIcon width={20} height={20} />, label: "지각" },
    { icon: <LeftEarlyIcon width={20} height={20} />, label: "조퇴" },
    { icon: <LeaveIcon width={20} height={20} />, label: "공가" },
    { icon: <AnnualIcon width={20} height={20} />, label: "월차" },
    { icon: <AbsentIcon width={20} height={20} />, label: "결석" },
    { icon: <CurrentUnitIcon />, label: "현재 단위 기간" },
    { icon: <OtherUnitIcon />, label: "다른 단위 기간" },
  ];

  const handleEdit = (dates: Date[]) => {
    setSelectedDatesForEdit(dates);
    setIsEditModalOpen(true);
  };

  const handleDateSelect = (dates: Date[]) => {
    setSelectedDates(dates);
  };

  const handleSaveEdit = (dates: Date[], status: AttendanceStatus) => {
    setAllCalendarDates((prevDates: DateData[]) => {
      const datesMap = new Map<string, DateData>(
        prevDates.map((dateData) => [
          `${dateData.date.getFullYear()}-${dateData.date.getMonth()}-${dateData.date.getDate()}`,
          dateData,
        ]),
      );

      dates.forEach((date) => {
        const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        const existing = datesMap.get(key);
        if (existing) {
          datesMap.set(key, { ...existing, status });
        } else {
          datesMap.set(key, { date, status });
        }
      });

      return Array.from(datesMap.values());
    });
    setSelectedDates([]);
    setIsEditModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.headerSection}>
          <div className={styles.bootcampInfo}>
            <Combobox
              options={bootcampOptions}
              value={selectedBootcampIndex}
              onChange={setSelectedBootcampIndex}
            />
            <div className={styles.currentUnit}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={{ marginRight: "8px" }}
              >
                <rect
                  x="3"
                  y="4"
                  width="10"
                  height="9"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M3 6H13" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M6 2V4M10 2V4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span>{currentUnit}</span>
            </div>
          </div>
        </div>

        <div className={styles.summaryCards}>
          <AttendanceSummaryCard items={attendanceSummary} />
          <UnitPeriodStatsCard
            totalAttendance={unitStats.totalAttendance}
            totalAbsent={unitStats.totalAbsent}
            totalUnrecorded={unitStats.totalUnrecorded}
            totalDays={unitStats.totalDays}
          />
          <PeriodAllowanceCard
            amount={periodAllowance.amount}
            dateRange={periodAllowance.dateRange}
          />
        </div>

        <Card variant="solid" width="100%">
          <Calendar
            dates={calendarDates}
            selectedDates={selectedDates}
            onDateSelect={handleDateSelect}
            initialMonth={currentMonth}
            onEdit={handleEdit}
            onMonthChange={handleMonthChange}
          />
          <IconGuide items={iconGuideItems} />
        </Card>
      </div>

      {isEditModalOpen && (
        <EditAttendanceModal
          selectedDates={selectedDatesForEdit}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default Attendance;
