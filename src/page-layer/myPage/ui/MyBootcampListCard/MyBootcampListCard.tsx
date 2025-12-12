import { BootcampTest as Bootcamp } from "@/feature/bootcamp";
import {
  AddIcon,
  CalenderIcon,
  DeleteIcon,
  StudyIcon,
} from "@/shared/assets/icons";
import { Button, Card } from "@/shared/ui";
import { Badge } from "@/shared/ui/Badge";

import styles from "./MyBootcampListCard.module.scss";

interface MyBootcampListCardProps {
  bootcamps: Bootcamp[];
}

const MyBootcampListCard = ({ bootcamps }: MyBootcampListCardProps) => {
  return (
    <Card>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <span className={styles.title}>나의 부트캠프</span>
          <Button
            variant="primary"
            className={styles.registButton}
            icon={<AddIcon />}
          >
            부트캠프 등록하기
          </Button>
        </div>
        <div className={styles.listLayout}>
          {/* 아이템시작 */}
          <div className={styles.bootcampItem}>
            <div className={styles.icon}>
              <StudyIcon width={24} height={24} />
            </div>

            <div className={styles.infoLayout}>
              <div className={styles.infoTopRow}>
                <div className={styles.topRowLeft}>
                  <span className={styles.name}>{bootcamps[0].name}</span>
                </div>
                <div className={styles.topRowRight}>
                  {bootcamps[0].isKdt && <Badge variant="kdt">KDT</Badge>}
                  {bootcamps[0].isEnded ? (
                    <Badge variant="ended">Ended</Badge>
                  ) : (
                    <Badge variant="active">Active</Badge>
                  )}
                  <button type="button" className={styles.delete}>
                    <DeleteIcon size={20} />
                  </button>
                </div>
              </div>
              <div className={styles.organizer}>{bootcamps[0].organizer}</div>
              <div className={styles.date}>
                <CalenderIcon size={16} style={{ verticalAlign: "middle" }} />
                {` ${bootcamps[0].startedAt} - ${bootcamps[0].endedAt} * ${bootcamps[0].classDates.length}일`}
              </div>
            </div>
          </div>
          {/* 아이템끝 */}
        </div>
      </div>
    </Card>
  );
};

export default MyBootcampListCard;
