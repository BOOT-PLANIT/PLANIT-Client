/**
 * 내 정보 조회 응답
 */

export interface MeResponse {
  id: number;
  uid: string;
  email: string;
  displayName: string;
  photoUrl: string;
  userLevel: "USER" | "ADMIN";
  provider: string;
  emailVerified: boolean;
  createdAt: string;
  lastLoginAt: string;
  recentBootcampId: number | null;
}

/**
 * FCM 토큰 저장/갱신 요청
 */
export interface FcmTokenRequest {
  fcmToken: string;
}
