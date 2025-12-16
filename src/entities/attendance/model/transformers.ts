import type {
  AttendanceStatus as ApiAttendanceStatus,
  Bootcamp,
  Enrollment,
  Session,
} from "@/shared/api";
import type { DateData } from "@/shared/ui/Calendar";
import type { AttendanceStatus as CalendarAttendanceStatus } from "@/shared/ui/Calendar";
import { parseDateString } from "@/shared/utils";

/**
 * API 출결 상태를 Calendar 출결 상태로 변환
 */
export const mapApiStatusToCalendarStatus = (
  apiStatus: ApiAttendanceStatus | undefined,
): CalendarAttendanceStatus | undefined => {
  if (!apiStatus) return undefined;

  const statusMap: Record<
    ApiAttendanceStatus,
    CalendarAttendanceStatus | undefined
  > = {
    present: "present",
    absent: "absent",
    late: "late",
    left_early: "leftEarly",
    annual: "annual",
    leave: "leave",
    no_session: undefined,
    no_attendance: undefined,
  };

  return statusMap[apiStatus];
};

/**
 * 부트캠프 목록을 Combobox 옵션 형식으로 변환
 * Bootcamp 또는 Enrollment 타입 모두 지원
 */
export const transformBootcampsToOptions = (
  bootcamps: (Bootcamp | Enrollment)[],
) => {
  return bootcamps.map((bootcamp) => ({
    value: bootcamp.id.toString(),
    label: bootcamp.name,
    isKdt: bootcamp.isKdt,
  }));
};

/**
 * 세션 데이터를 DateData 배열로 변환
 */
export const transformSessionsToDateData = (
  sessions: Session[],
): DateData[] => {
  return sessions.map((session) => {
    const date = parseDateString(session.classDate);
    const status = mapApiStatusToCalendarStatus(session.attendance?.status);

    return {
      date,
      status,
    };
  });
};

/**
 * 세션에서 단위 기간 정보 추출
 */
export const extractUnitPeriods = (sessions: Session[]) => {
  const periodMap = new Map<
    string,
    { startDate: Date; endDate: Date; unitNumber: number }
  >();

  sessions.forEach((session) => {
    const key = `${session.periodStartDate}-${session.periodEndDate}`;
    if (!periodMap.has(key)) {
      periodMap.set(key, {
        startDate: parseDateString(session.periodStartDate),
        endDate: parseDateString(session.periodEndDate),
        unitNumber: session.unitNo,
      });
    }
  });

  return Array.from(periodMap.values()).sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime(),
  );
};
