/**
 * 사용자 정보
 */
export interface User {
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
}

/**
 * FCM 토큰 저장/갱신 요청
 */
export interface FcmTokenRequest {
  fcmToken: string;
}
