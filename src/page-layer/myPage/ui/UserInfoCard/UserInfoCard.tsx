import type { User } from "@/feature/user";
import { CalenderIcon, StudyIcon } from "@/shared/assets/icons";
import { Avatar, Card } from "@/shared/ui";
import { Badge } from "@/shared/ui/Badge";

import styles from "./UserInfoCard.module.scss";

interface UserInfoCardProps {
  user: User;
}

const UserInfoCard = ({ user }: UserInfoCardProps) => {
  const createdDate = user.createdAt.split(" ")[0];
  const year = user.createdAt.substring(0, 4);
  const uidPrefix = user.uid.substring(0, 6);
  const createUid = `${year}-${uidPrefix}`;

  return (
    <Card>
      <div className={styles.topRow}>
        <div className={styles.avatarImg}>
          <Avatar size="lg" userName={user.displayName} />
        </div>
        <div className={styles.infoCard}>
          <div className={styles.name}>{user.displayName}</div>
          <div className={styles.email}>{user.email}</div>
          <div className={styles.tags}>
            {user.userLevel == "USER" ? (
              <Badge variant="kdt">
                <StudyIcon /> Student
              </Badge>
            ) : (
              <Badge variant="kdt">Admin</Badge>
            )}
            <Badge variant="active">ID: {createUid}</Badge>
            <Badge variant="ended">
              <CalenderIcon />
              등록일: {createdDate}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserInfoCard;
