import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

const CalendarIcon = ({ size = 12 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 바깥 둥근 사각형 (원본과 동일 비율, 굵기) */}
      <rect
        x="1"
        y="2"
        width="10"
        height="9"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.2"
      />

      {/* 상단 가로선 */}
      <path
        d="M1 4.5H11"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* 왼쪽 고리 */}
      <path
        d="M4 1V3.0"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* 오른쪽 고리 */}
      <path
        d="M8 1V3.0"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CalendarIcon;
