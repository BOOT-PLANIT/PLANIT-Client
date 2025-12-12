import type { DateData } from "@/shared/ui/Calendar";

/**
 * 단위 기간 정보
 */
export interface UnitPeriod {
  startDate: Date;
  endDate: Date;
  unitNumber: number;
}

/**
 * 부트캠프 옵션
 */
export interface BootcampOption {
  value: string;
  label: string;
  isKdt?: boolean;
}

/**
 * 날짜 범위 정보
 */
export interface DateRange {
  startDate: Date;
  endDate: Date;
  sessionCount: number;
}

/**
 * 출석 요약 값
 */
export interface AttendanceSummaryValues {
  present: number;
  late: number;
  leftEarly: number;
  leave: number;
  annual: number;
  absent: number;
}

/**
 * 단위 통계
 */
export interface UnitStats {
  totalAttendance: number;
  totalAbsent: number;
  totalUnrecorded: number;
  totalDays: number;
}

/**
 * 기간 수당 정보
 */
export interface PeriodAllowance {
  amount: number;
  dateRange: string;
}

/**
 * 캘린더 날짜 데이터 (확장)
 */
export interface ExtendedDateData extends DateData {
  isCurrentUnit?: boolean;
  isOtherUnit?: boolean;
}
