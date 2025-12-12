import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { Session } from "@/feature/session/api";
import type { ApiResponse } from "@/shared/api";
import { apiClient } from "@/shared/api";

import type {
  AttendanceBalanceResponse,
  AttendanceDeleteRequest,
  AttendanceRequest,
  DailyAttendanceResponse,
  LeaveListResponse,
  PeriodAttendanceListResponse,
  PeriodAttendanceResponse,
  TotalAttendanceResponse,
} from "./types";

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
      return (response as unknown as ApiResponse<string>).data;
    },
    onMutate: async (variables) => {
      const queryKey = [
        "sessions",
        "bootcamp",
        variables.bootcampId,
        "user",
        variables.userId,
        "attendance",
      ];

      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<Session[]>(queryKey);

      if (previousData) {
        queryClient.setQueryData<Session[]>(queryKey, (old) => {
          if (!old) return old;

          return old.map((session) => {
            if (variables.classDates.includes(session.classDate)) {
              return {
                ...session,
                attendance: {
                  status: variables.status,
                  userId: variables.userId,
                },
              };
            }
            return session;
          });
        });
      }

      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        const queryKey = [
          "sessions",
          "bootcamp",
          variables.bootcampId,
          "user",
          variables.userId,
          "attendance",
        ];
        queryClient.setQueryData<Session[]>(queryKey, context.previousData);
      }
    },
    onSettled: (_, __, variables) => {
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
      return (response as unknown as ApiResponse<string>).data;
    },
    onMutate: async (variables) => {
      const queryKey = [
        "sessions",
        "bootcamp",
        variables.bootcampId,
        "user",
        variables.userId,
        "attendance",
      ];

      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<Session[]>(queryKey);

      if (previousData) {
        queryClient.setQueryData<Session[]>(queryKey, (old) => {
          if (!old) return old;

          return old.map((session) => {
            if (variables.classDates.includes(session.classDate)) {
              const { attendance: _attendance, ...sessionWithoutAttendance } =
                session;
              return sessionWithoutAttendance;
            }
            return session;
          });
        });
      }

      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        const queryKey = [
          "sessions",
          "bootcamp",
          variables.bootcampId,
          "user",
          variables.userId,
          "attendance",
        ];
        queryClient.setQueryData<Session[]>(queryKey, context.previousData);
      }
    },
    onSettled: (_, __, variables) => {
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
  return useQuery<PeriodAttendanceResponse>({
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
      return (response as unknown as ApiResponse<PeriodAttendanceResponse>)
        .data;
    },
    enabled: !!userId && !!bootcampId && !!unitNo,
  });
};

/**
 * 일단위 출결 조회
 */
export const useDailyAttendance = (
  userId: number | null,
  date: string | null,
  bootcampId: number | null,
) => {
  return useQuery<DailyAttendanceResponse>({
    queryKey: ["attendance", userId, date, bootcampId],
    queryFn: async () => {
      const response = await apiClient.get<
        ApiResponse<DailyAttendanceResponse>
      >(`/attendance/${userId}`, {
        params: {
          date,
          bootcampId,
        },
      });
      return (response as unknown as ApiResponse<DailyAttendanceResponse>).data;
    },
    enabled: !!userId && !!date && !!bootcampId,
  });
};

/**
 * 총 출결 조회
 */
export const useTotalAttendance = (
  userId: number | null,
  bootcampId: number | null,
) => {
  return useQuery<TotalAttendanceResponse>({
    queryKey: ["attendance", "total", userId, bootcampId],
    queryFn: async () => {
      const response = await apiClient.get<
        ApiResponse<TotalAttendanceResponse>
      >(`/attendance/total/${userId}`, {
        params: {
          bootcampId,
        },
      });
      return (response as unknown as ApiResponse<TotalAttendanceResponse>).data;
    },
    enabled: !!userId && !!bootcampId,
  });
};

/**
 * 완료된 단위 기간 출결 리스트 조회
 */
export const usePeriodAttendanceList = (
  userId: number | null,
  bootcampId: number | null,
) => {
  return useQuery<PeriodAttendanceListResponse>({
    queryKey: ["attendance", "periodList", userId, bootcampId],
    queryFn: async () => {
      const response = await apiClient.get<
        ApiResponse<PeriodAttendanceListResponse>
      >(`/attendance/periodList/${userId}`, {
        params: {
          bootcampId,
        },
      });
      return (response as unknown as ApiResponse<PeriodAttendanceListResponse>)
        .data;
    },
    enabled: !!userId && !!bootcampId,
  });
};

/**
 * 월차 잔여/누적 사용량 조회
 */
export const useAttendanceBalance = (
  userId: number | null,
  bootcampId: number | null,
) => {
  return useQuery<AttendanceBalanceResponse>({
    queryKey: ["attendance", "balance", userId, bootcampId],
    queryFn: async () => {
      const response = await apiClient.get<
        ApiResponse<AttendanceBalanceResponse>
      >(`/attendance/balance/${userId}`, {
        params: {
          bootcampId,
        },
      });
      return (response as unknown as ApiResponse<AttendanceBalanceResponse>)
        .data;
    },
    enabled: !!userId && !!bootcampId,
  });
};

/**
 * 휴가 목록 조회
 */
export const useLeaveList = (
  userId: number | null,
  bootcampId: number | null,
) => {
  return useQuery<LeaveListResponse[]>({
    queryKey: ["attendance", "leave", userId, bootcampId],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<LeaveListResponse[]>>(
        `/attendance/leave/${userId}`,
        {
          params: {
            bootcampId,
          },
        },
      );
      return (response as unknown as ApiResponse<LeaveListResponse[]>).data;
    },
    enabled: !!userId && !!bootcampId,
  });
};
