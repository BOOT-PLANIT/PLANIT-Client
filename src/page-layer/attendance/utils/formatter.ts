import { parseDateString as sharedParseDateString } from "@/shared/utils";

/**
 * @deprecated Use parseDateString from @/shared/utils instead
 */
export const parseDateString = sharedParseDateString;

/**
 * 날짜 정규화 유틸리티 함수들
 */

/**
 * 날짜를 00:00:00으로 정규화하여 timestamp 반환
 */
export const normalizeDate = (date: Date): number => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime();
};

/**
 * 시작일을 00:00:00으로 정규화하여 timestamp 반환
 */
export const normalizeStartDate = (date: Date): number => {
  return normalizeDate(date);
};

/**
 * 종료일을 23:59:59.999로 정규화하여 timestamp 반환 (하루 전체 포함)
 */
export const normalizeEndDate = (date: Date): number => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
    999,
  ).getTime();
};
