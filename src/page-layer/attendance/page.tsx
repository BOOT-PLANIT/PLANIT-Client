"use client";

import { useState, Suspense, lazy, useCallback } from "react";

import { ATTENDANCE_ICON_MAP } from "@/entities/attendance/model";
import {
  CARD_TITLES,
  ERROR_MESSAGES,
  ICON_GUIDE_LABELS,
  SUCCESS_MESSAGES,
  UNIT_COLORS,
} from "@/entities/attendance/model";
import { AttendanceSummaryCardSkeleton } from "@/entities/attendance/ui/AttendanceSummaryCard";
import { BootcampInfo } from "@/entities/bootcamp/ui/BootcampInfo";
import { useToast } from "@/shared/lib";
import { Card } from "@/shared/ui";
import { CalendarSkeleton, type AttendanceStatus } from "@/shared/ui/Calendar";
import { getErrorMessage } from "@/shared/utils";

import styles from "./Attendance.module.scss";
import {
  useAttendanceData,
  useAttendanceErrors,
  useAttendanceStats,
  useCalendarDates,
} from "./hooks";
import { IconGuide, PeriodAllowanceCard, UnitPeriodStatsCard } from "./ui";
import PeriodAllowanceCardSkeleton from "./ui/PeriodAllowanceCard/PeriodAllowanceCardSkeleton";
import { UnitIcon } from "./ui/UnitIcon";
import UnitPeriodStatsCardSkeleton from "./ui/UnitPeriodStatsCard/UnitPeriodStatsCardSkeleton";
import { mapCalendarStatusToApiStatus } from "./utils/apiTransform";
import { formatDatesToStrings } from "./utils/formatter";

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

const ICON_GUIDE_ITEMS: Array<{
  icon: React.ReactNode;
  label: string;
}> = [
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
    bootcampOptions,
    selectedBootcampId,
    allCalendarDates,
    unitPeriods,
    selectedBootcamp,
    isLoading,
    hasData,
    isErrorBootcamps,
    errorBootcamps,
    isErrorSessions,
    errorSessions,
    updateAttendanceMutation,
    deleteAttendanceMutation,
  } = useAttendanceData(selectedBootcampIndex, { userId });

  useAttendanceErrors({
    isErrorBootcamps,
    errorBootcamps,
    isErrorSessions,
    errorSessions,
  });

  const { calendarDates, selectedPeriod, dateRange } = useCalendarDates({
    allCalendarDates,
    unitPeriods,
    currentMonth,
  });

  const { attendanceSummaryValues, unitStats, periodAllowance } =
    useAttendanceStats({
      allCalendarDates,
      selectedPeriod,
      isKdt: selectedBootcamp?.isKdt,
    });

  const shouldShowSkeleton = isLoading || !hasData;

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const handleEdit = useCallback((dates: Date[]) => {
    setSelectedDatesForEdit(dates);
    setIsEditModalOpen(true);
  }, []);

  const handleDateSelect = useCallback((dates: Date[]) => {
    setSelectedDates(dates);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsEditModalOpen(false);
  }, []);

  const handleSaveEdit = useCallback(
    async (dates: Date[], status: AttendanceStatus | undefined) => {
      if (!selectedBootcampId) return;

      const classDates = formatDatesToStrings(dates);

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
    },
    [
      selectedBootcampId,
      userId,
      deleteAttendanceMutation,
      updateAttendanceMutation,
      toast,
    ],
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.headerSection}>
          <BootcampInfo
            options={bootcampOptions}
            selectedIndex={selectedBootcampIndex}
            onIndexChange={setSelectedBootcampIndex}
            dateRange={dateRange}
          />
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
              <IconGuide items={ICON_GUIDE_ITEMS} />
            </Suspense>
          </Card>
        )}
      </div>

      {isEditModalOpen && (
        <Suspense fallback={null}>
          <EditAttendanceModalLazy
            selectedDates={selectedDatesForEdit}
            onClose={handleCloseModal}
            onSave={handleSaveEdit}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Attendance;
