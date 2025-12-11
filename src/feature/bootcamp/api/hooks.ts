import { useQuery } from "@tanstack/react-query";

import type { ApiResponse } from "@/shared/api";
import { apiClient } from "@/shared/api";

import type { Bootcamp } from "./types";

/**
 * 내 부트캠프 목록 조회
 */
export const useMyBootcamps = () => {
  return useQuery<ApiResponse<Bootcamp[]>>({
    queryKey: ["enrollments"],
    queryFn: async () => {
      const response =
        await apiClient.get<ApiResponse<Bootcamp[]>>("/enrollments");
      return response.data;
    },
  });
};

/**
 * 부트캠프 단건 조회
 */
export const useBootcamp = (id: number) => {
  return useQuery<ApiResponse<Bootcamp>>({
    queryKey: ["bootcamps", id],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Bootcamp>>(
        `/bootcamps/${id}`,
      );
      return response.data;
    },
    enabled: !!id,
  });
};
