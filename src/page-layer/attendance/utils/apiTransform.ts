import type { CalendarAttendanceStatus } from "@/feature/attendance/api";
import type { AttendanceStatus as ApiAttendanceStatus } from "@/shared/api";

/**
 * Calendar 출결 상태를 API 출결 상태로 변환
 * (page-layer 전용: UI에서 API로 변환)
 */
export const mapCalendarStatusToApiStatus = (
  calendarStatus: CalendarAttendanceStatus | undefined,
): ApiAttendanceStatus | undefined => {
  if (!calendarStatus) return undefined;

  const statusMap: Record<CalendarAttendanceStatus, ApiAttendanceStatus> = {
    present: "present",
    absent: "absent",
    late: "late",
    leftEarly: "left_early",
    annual: "annual",
    leave: "leave",
  };

  return statusMap[calendarStatus];
};
