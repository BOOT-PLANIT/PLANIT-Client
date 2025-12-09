interface AnnualIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const AnnualIcon = ({
  width = 16,
  height = 16,
  className,
}: AnnualIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M14 2L8 8L2 6L1 7L6 10L5 11L2 14L3 15L6 12L7 11L10 15L11 14L9 8L14 2Z"
      stroke="#00aff0"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export default AnnualIcon;
