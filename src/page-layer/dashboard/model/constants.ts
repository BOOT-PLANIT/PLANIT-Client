import type { CalendarAttendanceStatus } from "@/shared/ui/Calendar";

export const attendanceGuideTextMap: Record<CalendarAttendanceStatus, string> =
  {
    present: "출석 완료! 오늘도 한 칸 전진했어요 👏✨",
    late: "조금 늦었지만 괜찮아요! 다음엔 더 빨리 ⏰🙂",
    absent: "오늘은 쉬어가는 날… 내일은 꼭 만나요 😢",
    leftEarly: "외출·조퇴 처리됐어요. 무리하지 말아요 🏃‍♂️💨",
    annual: "연차 사용! 휴식도 중요한 학습이에요 🌴😌",
    leave: "공가 처리 완료! 다녀와서 다시 이어가요 🚶‍♀️✨",
  };
