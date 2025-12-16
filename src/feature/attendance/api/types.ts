import type { AttendanceStatus } from "@/shared/api";
import type { CalendarAttendanceStatus } from "@/shared/ui/Calendar";

// CalendarAttendanceStatus를 re-export하여 feature 레이어에서 사용 가능하도록 함
export type { CalendarAttendanceStatus };

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

/**
 * 일단위 출결 조회 응답
 */
export interface DailyAttendanceResponse {
  userId: number;
  bootcampId: number;
  date: string;
  status: AttendanceStatus;
}

/**
 * 완료된 단위 기간 출결 리스트 조회 응답
 */
export type PeriodAttendanceListResponse = PeriodAttendanceResponse[];

/**
 * 월차 잔여/누적 사용량 조회 응답
 */
export interface AttendanceBalanceResponse {
  userId: number;
  bootcampId: number;
  usedLeave: number;
  receivedLeave: number;
  remainingLeave: number;
}

/**
 * 휴가 목록 조회 응답
 */
export interface LeaveListResponse {
  date: string;
  status: AttendanceStatus;
  userId: number;
}
