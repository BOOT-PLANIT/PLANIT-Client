import styles from "./Card.module.scss";

type CardVariant = "solid" | "gradient";

interface CardProps {
  variant?: CardVariant;
  title?: string;
  titleIcon?: React.ReactNode;
  children: React.ReactNode;
  width?: string;
  isClickable?: boolean;
}

const Card = ({
  variant = "solid",
  title,
  titleIcon,
  children,
  width = "100%",
  isClickable = false,
}: CardProps) => {
  const Wrapper = isClickable ? "button" : "div";

  return (
    <Wrapper className={`${styles.card} ${styles[variant]}`} style={{ width }}>
      {title && (
        <div className={styles.header}>
          {titleIcon && <span className={styles.titleIcon}>{titleIcon}</span>}
          <h3 className={styles.title}>{title}</h3>
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </Wrapper>
  );
};

export default Card;
