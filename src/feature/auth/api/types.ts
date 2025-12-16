/**
 * 로그인 요청
 */
export interface LoginRequest {
  token: string;
}

/**
 * 로그인 응답
 */
export interface LoginResponse {
  userId: number;
  recentBootcampId: number | null;
}
