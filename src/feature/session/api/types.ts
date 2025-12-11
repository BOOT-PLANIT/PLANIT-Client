/**
 * 출결 상태
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
