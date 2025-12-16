import type { PeriodAllowance, UnitStats } from "@/entities/attendance/model";
import type { CalendarAttendanceStatus } from "@/feature/attendance/api";
import type { DateData } from "@/shared/ui/Calendar";

type AttendanceStatus = CalendarAttendanceStatus;

/**
 * 수당 정책 상수
 */
const DAILY_ALLOWANCE_KDT = 15800; // KDT 일일 수당 (원)
const DAILY_ALLOWANCE_GENERAL = 5800; // 일반 일일 수당 (원)
const MAX_ATTENDANCE_DAYS = 20; // 최대 출석일 수

interface Period {
  startDate: Date;
  endDate: Date;
}

/**
 * 출석 상태별 개수 계산
 */
export const calculateStatusCounts = (
  periodDates: DateData[],
): Record<AttendanceStatus, number> => {
  return periodDates.reduce(
    (acc, dateData) => {
      if (dateData.status) {
        acc[dateData.status] = (acc[dateData.status] ?? 0) + 1;
      }
      return acc;
    },
    {} as Record<AttendanceStatus, number>,
  );
};

/**
 * 단위 통계 계산
 * - 공가와 월차는 출석으로 인정
 * - 조퇴와 지각은 합쳐서 3회마다 1회 결석 처리, 나머지는 출석 처리
 */
export const calculateUnitStats = (
  periodDates: DateData[],
  statusCounts: Record<AttendanceStatus, number>,
): UnitStats => {
  const totalDays = periodDates.length;
  const lateAndLeftEarlyCount =
    (statusCounts.late ?? 0) + (statusCounts.leftEarly ?? 0);
  const lateAndLeftEarlyAbsentCount = Math.floor(lateAndLeftEarlyCount / 3);
  const lateAndLeftEarlyAttendanceCount =
    lateAndLeftEarlyAbsentCount * 2 + (lateAndLeftEarlyCount % 3);

  const totalAttendance =
    (statusCounts.present ?? 0) +
    lateAndLeftEarlyAttendanceCount +
    (statusCounts.leave ?? 0) +
    (statusCounts.annual ?? 0);
  const totalAbsent = (statusCounts.absent ?? 0) + lateAndLeftEarlyAbsentCount;
  const totalUnrecorded =
    totalDays -
    (statusCounts.present ?? 0) -
    (statusCounts.late ?? 0) -
    (statusCounts.leftEarly ?? 0) -
    (statusCounts.leave ?? 0) -
    (statusCounts.annual ?? 0) -
    (statusCounts.absent ?? 0);

  return {
    totalAttendance,
    totalAbsent,
    totalUnrecorded: Math.max(0, totalUnrecorded),
    totalDays,
  };
};

/**
 * 기간 수당 정보 계산
 * - isKdt가 true일 경우: 출석일 하루당 15,800원
 * - isKdt가 false일 경우: 출석일 하루당 5,800원
 * - 최대 20일까지 누적
 */
export const calculatePeriodAllowance = (
  selectedPeriod: Period | null,
  totalAttendance: number,
  isKdt: boolean,
): PeriodAllowance => {
  if (!selectedPeriod) {
    return { amount: 0, dateRange: "" };
  }

  const dailyAllowance = isKdt ? DAILY_ALLOWANCE_KDT : DAILY_ALLOWANCE_GENERAL;
  const attendanceDays = Math.min(totalAttendance, MAX_ATTENDANCE_DAYS);
  const amount = attendanceDays * dailyAllowance;

  return {
    amount,
    dateRange: `${selectedPeriod.startDate.toLocaleDateString("ko-KR", {
      month: "long",
      day: "numeric",
    })}-${selectedPeriod.endDate.toLocaleDateString("ko-KR", {
      month: "long",
      day: "numeric",
    })}`,
  };
};
