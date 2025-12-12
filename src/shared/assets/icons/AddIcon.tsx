import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

const AddIcon = ({ size = 16 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 세로선 (각진 끝) */}
      <path
        d="M8 3V13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="butt"
      />

      {/* 가로선 (각진 끝) */}
      <path
        d="M3 8H13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="butt"
      />
    </svg>
  );
};

export default AddIcon;
