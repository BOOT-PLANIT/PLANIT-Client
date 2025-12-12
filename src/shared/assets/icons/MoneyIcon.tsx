interface MoneyIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const MoneyIcon = ({
  width = 24,
  height = 24,
  color = "black",
}: MoneyIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
      <path d="M12 6V18" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path
        d="M15 9C15 7.7 13.7 7 12 7C10.3 7 9 7.7 9 9C9 10.3 10.1 11 12 11C13.9 11 15 11.7 15 13C15 14.3 13.7 15 12 15C10.3 15 9 14.3 9 13"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MoneyIcon;
