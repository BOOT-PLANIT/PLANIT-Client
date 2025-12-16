import { useQuery } from "@tanstack/react-query";

import type { ApiResponse } from "@/shared/api";
import { apiClient } from "@/shared/api";

import type { Enrollment } from "./types";

/**
 * 내 부트캠프 목록 조회
 */
export const useMyBootcamps = () => {
  return useQuery<ApiResponse<Enrollment[]>>({
    queryKey: ["my-bootcamps"],
    queryFn: async () => {
      const response =
        await apiClient.get<ApiResponse<Enrollment[]>>("/bootcamps/my");
      return response.data;
    },
  });
};
