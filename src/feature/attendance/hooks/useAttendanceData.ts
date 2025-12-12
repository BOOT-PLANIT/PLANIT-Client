import { useMemo } from "react";

import {
  useUpdateAttendance,
  useDeleteAttendance,
} from "@/feature/attendance/api";
import { useMyBootcamps } from "@/feature/enrollment/api";
import { useSessionsWithAttendance } from "@/feature/session/api";
import type { DateData } from "@/shared/ui/Calendar";

import type {
  BootcampOption,
  UnitPeriod,
} from "../../../page-layer/attendance/types";
import {
  extractUnitPeriods,
  transformBootcampsToOptions,
  transformSessionsToDateData,
} from "../../../page-layer/attendance/utils/apiTransform";

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

  const {
    data: bootcampSummaryData,
    isLoading: isLoadingBootcamps,
    isError: isErrorBootcamps,
    error: errorBootcamps,
  } = useMyBootcamps();

  const bootcampOptions = useMemo(() => {
    if (!bootcampSummaryData?.data) return [];
    if (!Array.isArray(bootcampSummaryData.data)) return [];
    return transformBootcampsToOptions(bootcampSummaryData.data);
  }, [bootcampSummaryData]);

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

  const allCalendarDates = useMemo(() => {
    if (!sessionsData?.data) return [];
    return transformSessionsToDateData(sessionsData.data);
  }, [sessionsData]);

  const unitPeriods = useMemo(() => {
    if (!sessionsData?.data) return [];
    return extractUnitPeriods(sessionsData.data);
  }, [sessionsData]);

  const updateAttendanceMutation = useUpdateAttendance();
  const deleteAttendanceMutation = useDeleteAttendance();

  const isLoading = isLoadingBootcamps || isLoadingSessions;
  const hasData =
    bootcampOptions.length > 0 &&
    !!bootcampSummaryData?.data &&
    !!sessionsData?.data &&
    Array.isArray(sessionsData.data) &&
    sessionsData.data.length > 0;
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
