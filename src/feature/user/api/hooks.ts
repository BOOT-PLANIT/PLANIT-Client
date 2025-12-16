import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { ApiResponse } from "@/shared/api";
import { apiClient } from "@/shared/api";

import type { FcmTokenRequest, User } from "./types";

/**
 * 내 정보 조회
 */
export const useMe = () => {
  return useQuery<ApiResponse<User>>({
    queryKey: ["users", "me"],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<User>>("/users/me");
      return response.data;
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
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};

/**
 * FCM 토큰 저장/갱신
 */
export const useUpdateFcmToken = () => {
  return useMutation({
    mutationFn: async (data: FcmTokenRequest) => {
      const response = await apiClient.post<ApiResponse<null>>(
        "/users/me/token",
        data,
      );
      return response.data;
    },
  });
};
