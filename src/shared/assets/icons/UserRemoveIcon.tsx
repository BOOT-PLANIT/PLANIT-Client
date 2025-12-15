// UserRemoveIcon.tsx
import React from "react";

type Props = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const UserRemoveIcon = ({ size = 16, className }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* User head */}
      <circle cx="9" cy="11" r="3" stroke="currentColor" strokeWidth="2" />

      {/* User body */}
      <path
        d="M4 21c0-2.5 2.5-4 5-4s5 1.5 5 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* X mark */}
      <path
        d="M15 7l4 4M19 7l-4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default UserRemoveIcon;
