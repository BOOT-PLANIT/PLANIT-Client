interface ClockIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
}

const ClockIcon = ({
  width = 24,
  height = 24,
  color = "black",
}: ClockIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 바깥 원 */}
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />

      {/* 중심점 */}
      <circle cx="12" cy="12" r="1.2" fill={color} />

      {/* 시침 */}
      <line
        x1="12"
        y1="12"
        x2="12"
        y2="8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* 분침 */}
      <line
        x1="12"
        y1="12"
        x2="16"
        y2="12"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ClockIcon;
