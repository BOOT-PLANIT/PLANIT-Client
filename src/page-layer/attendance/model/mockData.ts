import type { AttendanceStatus, DateData } from "@/shared/ui";

export const generateBootcampOptions = () => [
  { value: "fullstack", label: "풀스택 웹 개발 부트캠프" },
  { value: "frontend", label: "프론트엔드 개발 부트캠프" },
  { value: "backend", label: "백엔드 개발 부트캠프" },
];

export const generateAttendanceSummary = () => [
  {
    status: "present" as AttendanceStatus,
    label: "출석",
    count: 13,
  },
  {
    status: "late" as AttendanceStatus,
    label: "지각",
    count: 2,
  },
  {
    status: "leftEarly" as AttendanceStatus,
    label: "조퇴",
    count: 2,
  },
  {
    status: "leave" as AttendanceStatus,
    label: "휴가",
    count: 2,
  },
  {
    status: "annual" as AttendanceStatus,
    label: "연차",
    count: 1,
  },
  {
    status: "absent" as AttendanceStatus,
    label: "결석",
    count: 0,
  },
];

export const generateUnitStats = () => ({
  totalAttendance: 9,
  totalAbsent: 0,
  totalUnrecorded: 0,
  totalDays: 9,
});

export const generatePeriodAllowance = () => ({
  amount: 500000,
  dateRange: "10월 14-25일",
});

export const generateCalendarDates = (): DateData[] => [
  { date: new Date(2025, 9, 1), status: "present" },
  { date: new Date(2025, 9, 2), status: "present" },
  { date: new Date(2025, 9, 3), status: "late" },
  { date: new Date(2025, 9, 4), status: "leave" },
  { date: new Date(2025, 9, 7), status: "present" },
  { date: new Date(2025, 9, 8), status: "leftEarly" },
  { date: new Date(2025, 9, 9), status: "present" },
  { date: new Date(2025, 9, 10), status: "present" },
  { date: new Date(2025, 9, 11), status: "late" },
  { date: new Date(2025, 9, 14), status: "present", hasSession: true },
  { date: new Date(2025, 9, 15), status: "present", hasSession: true },
  { date: new Date(2025, 9, 16), status: "present", hasSession: true },
  { date: new Date(2025, 9, 17), status: "present", hasSession: true },
  { date: new Date(2025, 9, 18), status: "annual" },
  { date: new Date(2025, 9, 21), status: "present", hasSession: true },
  { date: new Date(2025, 9, 22), status: "present", hasSession: true },
  { date: new Date(2025, 9, 23), status: "present", hasSession: true },
  { date: new Date(2025, 9, 24), status: "present", hasSession: true },
  { date: new Date(2025, 9, 25), status: "leave" },
  { date: new Date(2025, 9, 28), status: "present" },
];

export const getCurrentUnit = () => "2025년 10월 14일 - 10월 25일 (9일)";
