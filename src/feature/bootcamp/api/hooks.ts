import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { ApiResponse } from "@/shared/api";
import { apiClient } from "@/shared/api";

import type {
  Bootcamp,
  BootcampListParams,
  BootcampParseRequest,
  BootcampParseResponse,
  BootcampRequest,
  BootcampSearchParams,
  BootcampSummaryResponse,
} from "./types";

/**
 * 부트캠프 전체 목록 조회 (요약)
 */
export const useBootcampSummary = () => {
  return useQuery<BootcampSummaryResponse>({
    queryKey: ["bootcamps", "summary"],
    queryFn: async () => {
      const response =
        await apiClient.get<ApiResponse<BootcampSummaryResponse>>(
          "/bootcamps/summary",
        );
      return (response as unknown as ApiResponse<BootcampSummaryResponse>).data;
    },
  });
};

/**
 * 부트캠프 목록 조회 (페이지네이션)
 */
export const useBootcamps = (params?: BootcampListParams) => {
  return useQuery<Bootcamp[]>({
    queryKey: ["bootcamps", params],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Bootcamp[]>>(
        "/bootcamps",
        { params },
      );
      return (response as unknown as ApiResponse<Bootcamp[]>).data;
    },
  });
};

/**
 * 부트캠프 검색
 */
export const useSearchBootcamps = (params: BootcampSearchParams) => {
  return useQuery<Bootcamp[]>({
    queryKey: ["bootcamps", "search", params],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Bootcamp[]>>(
        "/bootcamps/search",
        { params },
      );
      return (response as unknown as ApiResponse<Bootcamp[]>).data;
    },
    enabled: !!params.keyword,
  });
};

/**
 * 부트캠프 단건 조회
 */
export const useBootcamp = (id: number) => {
  return useQuery<Bootcamp>({
    queryKey: ["bootcamps", id],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Bootcamp>>(
        `/bootcamps/${id}`,
      );
      return (response as unknown as ApiResponse<Bootcamp>).data;
    },
    enabled: !!id,
  });
};

/**
 * 고용24 텍스트 파싱
 */
export const useParseBootcampText = () => {
  return useMutation({
    mutationFn: async (data: BootcampParseRequest) => {
      const response = await apiClient.post<ApiResponse<BootcampParseResponse>>(
        "/bootcamps/parse",
        data,
      );
      return (response as unknown as ApiResponse<BootcampParseResponse>).data;
    },
  });
};

/**
 * 부트캠프 등록
 */
export const useCreateBootcamp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BootcampRequest) => {
      const response = await apiClient.post<ApiResponse<Bootcamp>>(
        "/bootcamps",
        data,
      );
      return (response as unknown as ApiResponse<Bootcamp>).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bootcamps"],
      });
    },
  });
};

/**
 * 부트캠프 수정
 */
export const useUpdateBootcamp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: BootcampRequest }) => {
      const response = await apiClient.put<ApiResponse<Bootcamp>>(
        `/bootcamps/${id}`,
        data,
      );
      return (response as unknown as ApiResponse<Bootcamp>).data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["bootcamps", variables.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["bootcamps"],
      });
    },
  });
};

/**
 * 부트캠프 삭제
 */
export const useDeleteBootcamp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await apiClient.delete<ApiResponse<null>>(
        `/bootcamps/${id}`,
      );
      return (response as unknown as ApiResponse<null>).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bootcamps"],
      });
    },
  });
};
