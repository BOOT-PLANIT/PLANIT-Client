import type { User } from "@/feature/user";
import { StudyIcon } from "@/shared/assets/icons";
import { Avatar, Card } from "@/shared/ui";
import { Badge } from "@/shared/ui/Badge";

import styles from "./UserInfoCard.module.scss";

interface UserInfoCardProps {
  user: User;
}

const UserInfoCard = ({ user }: UserInfoCardProps) => {
  const createdDate = user.createdAt.split(" ")[0];

  return (
    <Card>
      <div className={styles.topRow}>
        <div className={styles.avatarImg}>
          <Avatar size="lg" userName={user.displayName} />
        </div>
        <div className={styles.infoCard}>
          <div className={styles.name}>{user.displayName}</div>
          <div className={styles.email}>{user.email}</div>
          <div className={styles.date}>등록일: {createdDate}</div>
          <div className={styles.tags}>
            {user.userLevel == "USER" ? (
              <Badge variant="kdt">
                <StudyIcon /> Student
              </Badge>
            ) : (
              <Badge variant="kdt">Admin</Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserInfoCard;
