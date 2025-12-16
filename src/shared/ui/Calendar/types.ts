/**
 * Calendar 컴포넌트에서 사용하는 출결 상태
 * UI 레이어에서 사용하는 출결 상태 타입 (camelCase)
 */
export type CalendarAttendanceStatus =
  | "present"
  | "late"
  | "leftEarly"
  | "leave"
  | "annual"
  | "absent";

/**
 * Calendar 컴포넌트에서 사용하는 날짜 데이터
 */
export interface DateData {
  date: Date;
  status?: CalendarAttendanceStatus;
  isCurrentUnit?: boolean;
  isOtherUnit?: boolean;
}
