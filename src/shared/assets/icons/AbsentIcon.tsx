interface AbsentIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const AbsentIcon = ({
  width = 16,
  height = 16,
  className,
}: AbsentIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 4L4 12M4 4L12 12"
      stroke="#d21c1c"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default AbsentIcon;
