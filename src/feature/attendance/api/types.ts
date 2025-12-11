import type { AttendanceStatus } from "@/feature/session/api";

/**
 * Calendar 컴포넌트에서 사용하는 출결 상태
 */
export type CalendarAttendanceStatus =
  | "present"
  | "late"
  | "leftEarly"
  | "leave"
  | "annual"
  | "absent";

/**
 * 출결 등록/수정 요청
 */
export interface AttendanceRequest {
  userId: number;
  bootcampId: number;
  status: AttendanceStatus;
  classDates: string[];
}

/**
 * 출결 삭제 요청
 */
export interface AttendanceDeleteRequest {
  userId: number;
  bootcampId: number;
  classDates: string[];
}

/**
 * 단위 기간 출결 조회 응답
 */
export interface PeriodAttendanceResponse {
  userId: number;
  bootcampId: number;
  unitNo: number;
  periodStartDate: string;
  periodEndDate: string;
  attendanceList: {
    date: string;
    status: AttendanceStatus;
  }[];
}

/**
 * 총 출결 조회 응답
 */
export interface TotalAttendanceResponse {
  userId: number;
  bootcampId: number;
  totalPresent: number;
  totalAbsent: number;
  totalLate: number;
  totalLeftEarly: number;
  totalAnnual: number;
  totalLeave: number;
  totalNoSession: number;
  totalNoAttendance: number;
  attendanceRate: number;
}
