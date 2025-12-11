"use client";

import { useState, Suspense, lazy, useMemo, useEffect } from "react";

import { ATTENDANCE_ICON_MAP } from "@/entities/attendance/model";
import {
  CARD_TITLES,
  ERROR_MESSAGES,
  ICON_GUIDE_LABELS,
  SUCCESS_MESSAGES,
  UNIT_COLORS,
} from "@/entities/attendance/model";
import { AttendanceSummaryCardSkeleton } from "@/entities/attendance/ui/AttendanceSummaryCard";
import {
  useMyBootcamps,
  useSessionsWithAttendance,
  useUpdateAttendance,
  useDeleteAttendance,
} from "@/feature/attendance/api";
import { LeaveIcon } from "@/shared/assets/icons";
import { useToast } from "@/shared/lib";
import { Card, Combobox } from "@/shared/ui";
import type { AttendanceStatus } from "@/shared/ui/Calendar";
import { getErrorMessage, isNetworkError } from "@/shared/utils";

import CalendarSkeleton from "../../shared/ui/Calendar/CalendarSkeleton";

import styles from "./Attendance.module.scss";
import { generateMockBootcamps, generateMockSessions } from "./model/mockData";
import { IconGuide, PeriodAllowanceCard, UnitPeriodStatsCard } from "./ui";
import PeriodAllowanceCardSkeleton from "./ui/PeriodAllowanceCard/PeriodAllowanceCardSkeleton";
import { UnitIcon } from "./ui/UnitIcon";
import UnitPeriodStatsCardSkeleton from "./ui/UnitPeriodStatsCard/UnitPeriodStatsCardSkeleton";
import {
  extractUnitPeriods,
  mapCalendarStatusToApiStatus,
  transformBootcampsToOptions,
  transformSessionsToDateData,
} from "./utils/apiTransform";
import {
  calculatePeriodAllowance,
  calculateStatusCounts,
  calculateUnitStats,
} from "./utils/calculator";

const AttendanceSummaryCard = lazy(() =>
  import("@/entities/attendance/ui/AttendanceSummaryCard").then((module) => ({
    default: module.AttendanceSummaryCard,
  })),
);

const CalendarComponent = lazy(() =>
  import("@/shared/ui").then((module) => ({
    default: module.Calendar,
  })),
);

const EditAttendanceModalLazy = lazy(() =>
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
  // TODO: 인증에서 userId 가져오기
  const userId = 1;
  const toast = useToast();

  const [selectedBootcampIndex, setSelectedBootcampIndex] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDatesForEdit, setSelectedDatesForEdit] = useState<Date[]>([]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const {
    data: bootcampSummaryData,
    isLoading: isLoadingBootcamps,
    isError: isErrorBootcamps,
    error: errorBootcamps,
  } = useMyBootcamps();

  const shouldUseMocks =
    process.env.NEXT_PUBLIC_USE_ATTENDANCE_MOCKS === "true";

  const finalBootcampData = useMemo(() => {
    if (
      shouldUseMocks &&
      isErrorBootcamps &&
      errorBootcamps &&
      isNetworkError(errorBootcamps)
    ) {
      return generateMockBootcamps();
    }
    return bootcampSummaryData;
  }, [shouldUseMocks, isErrorBootcamps, errorBootcamps, bootcampSummaryData]);

  const bootcampOptions = useMemo(() => {
    if (!finalBootcampData?.data) return [];
    return transformBootcampsToOptions(finalBootcampData.data);
  }, [finalBootcampData]);

  const selectedBootcampId = useMemo(() => {
    if (bootcampOptions.length === 0 || selectedBootcampIndex < 0) return null;
    const selectedOption = bootcampOptions[selectedBootcampIndex];
    return selectedOption ? Number(selectedOption.value) : null;
  }, [bootcampOptions, selectedBootcampIndex]);

  const {
    data: sessionsData,
    isLoading: isLoadingSessions,
    isError: isErrorSessions,
    error: errorSessions,
  } = useSessionsWithAttendance(selectedBootcampId, userId);

  const finalSessionsData = useMemo(() => {
    if (
      shouldUseMocks &&
      isErrorSessions &&
      errorSessions &&
      isNetworkError(errorSessions)
    ) {
      const mockBootcampId = finalBootcampData?.data?.[0]?.id || 1;
      return generateMockSessions(mockBootcampId, userId);
    }
    return sessionsData;
  }, [
    shouldUseMocks,
    isErrorSessions,
    errorSessions,
    sessionsData,
    finalBootcampData,
    userId,
  ]);

  const allCalendarDates = useMemo(() => {
    if (!finalSessionsData?.data) return [];
    return transformSessionsToDateData(finalSessionsData.data);
  }, [finalSessionsData]);

  const unitPeriods = useMemo(() => {
    if (!finalSessionsData?.data) return [];
    return extractUnitPeriods(finalSessionsData.data);
  }, [finalSessionsData]);

  const updateAttendanceMutation = useUpdateAttendance();
  const deleteAttendanceMutation = useDeleteAttendance();

  const isLoading = isLoadingBootcamps || isLoadingSessions;
  const hasData = finalBootcampData?.data && finalSessionsData?.data;

  useEffect(() => {
    if (isErrorBootcamps && errorBootcamps && !isNetworkError(errorBootcamps)) {
      const message = getErrorMessage(
        errorBootcamps,
        ERROR_MESSAGES.FETCH_BOOTCAMPS_FAILED,
        ERROR_MESSAGES.NETWORK_ERROR,
      );
      toast.error(message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorBootcamps, errorBootcamps]);

  useEffect(() => {
    if (isErrorSessions && errorSessions && !isNetworkError(errorSessions)) {
      const message = getErrorMessage(
        errorSessions,
        ERROR_MESSAGES.FETCH_SESSIONS_FAILED,
        ERROR_MESSAGES.NETWORK_ERROR,
      );
      toast.error(message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorSessions, errorSessions]);

  const shouldShowSkeleton = isLoading || !hasData;

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

  const attendanceSummaryValues = {
    present: statusCounts.present || 0,
    late: statusCounts.late || 0,
    leftEarly: statusCounts.leftEarly || 0,
    leave: statusCounts.leave || 0,
    annual: statusCounts.annual || 0,
    absent: statusCounts.absent || 0,
  };

  const unitStats = calculateUnitStats(periodDates, statusCounts);

  const selectedBootcamp = bootcampOptions[selectedBootcampIndex];
  const periodAllowance = calculatePeriodAllowance(
    selectedPeriod,
    unitStats.totalAttendance,
    selectedBootcamp?.isKdt ?? false,
  );

  const iconGuideItems = [
    {
      icon: ATTENDANCE_ICON_MAP.present,
      label: ICON_GUIDE_LABELS.present,
    },
    {
      icon: ATTENDANCE_ICON_MAP.late,
      label: ICON_GUIDE_LABELS.late,
    },
    {
      icon: ATTENDANCE_ICON_MAP.leftEarly,
      label: ICON_GUIDE_LABELS.leftEarly,
    },
    {
      icon: ATTENDANCE_ICON_MAP.leave,
      label: ICON_GUIDE_LABELS.leave,
    },
    {
      icon: ATTENDANCE_ICON_MAP.annual,
      label: ICON_GUIDE_LABELS.annual,
    },
    {
      icon: ATTENDANCE_ICON_MAP.absent,
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

  const handleSaveEdit = async (
    dates: Date[],
    status: AttendanceStatus | undefined,
  ) => {
    if (!selectedBootcampId) return;

    const classDates = dates.map((date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    });

    try {
      if (status === undefined) {
        await deleteAttendanceMutation.mutateAsync({
          userId,
          bootcampId: selectedBootcampId,
          classDates,
        });
        toast.success(SUCCESS_MESSAGES.ATTENDANCE_DELETED);
      } else {
        const apiStatus = mapCalendarStatusToApiStatus(status);
        if (apiStatus) {
          await updateAttendanceMutation.mutateAsync({
            userId,
            bootcampId: selectedBootcampId,
            status: apiStatus,
            classDates,
          });
          toast.success(SUCCESS_MESSAGES.ATTENDANCE_SAVED);
        }
      }
    } catch (error) {
      const defaultMessage =
        status === undefined
          ? ERROR_MESSAGES.DELETE_ATTENDANCE_FAILED
          : ERROR_MESSAGES.SAVE_ATTENDANCE_FAILED;

      const message = getErrorMessage(
        error,
        defaultMessage,
        ERROR_MESSAGES.NETWORK_ERROR,
      );
      toast.error(message);
      return;
    }

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
          {shouldShowSkeleton ? (
            <>
              <AttendanceSummaryCardSkeleton
                title={CARD_TITLES.ATTENDANCE_SUMMARY}
              />
              <UnitPeriodStatsCardSkeleton />
              <PeriodAllowanceCardSkeleton />
            </>
          ) : (
            <>
              <Suspense
                fallback={
                  <AttendanceSummaryCardSkeleton
                    title={CARD_TITLES.ATTENDANCE_SUMMARY}
                  />
                }
              >
                <AttendanceSummaryCard
                  title={CARD_TITLES.ATTENDANCE_SUMMARY}
                  values={attendanceSummaryValues}
                />
              </Suspense>
              <UnitPeriodStatsCard
                totalAttendance={unitStats.totalAttendance}
                totalAbsent={unitStats.totalAbsent}
                totalUnrecorded={unitStats.totalUnrecorded}
              />
              <PeriodAllowanceCard
                amount={periodAllowance.amount}
                dateRange={periodAllowance.dateRange}
              />
            </>
          )}
        </div>

        {shouldShowSkeleton ? (
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
              <IconGuide items={iconGuideItems} />
            </Suspense>
          </Card>
        )}
      </div>

      {isEditModalOpen && (
        <Suspense fallback={null}>
          <EditAttendanceModalLazy
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
