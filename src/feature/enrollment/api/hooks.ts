import { useQuery } from "@tanstack/react-query";

import type { ApiResponse } from "@/shared/api";
import { apiClient } from "@/shared/api";

import type { Enrollment } from "./types";

/**
 * 내 부트캠프 목록 조회 (등록 정보)
 */
export const useMyBootcamps = () => {
  return useQuery<ApiResponse<Enrollment[]>>({
    queryKey: ["enrollments"],
    queryFn: async () => {
      const response =
        await apiClient.get<ApiResponse<Enrollment[]>>("/enrollments");
      return response.data;
    },
  });
};
