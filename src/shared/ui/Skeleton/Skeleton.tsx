"use client";

import styles from "./Skeleton.module.scss";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
}

const Skeleton = ({
  width = "100%",
  height = "1rem",
  borderRadius = "var(--radius-4)",
  className = "",
}: SkeletonProps) => {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
};

export default Skeleton;
