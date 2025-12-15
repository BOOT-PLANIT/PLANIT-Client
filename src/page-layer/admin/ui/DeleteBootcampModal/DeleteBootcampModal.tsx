import { Bootcamp } from "@/feature/bootcamp";
import { Button, Modal } from "@/shared/ui";

import styles from "./DeleteBootcampModal.module.scss";

interface DeleteBootcampModalProps {
  onClose: () => void;
  bootcamp: Bootcamp | null;
}

const DeleteBootcampModal = ({
  onClose,
  bootcamp,
}: DeleteBootcampModalProps) => {
  const handleBootcampRemove = () => {
    if (bootcamp) {
      console.log("부트캠프 삭제 아이디: ", bootcamp.id);
      onClose();
    }
  };

  return (
    <Modal onClose={onClose} title="삭제확인">
      <div className={styles.modalContainer}>
        <div>
          <span>
            정말로 삭제하시겠어요? <br />
            삭제하면 부트캠프 정보는 복구할 수 없어요.
          </span>
        </div>
        <div className={styles.modalButtonLayout}>
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button onClick={handleBootcampRemove}>삭제하기</Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteBootcampModal;
