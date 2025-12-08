interface ChevronLeftProps {
  width?: number;
  height?: number;
  className?: string;
}

const ChevronLeft = ({
  width = 16,
  height = 16,
  className,
}: ChevronLeftProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M10 4L6 8L10 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ChevronLeft;
