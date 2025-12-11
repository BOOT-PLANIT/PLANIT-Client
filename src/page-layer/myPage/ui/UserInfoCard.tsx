import { Avatar, Card } from "@/shared/ui";

import type { User } from "../page";

import styles from "./UserInfoCard.module.scss";

interface UserInfoCardProps {
  user: User;
}

const UserInfoCard = ({ user }: UserInfoCardProps) => {
  return (
    <Card>
      <div className={styles.topRow}>
        <Avatar size="lg" userName={user.userName} />
        <div className={styles.infoCard}>
          <div className={styles.name}>{user.userName}</div>
          <div className={styles.email}>{user.userEmail}</div>
          <div className={styles.tags}>
            <span className={styles.authorityBadge}>{user.authority}</span>
            <span className={styles.enrolledAtBadge}>
              {user.userEnrolledAt}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserInfoCard;
