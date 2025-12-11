import { useQuery } from "@tanstack/react-query";

import type { ApiResponse } from "@/shared/api";
import { apiClient } from "@/shared/api";

import type { Session } from "./types";

/**
 * 세션과 출결 상태 조회
 */
export const useSessionsWithAttendance = (
  bootcampId: number | null,
  userId: number | null,
) => {
  return useQuery<ApiResponse<Session[]>>({
    queryKey: [
      "sessions",
      "bootcamp",
      bootcampId,
      "user",
      userId,
      "attendance",
    ],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Session[]>>(
        `/sessions/bootcamp/${bootcampId}/user/${userId}/attendance`,
      );
      return response.data;
    },
    enabled: !!bootcampId && !!userId,
  });
};
