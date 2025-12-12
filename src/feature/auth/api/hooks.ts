import { useMutation } from "@tanstack/react-query";

import type { ApiResponse } from "@/shared/api";
import { apiClient } from "@/shared/api";

import type { LoginRequest } from "./types";

/**
 * 로그인
 */
export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await apiClient.post<ApiResponse<null>>(
        "/auth/login",
        null,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        },
      );
      return (response as unknown as ApiResponse<null>).data;
    },
  });
};
