import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

const InstituteIcon = ({ size = 12 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 건물 본체 — 더 키움 */}
      <rect
        x="1.5"
        y="2.9"
        width="9"
        height="8"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.2"
      />

      {/* 상단 박스 — 더 넓게 & 아래로 조금 내려서 중심 맞춤 */}
      <rect
        x="3.2"
        y="0.7"
        width="5.6"
        height="2.2"
        rx="0.6"
        stroke="currentColor"
        strokeWidth="1.2"
      />

      {/* 창문 — 확대 */}
      <rect
        x="3"
        y="3.8"
        width="1.6"
        height="1.6"
        rx="0.3"
        fill="currentColor"
      />
      <rect
        x="7.4"
        y="3.8"
        width="1.6"
        height="1.6"
        rx="0.3"
        fill="currentColor"
      />

      <rect x="3" y="6" width="1.6" height="1.6" rx="0.3" fill="currentColor" />
      <rect
        x="7.4"
        y="6"
        width="1.6"
        height="1.6"
        rx="0.3"
        fill="currentColor"
      />

      {/* 문 — 키우고 중앙 정렬 보정 */}
      <rect
        x="5.2"
        y="6.8"
        width="1.6"
        height="3"
        rx="0.3"
        fill="currentColor"
      />
    </svg>
  );
};

export default InstituteIcon;
