import type { DateData } from "@/shared/ui/Calendar";

/**
 * 날짜 범위 정보 (page-layer 전용)
 */
export interface DateRange {
  startedAt: Date;
  endedAt: Date;
  sessionCount: number;
}

/**
 * 캘린더 날짜 데이터 (확장) (page-layer 전용)
 */
export interface ExtendedDateData extends DateData {
  isCurrentUnit?: boolean;
  isOtherUnit?: boolean;
}

// Re-export entities types for backward compatibility
export type {
  BootcampOption,
  UnitPeriod,
  AttendanceSummaryValues,
  UnitStats,
  PeriodAllowance,
} from "@/entities/attendance/model";
