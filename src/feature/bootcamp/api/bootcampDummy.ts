import type { Bootcamp } from "@/shared/api";

// 랜덤 날짜 생성 도우미
function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

// 날짜 YYYY-MM-DD 포맷 변환
function format(d: Date) {
  return d.toISOString().split("T")[0];
}

// 랜덤 classDates 생성
function generateClassDates(start: Date, end: Date) {
  const days = Math.floor(Math.random() * 35) + 5; // 5~40일 랜덤
  const list: string[] = [];

  for (let i = 0; i < days; i++) {
    const dt = new Date(start);
    dt.setDate(dt.getDate() + i);
    if (dt > end) break;
    list.push(format(dt));
  }
  return list;
}

// 랜덤 기관명
const organizers = [
  "한국IT교육원",
  "KDT연구소",
  "코딩아카데미",
  "데이터사이언스랩",
  "AI융합센터",
  "웹개발자스쿨",
  "파트너스아카데미",
  "코드업캠프",
  "인공지능개발원",
  "소프트웨어교육협회",
];

// 랜덤 부트캠프 이름
const campNames = [
  "『ITQ 쪽집게 강의』 ITQ OA Master(한글+파워포인트+엑셀) 자격증 취득 과정",
  "ChatGPT 마스터 클래스 : 남들보다 100배 더 잘 쓰기 위한 활용법 A to Z",
  "웹 개발 기초 부트캠프",
  "KDT 프론트엔드 심화 과정",
  "백엔드 스프링 부트 실전",
  "데이터 분석 입문 캠프",
  "AI 기반 풀스택 개발자 과정",
  "Python 기반 데이터 처리 과정",
  "React 실전 프로젝트 캠프",
  "Node.js 백엔드 마스터",
  "SQL·DB 전문가 과정",
  "클라우드(AWS) 엔지니어 준비반",
];
//더미생성
export const bootcampDummy: Bootcamp[] = Array.from({ length: 100 }).map(
  (_, i) => {
    const name = campNames[Math.floor(Math.random() * campNames.length)];
    const organizer = organizers[Math.floor(Math.random() * organizers.length)];
    const isKdt = Math.random() > 0.5;

    // 랜덤 시작/종료일
    const startDate = randomDate(new Date(2025, 0, 1), new Date(2025, 11, 1));
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 120) + 30); // 30~150일 코스

    const classDates = generateClassDates(startDate, endDate);

    return {
      id: i + 1,
      name,
      organizer,
      isKdt,
      startedAt: format(startDate),
      endedAt: format(endDate),
      isEnded: endDate < new Date(),
      classDates,
    };
  },
);
