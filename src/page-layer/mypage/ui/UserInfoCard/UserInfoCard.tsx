import type { MeResponse } from "@/feature/user";
import { StudyIcon } from "@/shared/assets/icons";
import ShieldIcon from "@/shared/assets/icons/ShieldIcon";
import { Avatar, Card } from "@/shared/ui";
import { Badge } from "@/shared/ui/Badge";

import styles from "./UserInfoCard.module.scss";

interface UserInfoCardProps {
  user: MeResponse | undefined;
}
const UserInfoCard = ({ user }: UserInfoCardProps) => {
  if (!user)
    return (
      <Card>
        <div className={styles.erorr}>
          내정보를 불러오지못하였습니다. 다시 시도해주세요
        </div>
      </Card>
    );

  const createdDate = user.createdAt.slice(0, 10) ?? "-";
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
            {user.userLevel === "USER" ? (
              <Badge variant="kdt">
                <StudyIcon /> Student
              </Badge>
            ) : (
              <Badge variant="active">
                <ShieldIcon size={12} /> Admin
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserInfoCard;
