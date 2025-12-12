import type { Bootcamp } from "@/feature/bootcamp/api";
import type { Session } from "@/feature/session/api";
import type { ApiResponse } from "@/shared/api/types";
import type { DateData } from "@/shared/ui/Calendar";

export const generateBootcampOptions = () => [
  { value: "fullstack", label: "풀스택 웹 개발 부트캠프", isKdt: true },
  { value: "frontend", label: "프론트엔드 개발 부트캠프", isKdt: false },
  { value: "backend", label: "백엔드 개발 부트캠프", isKdt: false },
];

// API 응답 형식의 부트캠프 목업 데이터 생성
export const generateMockBootcamps = (): ApiResponse<Bootcamp[]> => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth(), 25);
  const endDate = new Date(today.getFullYear() + 1, today.getMonth() + 6, 24);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return {
    code: 200,
    message: "부트캠프 목록 조회 성공",
    data: [
      {
        id: 1,
        name: "풀스택 웹 개발 부트캠프",
        organizer: "K-Digital Training",
        isKdt: true,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        isEnded: false,
      },
    ],
  };
};

// API 응답 형식의 세션 목업 데이터 생성
export const generateMockSessions = (
  bootcampId: number,
  _userId: number,
): ApiResponse<Session[]> => {
  const unitPeriods = generateUnitPeriods();
  const sessions: Session[] = [];
  let sessionId = 1;

  for (const period of unitPeriods) {
    const startDate = new Date(period.startDate);
    const endDate = new Date(period.endDate);
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();

      // 주말 제외
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        const formatDate = (date: Date): string => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
        };

        sessions.push({
          id: sessionId++,
          bootcampId,
          classDate: formatDate(currentDate),
          unitNo: period.unitNumber,
          periodStartDate: formatDate(period.startDate),
          periodEndDate: formatDate(period.endDate),
        });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  return {
    code: 200,
    message: "세션 목록 조회 성공",
    data: sessions,
  };
};

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
