interface LateIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const LateIcon = ({ width = 16, height = 16, className }: LateIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="8" cy="8" r="6" stroke="#f59e0b" strokeWidth="2" />
    <path
      d="M8 4V8L10 10"
      stroke="#f59e0b"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default LateIcon;
