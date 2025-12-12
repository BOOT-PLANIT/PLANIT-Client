import { useEffect } from "react";

import { ERROR_MESSAGES } from "@/entities/attendance/model";
import { useToast } from "@/shared/lib";
import { getErrorMessage } from "@/shared/utils";

interface UseAttendanceErrorsOptions {
  isErrorBootcamps: boolean;
  errorBootcamps: unknown;
  isErrorSessions: boolean;
  errorSessions: unknown;
}

export const useAttendanceErrors = (
  options: UseAttendanceErrorsOptions,
): void => {
  const { isErrorBootcamps, errorBootcamps, isErrorSessions, errorSessions } =
    options;
  const toast = useToast();

  useEffect(() => {
    if (isErrorBootcamps && errorBootcamps) {
      const message = getErrorMessage(
        errorBootcamps,
        ERROR_MESSAGES.FETCH_BOOTCAMPS_FAILED,
        ERROR_MESSAGES.NETWORK_ERROR,
      );
      toast.error(message);
    }
  }, [isErrorBootcamps, errorBootcamps, toast]);

  useEffect(() => {
    if (isErrorSessions && errorSessions) {
      const message = getErrorMessage(
        errorSessions,
        ERROR_MESSAGES.FETCH_SESSIONS_FAILED,
        ERROR_MESSAGES.NETWORK_ERROR,
      );
      toast.error(message);
    }
  }, [isErrorSessions, errorSessions, toast]);
};
