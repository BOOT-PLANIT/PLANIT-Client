interface ChevronRightProps {
  width?: number;
  height?: number;
  className?: string;
}

const ChevronRight = ({
  width = 16,
  height = 16,
  className,
}: ChevronRightProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M6 4L10 8L6 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ChevronRight;
