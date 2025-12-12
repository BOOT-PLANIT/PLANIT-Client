"use client";
import { useRouter } from "next/navigation";

import { BootcampTest as Bootcamp } from "@/feature/bootcamp";
import {
  AddIcon,
  CalenderIcon,
  DeleteIcon,
  InstituteIcon,
  StudyIcon,
} from "@/shared/assets/icons";
import { Button, Card } from "@/shared/ui";
import { Badge } from "@/shared/ui/Badge";

import styles from "./MyBootcampListCard.module.scss";

interface MyBootcampListCardProps {
  bootcamps: Bootcamp[];
}

const MyBootcampListCard = ({ bootcamps }: MyBootcampListCardProps) => {
  const router = useRouter();

  const handleRegist = () => {
    router.push("/bootcamps");
  };

  return (
    <Card title="나의 부트캠프">
      <div className={styles.container}>
        <div className={styles.listLayout}>
          {/* 아이템시작 */}
          {bootcamps.length == 0 && (
            <div className={styles.noneBootcamp}>
              <span className={styles.noneTitle}>
                진행중인 부트캠프가 없습니다.
              </span>
              <span className={styles.noneDescription}>
                하단의 버튼을 통해 부트캠프를 등록해주세요!
              </span>
            </div>
          )}
          {bootcamps.map((b) => (
            <div key={b.id} className={styles.bootcampItem}>
              <div className={styles.icon}>
                <StudyIcon size={24} />
              </div>

              <div className={styles.infoLayout}>
                <div className={styles.infoTopRow}>
                  <div className={styles.topRowLeft}>
                    <span className={styles.name}>{b.name}</span>
                  </div>
                  <div className={styles.topRowRight}>
                    {b.isKdt && <Badge variant="kdt">KDT</Badge>}
                    {b.isEnded ? (
                      <Badge variant="ended">Ended</Badge>
                    ) : (
                      <Badge variant="active">Active</Badge>
                    )}
                    <button type="button" className={styles.delete}>
                      <DeleteIcon size={20} />
                    </button>
                  </div>
                </div>
                <div className={styles.organizer}>
                  <InstituteIcon size={16} /> {b.organizer}
                </div>
                <div className={styles.date}>
                  <CalenderIcon size={16} />
                  {` ${b.startedAt} - ${b.endedAt} · ${b.classDates.length}`}일
                </div>
              </div>
            </div>
          ))}

          {/* 아이템끝 */}
        </div>
        <div className={styles.bottomRow}>
          <Button
            onClick={handleRegist}
            variant="primary"
            className={styles.registButton}
            icon={<AddIcon />}
          >
            부트캠프 등록하기
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MyBootcampListCard;
