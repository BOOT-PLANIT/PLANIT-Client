import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { ApiResponse } from "@/shared/api";
import { apiClient } from "@/shared/api";

import type { User } from "./types";

/**
 * 내 정보 조회
 */
export const useMe = () => {
  return useQuery<User>({
    queryKey: ["users", "me"],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<User>>("/users/me");
      return (response as unknown as ApiResponse<User>).data;
    },
  });
};

/**
 * 회원 탈퇴
 */
export const useDeleteMe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.delete<ApiResponse<null>>("/users/me");
      return (response as unknown as ApiResponse<null>).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};
