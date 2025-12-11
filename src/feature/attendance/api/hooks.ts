import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { ApiResponse } from "@/shared/api";
import { apiClient } from "@/shared/api";

import type {
  AttendanceDeleteRequest,
  AttendanceRequest,
  Bootcamp,
  PeriodAttendanceResponse,
  Session,
  TotalAttendanceResponse,
} from "./types";

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

/**
 * 출결 등록 및 수정
 */
export const useUpdateAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AttendanceRequest) => {
      const response = await apiClient.post<ApiResponse<string>>(
        "/attendance",
        data,
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: [
          "sessions",
          "bootcamp",
          variables.bootcampId,
          "user",
          variables.userId,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: ["attendance", "total", variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["attendance", "period", variables.userId],
      });
    },
  });
};

/**
 * 출결 삭제
 */
export const useDeleteAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AttendanceDeleteRequest) => {
      const response = await apiClient.delete<ApiResponse<string>>(
        "/attendance",
        { data },
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: [
          "sessions",
          "bootcamp",
          variables.bootcampId,
          "user",
          variables.userId,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: ["attendance", "total", variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["attendance", "period", variables.userId],
      });
    },
  });
};

/**
 * 단위 기간 출결 조회
 */
export const usePeriodAttendance = (
  userId: number | null,
  bootcampId: number | null,
  unitNo: number | null,
) => {
  return useQuery<ApiResponse<PeriodAttendanceResponse>>({
    queryKey: ["attendance", "period", userId, bootcampId, unitNo],
    queryFn: async () => {
      const response = await apiClient.get<
        ApiResponse<PeriodAttendanceResponse>
      >(`/attendance/period/${userId}`, {
        params: {
          bootcampId,
          unitNo,
        },
      });
      return response.data;
    },
    enabled: !!userId && !!bootcampId && !!unitNo,
  });
};

/**
 * 총 출결 조회
 */
export const useTotalAttendance = (
  userId: number | null,
  bootcampId: number | null,
) => {
  return useQuery<ApiResponse<TotalAttendanceResponse>>({
    queryKey: ["attendance", "total", userId, bootcampId],
    queryFn: async () => {
      const response = await apiClient.get<
        ApiResponse<TotalAttendanceResponse>
      >(`/attendance/total/${userId}`, {
        params: {
          bootcampId,
        },
      });
      return response.data;
    },
    enabled: !!userId && !!bootcampId,
  });
};
