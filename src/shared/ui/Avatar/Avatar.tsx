import styles from "./Avatar.module.scss";

interface AvatarProps {
  children: string;
  size?: string;
  onClick?: () => void;
}

const Avatar = ({ children, size = "40px", onClick }: AvatarProps) => {
  const initial = children.charAt(0).toUpperCase();

  return (
    <div
      className={styles.avatar}
      style={{
        width: size,
        height: size,
      }}
      onClick={onClick}
    >
      <span>{initial}</span>
    </div>
  );
};

export default Avatar;
