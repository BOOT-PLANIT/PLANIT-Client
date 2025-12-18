import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { ApiResponse } from "@/shared/api";
import { apiClient } from "@/shared/api";

import type {
  Session,
  SessionAttendanceStatusItem,
  SessionCreateRequest,
  SessionDeleteRequest,
} from "./types";

/**
 * 세션 전체 목록 조회
 */
export const useSessions = () => {
  return useQuery<ApiResponse<Session[]>>({
    queryKey: ["sessions"],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Session[]>>("/sessions");
      return response.data;
    },
  });
};

/**
 * 부트캠프별 세션 목록 조회
 */
export const useSessionsByBootcamp = (bootcampId: number | null) => {
  return useQuery<ApiResponse<Session[]>>({
    queryKey: ["sessions", "bootcamp", bootcampId],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Session[]>>(
        `/sessions/bootcamp/${bootcampId}`,
      );
      return response.data;
    },
    enabled: !!bootcampId,
  });
};

/**
 * 세션 단건 조회
 */
export const useSession = (id: number | null) => {
  return useQuery<ApiResponse<Session>>({
    queryKey: ["sessions", id],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Session>>(
        `/sessions/${id}`,
      );
      return response.data;
    },
    enabled: !!id,
  });
};

/**
 * 세션 등록
 */
export const useCreateSessions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SessionCreateRequest) => {
      const response = await apiClient.post<ApiResponse<Session[]>>(
        "/sessions",
        data,
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["sessions", "bootcamp", variables.bootcampId],
      });
      queryClient.invalidateQueries({
        queryKey: ["sessions"],
      });
    },
  });
};

/**
 * 세션 삭제
 */
export const useDeleteSessions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SessionDeleteRequest) => {
      const response = await apiClient.delete<ApiResponse<null>>("/sessions", {
        data,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sessions"],
      });
    },
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
      const [sessionsResponse, attendanceResponse] = await Promise.all([
        apiClient.get<ApiResponse<Session[]>>(
          `/sessions/bootcamp/${bootcampId}`,
        ),
        apiClient.get<ApiResponse<SessionAttendanceStatusItem[]>>(
          `/sessions/bootcamp/${bootcampId}/user/${userId}/attendance`,
        ),
      ]);

      const attendanceBySessionId = new Map(
        (attendanceResponse.data.data ?? []).map((item) => [
          item.sessionId,
          item.attendanceStatus,
        ]),
      );

      const mergedSessions = (sessionsResponse.data.data ?? []).map(
        (session) => {
          const status = attendanceBySessionId.get(session.id);
          return {
            ...session,
            attendance: status
              ? {
                  status,
                  userId: userId as number,
                }
              : undefined,
          };
        },
      );

      return {
        ...sessionsResponse.data,
        data: mergedSessions,
      };
    },
    enabled: !!bootcampId && !!userId,
  });
};
