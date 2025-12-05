import styles from "./Card.module.scss";

type CardVariant = "solid" | "gradient";

interface CardProps {
  variant?: CardVariant;
  title?: string;
  titleIcon?: React.ReactNode;
  children: React.ReactNode;
  width?: string;
  padding?: string;
}

const Card = ({
  variant = "solid",
  title,
  titleIcon,
  children,
  width = "100%",
  padding = "var(--spacing-20)",
}: CardProps) => {
  return (
    <div
      className={`${styles.card} ${styles[variant]}`}
      style={{ width, padding }}
    >
      {title && (
        <div className={styles.header}>
          {titleIcon && <span className={styles.titleIcon}>{titleIcon}</span>}
          <h3 className={styles.title}>{title}</h3>
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Card;
