"use client";

import { useState, Suspense, lazy } from "react";

import {
  AbsentIcon,
  AnnualIcon,
  LateIcon,
  LeftEarlyIcon,
  LeaveIcon,
  PresentIcon,
} from "@/shared/assets/icons";
import { Card, Combobox } from "@/shared/ui";
import type { AttendanceStatus, DateData } from "@/shared/ui/Calendar";

import styles from "./Attendance.module.scss";
import { ICON_GUIDE_LABELS, UNIT_COLORS } from "./constants";
import {
  generateBootcampOptions,
  generateCalendarDates,
  generateUnitPeriods,
} from "./model/mockData";
import AttendanceSummaryCardSkeleton from "./ui/AttendanceSummaryCard/AttendanceSummaryCardSkeleton";
import CalendarSkeleton from "./ui/CalendarSkeleton";
import PeriodAllowanceCardSkeleton from "./ui/PeriodAllowanceCard/PeriodAllowanceCardSkeleton";
import { UnitIcon } from "./ui/UnitIcon";
import UnitPeriodStatsCardSkeleton from "./ui/UnitPeriodStatsCard/UnitPeriodStatsCardSkeleton";
import {
  calculateAttendanceSummary,
  calculatePeriodAllowance,
  calculateStatusCounts,
  calculateUnitStats,
} from "./utils/calculator";

const AttendanceSummaryCard = lazy(() =>
  import("@/page-layer/attendance/ui").then((module) => ({
    default: module.AttendanceSummaryCard,
  })),
);

const UnitPeriodStatsCard = lazy(() =>
  import("@/page-layer/attendance/ui").then((module) => ({
    default: module.UnitPeriodStatsCard,
  })),
);

const PeriodAllowanceCard = lazy(() =>
  import("@/page-layer/attendance/ui").then((module) => ({
    default: module.PeriodAllowanceCard,
  })),
);

const CalendarComponent = lazy(() =>
  import("@/shared/ui").then((module) => ({
    default: module.Calendar,
  })),
);

const IconGuide = lazy(() =>
  import("@/page-layer/attendance/ui").then((module) => ({
    default: module.IconGuide,
  })),
);

const EditAttendanceModal = lazy(() =>
  import("@/page-layer/attendance/ui").then((module) => ({
    default: module.EditAttendanceModal,
  })),
);

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Attendance = () => {
  const [selectedBootcampIndex, setSelectedBootcampIndex] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDatesForEdit, setSelectedDatesForEdit] = useState<Date[]>([]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [isLoading] = useState(false);
  const [allCalendarDates, setAllCalendarDates] = useState<DateData[]>(
    generateCalendarDates(),
  );

  const bootcampOptions = generateBootcampOptions();
  const unitPeriods = generateUnitPeriods();

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

  const currentUnit = selectedPeriod
    ? (() => {
        const startStr = formatDate(selectedPeriod.startDate);
        const endStr = formatDate(selectedPeriod.endDate);

        const sessionCount = allCalendarDates.filter((dateData) => {
          const date = dateData.date;
          return (
            date.getTime() >= selectedPeriod.startDate.getTime() &&
            date.getTime() <= selectedPeriod.endDate.getTime()
          );
        }).length;

        return `${startStr} - ${endStr} (${sessionCount}일)`;
      })()
    : "단위기간 정보 없음";

  const today = new Date();
  const currentPeriodForCalendar = unitPeriods.find(
    (period) =>
      today.getTime() >= period.startDate.getTime() &&
      today.getTime() <= period.endDate.getTime(),
  );

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

  const selectedBootcamp = bootcampOptions[selectedBootcampIndex];
  const periodAllowance = calculatePeriodAllowance(
    selectedPeriod,
    unitStats.totalAttendance,
    selectedBootcamp?.isKdt ?? false,
  );

  const iconGuideItems = [
    {
      icon: <PresentIcon width={20} height={20} />,
      label: ICON_GUIDE_LABELS.present,
    },
    {
      icon: <LateIcon width={20} height={20} />,
      label: ICON_GUIDE_LABELS.late,
    },
    {
      icon: <LeftEarlyIcon width={20} height={20} />,
      label: ICON_GUIDE_LABELS.leftEarly,
    },
    {
      icon: <LeaveIcon width={20} height={20} />,
      label: ICON_GUIDE_LABELS.leave,
    },
    {
      icon: <AnnualIcon width={20} height={20} />,
      label: ICON_GUIDE_LABELS.annual,
    },
    {
      icon: <AbsentIcon width={20} height={20} />,
      label: ICON_GUIDE_LABELS.absent,
    },
    {
      icon: <UnitIcon color={UNIT_COLORS.CURRENT_UNIT} size={20} />,
      label: ICON_GUIDE_LABELS.CURRENT_UNIT,
    },
    {
      icon: <UnitIcon color={UNIT_COLORS.OTHER_UNIT} size={20} />,
      label: ICON_GUIDE_LABELS.OTHER_UNIT,
    },
  ];

  const handleEdit = (dates: Date[]) => {
    setSelectedDatesForEdit(dates);
    setIsEditModalOpen(true);
  };

  const handleDateSelect = (dates: Date[]) => {
    setSelectedDates(dates);
  };

  const handleSaveEdit = (
    dates: Date[],
    status: AttendanceStatus | undefined,
  ) => {
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
        if (status === undefined) {
          if (existing) {
            const { status: _, ...rest } = existing;
            datesMap.set(key, { ...rest, status: undefined });
          }
        } else {
          if (existing) {
            datesMap.set(key, { ...existing, status });
          } else {
            datesMap.set(key, { date, status });
          }
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
              <LeaveIcon
                width={16}
                height={16}
                color="currentColor"
                className={styles.calendarIcon}
              />
              <span>{currentUnit}</span>
            </div>
          </div>
        </div>

        <div className={styles.summaryCards}>
          {isLoading ? (
            <>
              <AttendanceSummaryCardSkeleton />
              <UnitPeriodStatsCardSkeleton />
              <PeriodAllowanceCardSkeleton />
            </>
          ) : (
            <>
              <Suspense fallback={<AttendanceSummaryCardSkeleton />}>
                <AttendanceSummaryCard items={attendanceSummary} />
              </Suspense>
              <Suspense fallback={<UnitPeriodStatsCardSkeleton />}>
                <UnitPeriodStatsCard
                  totalAttendance={unitStats.totalAttendance}
                  totalAbsent={unitStats.totalAbsent}
                  totalUnrecorded={unitStats.totalUnrecorded}
                />
              </Suspense>
              <Suspense fallback={<PeriodAllowanceCardSkeleton />}>
                <PeriodAllowanceCard
                  amount={periodAllowance.amount}
                  dateRange={periodAllowance.dateRange}
                />
              </Suspense>
            </>
          )}
        </div>

        {isLoading ? (
          <CalendarSkeleton />
        ) : (
          <Card variant="solid" width="100%">
            <Suspense fallback={<CalendarSkeleton />}>
              <CalendarComponent
                dates={calendarDates}
                selectedDates={selectedDates}
                onDateSelect={handleDateSelect}
                initialMonth={currentMonth}
                onEdit={handleEdit}
                onMonthChange={handleMonthChange}
                unitColors={{
                  currentUnit: UNIT_COLORS.CURRENT_UNIT,
                  otherUnit: UNIT_COLORS.OTHER_UNIT,
                }}
              />
              <Suspense fallback={null}>
                <IconGuide items={iconGuideItems} />
              </Suspense>
            </Suspense>
          </Card>
        )}
      </div>

      {isEditModalOpen && (
        <Suspense fallback={null}>
          <EditAttendanceModal
            selectedDates={selectedDatesForEdit}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleSaveEdit}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Attendance;
