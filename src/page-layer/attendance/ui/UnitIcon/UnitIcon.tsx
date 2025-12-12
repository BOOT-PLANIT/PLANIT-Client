"use client";

interface UnitIconProps {
  color: string;
  size?: number;
}

const UnitIcon = ({ color, size = 16 }: UnitIconProps) => {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        borderRadius: "var(--radius-4)",
      }}
    />
  );
};

export default UnitIcon;
