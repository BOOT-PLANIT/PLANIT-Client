"use client";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Enrollment,
  useDeleteMyBootcamp,
  useMyBootcamps,
} from "@/feature/enrollment";
import {
  AddIcon,
  CalendarIcon,
  DeleteIcon,
  InstituteIcon,
  StudyIcon,
} from "@/shared/assets/icons";
import { useToast } from "@/shared/lib";
import { Button, Card, Modal, Spinner } from "@/shared/ui";
import { Badge } from "@/shared/ui/Badge";

import styles from "./MyBootcampListCard.module.scss";

const MyBootcampListCard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectBootcampId, setSelectBootcampId] = useState<number | null>(null);
  const router = useRouter();
  const userType = "existing";
  const toast = useToast();

  const { data, isLoading, isError } = useMyBootcamps();
  const myBootcamps: Enrollment[] = data?.data ?? [];
  const { mutate: deleteMyBootcamp } = useDeleteMyBootcamp();

  const handleRegist = () => {
    router.push(`/bootcamps?userType=${userType}`);
  };

  const handleDelete = () => {
    if (!selectBootcampId) {
      toast.error("부트캠프를 불러오는데 실패했습니다.");
      setModalOpen(false);
    } else {
      deleteMyBootcamp(selectBootcampId, {
        onSuccess: () => {
          toast.success("부트캠프 삭제를 완료하였습니다.");
          setModalOpen(false);
        },
        onError: (error) => {
          let message = "삭제 중 오류가 발생했습니다.";

          if (error instanceof AxiosError) {
            message =
              error.response?.data?.message ??
              error.response?.data?.error ??
              message;
          }
          toast.error(message);
          setModalOpen(false);
        },
      });
    }
  };

  const handleOpenModal = (bootcampId: number) => {
    setSelectBootcampId(bootcampId);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setSelectBootcampId(null);
    setModalOpen(false);
  };

  if (isLoading) {
    return (
      <Card title="나의 부트캠프">
        <div className={styles.container}>
          <Spinner size="lg" />
        </div>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card title="나의 부트캠프">
        <div className={styles.container}>
          <div className={styles.noneBootcamp}>
            <span className={styles.noneTitle}>오류가 발생하였습니다.</span>
            <span className={styles.noneDescription}>
              잠시후 다시 시도해주세요!
            </span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card title="나의 부트캠프">
      <div className={styles.container}>
        <div className={styles.listLayout}>
          {/* 아이템시작 */}
          {!myBootcamps.length && (
            <div className={styles.noneBootcamp}>
              <span className={styles.noneTitle}>
                진행중인 부트캠프가 없습니다.
              </span>
              <span className={styles.noneDescription}>
                하단의 버튼을 통해 부트캠프를 등록해주세요!
              </span>
            </div>
          )}
          {myBootcamps.map((b) => (
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
                  {` ${b.startedAt} - ${b.endedAt}`}
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
