import { useMemo } from "react";

import {
  useUpdateAttendance,
  useDeleteAttendance,
} from "@/feature/attendance/api";
import { useMyBootcamps } from "@/feature/enrollment/api";
import { useSessionsWithAttendance } from "@/feature/session/api";
import type { DateData } from "@/shared/ui/Calendar";
import { isNetworkError } from "@/shared/utils";

import { generateMockBootcamps, generateMockSessions } from "../model/mockData";
import type { BootcampOption, UnitPeriod } from "../types";
import {
  extractUnitPeriods,
  transformBootcampsToOptions,
  transformSessionsToDateData,
} from "../utils/apiTransform";

interface UseAttendanceDataOptions {
  userId: number;
}

interface UseAttendanceDataReturn {
  bootcampOptions: BootcampOption[];
  selectedBootcampId: number | null;
  allCalendarDates: DateData[];
  unitPeriods: UnitPeriod[];
  selectedBootcamp: BootcampOption | undefined;
  isLoading: boolean;
  hasData: boolean;
  isErrorBootcamps: boolean;
  errorBootcamps: unknown;
  isErrorSessions: boolean;
  errorSessions: unknown;
  updateAttendanceMutation: ReturnType<typeof useUpdateAttendance>;
  deleteAttendanceMutation: ReturnType<typeof useDeleteAttendance>;
}

export const useAttendanceData = (
  selectedBootcampIndex: number,
  options: UseAttendanceDataOptions,
): UseAttendanceDataReturn => {
  const { userId } = options;
  const shouldUseMocks =
    process.env.NEXT_PUBLIC_USE_ATTENDANCE_MOCKS === "true";

  const {
    data: bootcampSummaryData,
    isLoading: isLoadingBootcamps,
    isError: isErrorBootcamps,
    error: errorBootcamps,
  } = useMyBootcamps();

  const finalBootcampData = useMemo(() => {
    if (
      shouldUseMocks &&
      isErrorBootcamps &&
      errorBootcamps &&
      isNetworkError(errorBootcamps)
    ) {
      return generateMockBootcamps();
    }
    return bootcampSummaryData;
  }, [shouldUseMocks, isErrorBootcamps, errorBootcamps, bootcampSummaryData]);

  const bootcampOptions = useMemo(() => {
    if (!finalBootcampData?.data) return [];
    if (!Array.isArray(finalBootcampData.data)) return [];
    return transformBootcampsToOptions(finalBootcampData.data);
  }, [finalBootcampData]);

  const selectedBootcampId = useMemo(() => {
    if (bootcampOptions.length === 0 || selectedBootcampIndex < 0) return null;
    const selectedOption = bootcampOptions[selectedBootcampIndex];
    return selectedOption ? Number(selectedOption.value) : null;
  }, [bootcampOptions, selectedBootcampIndex]);

  const {
    data: sessionsData,
    isLoading: isLoadingSessions,
    isError: isErrorSessions,
    error: errorSessions,
  } = useSessionsWithAttendance(selectedBootcampId, userId);

  const finalSessionsData = useMemo(() => {
    if (
      shouldUseMocks &&
      isErrorSessions &&
      errorSessions &&
      isNetworkError(errorSessions)
    ) {
      const mockBootcampId = finalBootcampData?.data?.[0]?.id || 1;
      return generateMockSessions(mockBootcampId, userId);
    }
    return sessionsData;
  }, [
    shouldUseMocks,
    isErrorSessions,
    errorSessions,
    sessionsData,
    finalBootcampData,
    userId,
  ]);

  const allCalendarDates = useMemo(() => {
    if (!finalSessionsData?.data) return [];
    return transformSessionsToDateData(finalSessionsData.data);
  }, [finalSessionsData]);

  const unitPeriods = useMemo(() => {
    if (!finalSessionsData?.data) return [];
    return extractUnitPeriods(finalSessionsData.data);
  }, [finalSessionsData]);

  const updateAttendanceMutation = useUpdateAttendance();
  const deleteAttendanceMutation = useDeleteAttendance();

  const isLoading = isLoadingBootcamps || isLoadingSessions;
  const hasData =
    bootcampOptions.length > 0 &&
    !!finalBootcampData?.data &&
    !!finalSessionsData?.data &&
    Array.isArray(finalSessionsData.data) &&
    finalSessionsData.data.length > 0;
  const selectedBootcamp = bootcampOptions[selectedBootcampIndex];

  return {
    bootcampOptions,
    selectedBootcampId,
    allCalendarDates,
    unitPeriods,
    selectedBootcamp,
    isLoading,
    hasData,
    isErrorBootcamps,
    errorBootcamps,
    isErrorSessions,
    errorSessions,
    updateAttendanceMutation,
    deleteAttendanceMutation,
  };
};
