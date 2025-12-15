"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { BootcampTest as Bootcamp } from "@/feature/bootcamp";
import {
  AddIcon,
  CalendarIcon,
  DeleteIcon,
  InstituteIcon,
  StudyIcon,
} from "@/shared/assets/icons";
import { Button, Card, Modal } from "@/shared/ui";
import { Badge } from "@/shared/ui/Badge";

import styles from "./MyBootcampListCard.module.scss";

interface MyBootcampListCardProps {
  bootcamps: Bootcamp[];
}

const MyBootcampListCard = ({ bootcamps }: MyBootcampListCardProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectBootcampId, setSelectBootcampId] = useState<number | null>(null);
  const router = useRouter();

  const handleRegist = () => {
    router.push("/bootcamps");
  };

  const handleDelete = () => {
    console.log("부트캠트아이디", selectBootcampId);
    setModalOpen(false);
  };

  const handleOpenModal = (bootcampId: number) => {
    setSelectBootcampId(bootcampId);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setSelectBootcampId(null);
    setModalOpen(false);
  };

  return (
    <Card title="나의 부트캠프">
      <div className={styles.container}>
        <div className={styles.listLayout}>
          {/* 아이템시작 */}
          {!bootcamps.length && (
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
                    <button
                      onClick={() => handleOpenModal(b.id)}
                      type="button"
                      className={styles.delete}
                      aria-label={`${b.name} 부트캠프 삭제`}
                    >
                      <DeleteIcon size={20} />
                    </button>
                  </div>
                </div>
                <div className={styles.organizer}>
                  <InstituteIcon size={16} /> {b.organizer}
                </div>
                <div className={styles.date}>
                  <CalendarIcon size={16} />
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
      {isModalOpen && (
        <Modal onClose={handleCloseModal} title="부트캠프 삭제확인">
          <div className={styles.modalContainer}>
            <div>
              <span>
                정말로 삭제하시겠어요? <br />
                삭제하면 출석 정보는 복구할 수 없어요.
              </span>
            </div>
            <div className={styles.modalButtonLayout}>
              <Button variant="outline" onClick={handleCloseModal}>
                취소
              </Button>
              <Button onClick={handleDelete}>삭제하기</Button>
            </div>
          </div>
        </Modal>
      )}
    </Card>
  );
};

export default MyBootcampListCard;
