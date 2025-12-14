import React from "react";

type Props = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const ShieldIcon = ({ size = 16, className }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      className={className}
    >
      <path
        d="
          M12 3
          C14.5 5.2 17.2 6.2 19 6.6
          V12.2
          C19 16.3 15.9 19.4 12 21
          C8.1 19.4 5 16.3 5 12.2
          V6.6
          C6.8 6.2 9.5 5.2 12 3
          Z
        "
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ShieldIcon;
