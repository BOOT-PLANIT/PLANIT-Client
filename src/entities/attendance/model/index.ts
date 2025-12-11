export * from "./mappers";

export const ATTENDANCE_STATUS_LABELS = {
  present: "출석",
  late: "지각",
  leftEarly: "조퇴",
  leave: "공가",
  annual: "월차",
  absent: "결석",
} as const;
