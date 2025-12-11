/**
 * Attendance 페이지에서 사용되는 공통 상수들
 */

// 카드 타이틀
export const CARD_TITLES = {
  ATTENDANCE_SUMMARY: "출석 요약",
  PERIOD_STATS: "기간 통계",
  PERIOD_ALLOWANCE: "기간 수당",
} as const;

// 출석 상태 라벨
export const ATTENDANCE_STATUS_LABELS = {
  present: "출석",
  late: "지각",
  leftEarly: "조퇴",
  leave: "공가",
  annual: "월차",
  absent: "결석",
} as const;

// 통계 라벨
export const STATS_LABELS = {
  TOTAL_ATTENDANCE: "총출석",
  TOTAL_ABSENT: "총결석",
  UNRECORDED: "미출결",
} as const;

// 아이콘 가이드 라벨
export const ICON_GUIDE_LABELS = {
  ...ATTENDANCE_STATUS_LABELS,
  CURRENT_UNIT: "현재 단위 기간",
  OTHER_UNIT: "다른 단위 기간",
} as const;

// 단위 기간 색상
export const UNIT_COLORS = {
  CURRENT_UNIT: "var(--color-purple-lightest)",
  OTHER_UNIT: "var(--color-yellow-lightest)",
} as const;
