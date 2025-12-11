/**
 * 네트워크 에러인지 확인
 */
export const isNetworkError = (error: unknown): boolean => {
  if (!error) return false;

  const errorMessage =
    (error as { message?: string })?.message || (error as Error)?.message || "";

  return (
    errorMessage === "Network Error" ||
    errorMessage.includes("Network Error") ||
    errorMessage.includes("network")
  );
};

/**
 * 에러 객체에서 메시지 추출
 */
export const extractErrorMessage = (error: unknown): string => {
  if (!error) return "";

  return (
    (error as { message?: string })?.message || (error as Error)?.message || ""
  );
};

/**
 * 에러 메시지 가져오기 (네트워크 에러 처리 포함)
 */
export const getErrorMessage = (
  error: unknown,
  defaultMessage: string,
  networkErrorMessage?: string,
): string => {
  if (!error) return defaultMessage;

  if (isNetworkError(error)) {
    return networkErrorMessage || "네트워크 연결에 실패했습니다.";
  }

  const errorMessage = extractErrorMessage(error);
  return errorMessage || defaultMessage;
};
