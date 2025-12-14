// LogoutIcon.tsx
import React from "react";

type Props = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const LogoutIcon = ({ size = 16, className }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* <path d="M4 4h8v16H4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />


      <path
        d="M12 12h7M16 8l3 4-3 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      /> */}
      <path
        d="M6 8v16M6 8h8M6 23h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Arrow shaft */}
      <path
        d="M11 15h7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Arrow head */}
      <path
        d="M16 11l4 4-4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LogoutIcon;
