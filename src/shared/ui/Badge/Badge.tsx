import styles from "./Badge.module.scss";

type BadgeVariant = "kdt" | "active" | "ended";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

const Badge = ({
  children,
  variant = "active",
  bgColor,
  textColor,
  className,
}: BadgeProps) => {
  return (
    <span
      className={`${styles.badgeBase} ${styles[variant]} ${className ?? ""}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {children}
    </span>
  );
};

export default Badge;
