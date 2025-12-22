import { ATTENDANCE_ICON_MAP } from "@/entities/attendance/model";
import type { CalendarAttendanceStatus } from "@/shared/ui/Calendar";

// 기존 코드와의 호환성을 위해 AttendanceStatus로 alias
type AttendanceStatus = CalendarAttendanceStatus;

export const attendanceOptions: {
  value: AttendanceStatus;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "present",
    label: "출석",
    icon: ATTENDANCE_ICON_MAP.present,
  },
  {
    value: "late",
    label: "지각",
    icon: ATTENDANCE_ICON_MAP.late,
  },
  {
    value: "leftEarly",
    label: "외출 · 조퇴",
    icon: ATTENDANCE_ICON_MAP.leftEarly,
  },
  {
    value: "leave",
    label: "공가",
    icon: ATTENDANCE_ICON_MAP.leave,
  },
  {
    value: "annual",
    label: "월차",
    icon: ATTENDANCE_ICON_MAP.annual,
  },
  {
    value: "absent",
    label: "결석",
    icon: ATTENDANCE_ICON_MAP.absent,
  },
];
