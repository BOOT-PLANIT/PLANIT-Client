interface LeaveIconProps {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}

const LeaveIcon = ({
  width = 16,
  height = 16,
  className,
  color = "#8b5cf6",
}: LeaveIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="3"
      y="4"
      width="10"
      height="9"
      rx="1"
      stroke={color}
      strokeWidth="2"
    />
    <path d="M3 6H13" stroke={color} strokeWidth="2" />
    <path
      d="M6 2V4M10 2V4"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default LeaveIcon;
