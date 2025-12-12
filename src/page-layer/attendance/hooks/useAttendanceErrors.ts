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
    const errorConfigs = [
      {
        isError: isErrorBootcamps,
        error: errorBootcamps,
        defaultMessage: ERROR_MESSAGES.FETCH_BOOTCAMPS_FAILED,
      },
      {
        isError: isErrorSessions,
        error: errorSessions,
        defaultMessage: ERROR_MESSAGES.FETCH_SESSIONS_FAILED,
      },
    ];

    errorConfigs.forEach(({ isError, error, defaultMessage }) => {
      if (isError && error) {
        const message = getErrorMessage(
          error,
          defaultMessage,
          ERROR_MESSAGES.NETWORK_ERROR,
        );
        toast.error(message);
      }
    });
  }, [isErrorBootcamps, errorBootcamps, isErrorSessions, errorSessions, toast]);
};
