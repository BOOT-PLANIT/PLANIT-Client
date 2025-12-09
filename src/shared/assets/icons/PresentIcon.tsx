interface PresentIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const PresentIcon = ({
  width = 16,
  height = 16,
  className,
}: PresentIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M13 4L6 11L3 8"
      stroke="#048724"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PresentIcon;
