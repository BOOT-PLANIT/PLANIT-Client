"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useLogout } from "@/feature/auth";
import { LogoutIcon, UserRemoveIcon } from "@/shared/assets";
import { useToast } from "@/shared/lib";
import { Button, Card, Modal } from "@/shared/ui";

import styles from "./AccountActionsCard.module.scss";

const AccountActionsCard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const { mutate: logout, isPending } = useLogout();

  const handleUserRemove = () => {
    toast.success("그동안 이용해 주셔서 감사합니다.");
    router.replace("/signin");
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Card title="계정 관리">
      <div className={styles.container}>
        <Button
          onClick={() => logout()}
          disabled={isPending}
          variant="outline"
          className={styles.button}
        >
          <LogoutIcon size={16} />
          <span> 로그아웃</span>
        </Button>
        <Button
          onClick={handleOpenModal}
          variant="outline"
          className={styles.button}
        >
          <UserRemoveIcon size={16} />
          <span> PLANIT 탈퇴하기</span>
        </Button>
      </div>
      {isModalOpen && (
        <Modal onClose={handleCloseModal} title="탈퇴확인">
          <div className={styles.modalContainer}>
            <div>
              <span>
                정말로 탈퇴하시겠어요? <br />
                탈퇴하면 계정 정보는 복구할 수 없어요.
              </span>
            </div>
            <div className={styles.modalButtonLayout}>
              <Button variant="outline" onClick={handleCloseModal}>
                취소
              </Button>
              <Button onClick={handleUserRemove}>탈퇴하기</Button>
            </div>
          </div>
        </Modal>
      )}
    </Card>
  );
};

export default AccountActionsCard;
