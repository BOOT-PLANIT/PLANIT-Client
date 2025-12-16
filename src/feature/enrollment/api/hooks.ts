import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { ApiResponse } from "@/shared/api";
import { apiClient } from "@/shared/api";

import type { Enrollment } from "./types";

/**
 * 내 부트캠프 목록 조회 (등록 정보)
 */
export const useMyBootcamps = () => {
  return useQuery<ApiResponse<Enrollment[]>>({
    queryKey: ["bootcamps", "my"],
    queryFn: async () => {
      const response =
        await apiClient.get<ApiResponse<Enrollment[]>>("/bootcamps/my");
      return response.data;
    },
  });
};

/**
 * 부트캠프 등록
 */
export const useEnrollBootcamp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bootcampId: number) => {
      const response = await apiClient.post<ApiResponse<Enrollment>>(
        `/bootcamps/${bootcampId}/enroll`,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bootcamps", "my"],
      });
    },
  });
};

/**
 * 내 부트캠프 삭제
 */
export const useDeleteMyBootcamp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (enrollmentId: number) => {
      const response = await apiClient.delete<ApiResponse<null>>(
        `/bootcamps/my/${enrollmentId}`,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bootcamps", "my"],
      });
    },
  });
};
