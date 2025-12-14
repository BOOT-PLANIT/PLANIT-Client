import React from "react";

type Props = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const BellIcon = ({ size = 16, className }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 23 23"
      fill="none"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Bell body */}
      <path
        d="M12 21c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 15v-5a6 6 0 1 0-12 0v5l-2 2h16l-2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default BellIcon;
