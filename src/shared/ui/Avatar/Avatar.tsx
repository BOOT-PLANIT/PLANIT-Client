import styles from "./Avatar.module.scss";

type AvatarSize = "md" | "lg";

const sizeMap: Record<AvatarSize, string> = {
  md: "40px",
  lg: "80px",
};

interface AvatarProps {
  userName: string;
  size?: AvatarSize;
  onClick?: () => void;
}

const Avatar = ({ userName, size = "md", onClick }: AvatarProps) => {
  const initial = userName.charAt(0).toUpperCase();
  const sizeValue = sizeMap[size];

  return (
    <div
      className={styles.avatar}
      style={{
        width: sizeValue,
        height: sizeValue,
      }}
      onClick={onClick}
    >
      <span>{initial}</span>
    </div>
  );
};

export default Avatar;
