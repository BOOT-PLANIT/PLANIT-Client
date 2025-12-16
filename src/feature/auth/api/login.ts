import { apiClient } from "@/shared/api";
import type { ApiResponse } from "@/shared/api";

export async function login(idToken: string) {
  const res = await apiClient.post<
    ApiResponse<{ userId: number; recentBootcampId: number | null }>
  >("/auth/login", null, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  return res.data.data;
}
