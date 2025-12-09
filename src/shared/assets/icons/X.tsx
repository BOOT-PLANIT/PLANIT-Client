interface XProps {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}

const X = ({
  width = 16,
  height = 16,
  className,
  color = "currentColor",
}: XProps) => (
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
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default X;
