import { Bootcamp, useDeleteBootcamp } from "@/feature/bootcamp";
import { useToast } from "@/shared/lib";
import { Button, Modal } from "@/shared/ui";

import styles from "./DeleteBootcampModal.module.scss";

interface DeleteBootcampModalProps {
  onClose: () => void;
  bootcamp: Bootcamp;
}

const DeleteBootcampModal = ({
  onClose,
  bootcamp,
}: DeleteBootcampModalProps) => {
  const toast = useToast();
  const deleteBootcamp = useDeleteBootcamp();

  const handleBootcampRemove = () => {
    if (bootcamp) {
      deleteBootcamp.mutate(bootcamp.id, {
        onSuccess: () => {
          toast.success("부트캠프 삭제를 완료하였습니다.");
          onClose();
        },
        onError: () => {
          toast.error("삭제중 오류발생");
          onClose();
        },
      });
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
