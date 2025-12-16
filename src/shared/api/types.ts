/**
 * API 공통 응답 형식
 */
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

/**
 * 출결 상태 (API)
 */
export type AttendanceStatus =
  | "present"
  | "absent"
  | "late"
  | "left_early"
  | "annual"
  | "leave"
  | "no_session"
  | "no_attendance";

/**
 * 부트캠프 정보 (공통 타입)
 */
export interface Bootcamp {
  id: number;
  name: string;
  organizer: string;
  isKdt: boolean;
  startedAt: string;
  endedAt: string;
  isEnded: boolean;
  classDates: string[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * 내 부트캠프 목록 (등록 정보)
 */
export interface Enrollment {
  id: number; // enrollment ID
  userId: number;
  bootcampId: number;
  name: string;
  organizer: string;
  isKdt: boolean;
  startedAt: string;
  endedAt: string;
  enrolledAt: string;
  isEnded: boolean;
}

/**
 * 세션 정보
 */
export interface Session {
  id: number;
  bootcampId: number;
  classDate: string;
  unitNo: number;
  periodStartDate: string;
  periodEndDate: string;
  attendance?: {
    status: AttendanceStatus;
    userId: number;
  };
}
