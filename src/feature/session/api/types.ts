export type { AttendanceStatus, Session } from "@/shared/api";

export interface SessionAttendanceStatusItem {
  sessionId: number;
  bootcampId: number;
  periodId: number;
  classDate: string;
  unitNo: number;
  attendanceStatus: import("@/shared/api").AttendanceStatus;
}

/**
 * 세션 등록 요청
 */
export interface SessionCreateRequest {
  bootcampId: number;
  sessions: {
    classDate: string;
  }[];
}

/**
 * 세션 삭제 요청
 */
export interface SessionDeleteRequest {
  sessionIds: number[];
}
