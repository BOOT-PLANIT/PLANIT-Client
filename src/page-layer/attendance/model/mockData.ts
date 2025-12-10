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
    label: "공가",
    count: 2,
  },
  {
    status: "annual" as AttendanceStatus,
    label: "월차",
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

// 단위기간 생성: 2025년 8월 25일부터 2026년 3월 24일까지 1달 단위
export const generateUnitPeriods = (): Array<{
  startDate: Date;
  endDate: Date;
  unitNumber: number;
}> => {
  const periods: Array<{
    startDate: Date;
    endDate: Date;
    unitNumber: number;
  }> = [];

  // 2025년 8월 25일부터 시작
  let startYear = 2025;
  let startMonth = 7; // 8월 (0-indexed)
  let unitNumber = 1;

  // 2026년 3월 24일까지 (마지막 단위기간의 종료일)
  const finalEndYear = 2026;
  const finalEndMonth = 2; // 3월 (0-indexed)

  while (
    startYear < finalEndYear ||
    (startYear === finalEndYear && startMonth < finalEndMonth)
  ) {
    const startDate = new Date(startYear, startMonth, 25);
    // 다음 달 24일까지
    const endDate = new Date(startYear, startMonth + 1, 24);

    periods.push({
      startDate,
      endDate,
      unitNumber,
    });

    // 다음 단위기간 시작일 계산
    startMonth++;
    if (startMonth > 11) {
      startMonth = 0;
      startYear++;
    }
    unitNumber++;
  }

  return periods;
};

// 모든 출석 데이터 생성 (단위기간에 속한 날짜는 isCurrentUnit 설정)
// 단위기간 전체에 대해 주말을 제외한 모든 날짜 생성, status는 null
export const generateCalendarDates = (): DateData[] => {
  const unitPeriods = generateUnitPeriods();
  const dates: DateData[] = [];

  // 각 단위기간의 모든 날짜 생성
  for (const period of unitPeriods) {
    const startDate = new Date(period.startDate);
    const endDate = new Date(period.endDate);
    const currentDate = new Date(startDate);

    // 시작일부터 종료일까지 모든 날짜 순회
    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay(); // 0: 일요일, 6: 토요일

      // 주말 제외
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        dates.push({
          date: new Date(currentDate),
          status: undefined, // null 대신 undefined 사용 (TypeScript에서 optional)
        });
      }

      // 다음 날로 이동
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  return dates;
};
