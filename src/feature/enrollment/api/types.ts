/**
 * 내 부트캠프 목록 (등록 정보)
 */
export interface Enrollment {
  id: number; // enrollment ID
  userId: number;
  bootcampId: number;
  name: string;
  organizer: string;
  isKdt: boolean;
  startedAt: string;
  endedAt: string;
  enrolledAt: string;
  isEnded: boolean;
}
