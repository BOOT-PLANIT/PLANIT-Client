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
}

/**
 * 부트캠프 목록 응답
 */
export interface BootcampSummaryResponse {
  totalCount: number;
  bootcamps: Bootcamp[];
}
