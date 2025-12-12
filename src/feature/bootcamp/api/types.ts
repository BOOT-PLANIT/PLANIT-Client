/**
 * 부트캠프 정보
 */
export interface Bootcamp {
  id: number;
  name: string;
  organizer: string;
  isKdt: boolean;
  startDate: string;
  endDate: string;
  isEnded: boolean;
}
export interface BootcampTest {
  id: number;
  name: string;
  organizer: string;
  isKdt: boolean;
  startedAt: string;
  endedAt: string;
  isEnded: boolean;
  classDates: string[];
}

/**
 * 부트캠프 목록 응답
 */
export interface BootcampSummaryResponse {
  totalCount: number;
  bootcamps: Bootcamp[];
}

/**
 * 부트캠프 등록/수정 요청
 */
export interface BootcampRequest {
  name: string;
  organizer: string;
  isKdt: boolean;
  classDates: string[];
}

/**
 * 부트캠프 텍스트 파싱 요청
 */
export interface BootcampParseRequest {
  text: string;
}

/**
 * 부트캠프 텍스트 파싱 응답
 */
export interface BootcampParseResponse {
  name: string;
  organizer: string;
  isKdt: boolean;
  classDates: string[];
}

/**
 * 부트캠프 목록 조회 쿼리 파라미터
 */
export interface BootcampListParams {
  page?: number;
  size?: number;
}

/**
 * 부트캠프 검색 쿼리 파라미터
 */
export interface BootcampSearchParams {
  keyword: string;
  page?: number;
  size?: number;
}
