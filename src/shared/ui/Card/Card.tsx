"use client";

import React from "react";

import styles from "./Card.module.scss";

interface CardProps {
  title?: string;
  titleIcon?: React.ReactNode;
  children: React.ReactNode;
  width?: string;
  onClick?: () => void;
}

const Card = ({
  title,
  titleIcon,
  children,
  width = "100%",
  onClick,
}: CardProps) => {
  const Wrapper: React.ElementType = onClick ? "button" : "div";

  return (
    <Wrapper
      className={styles.card}
      style={{ width }}
      onClick={onClick}
      type={onClick ? "button" : undefined}
    >
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
