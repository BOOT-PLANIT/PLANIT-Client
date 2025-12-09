import { X } from "@/shared/assets";

import styles from "./Modal.module.scss";

interface ModalProps {
  children?: React.ReactNode;
  onClose?: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <X />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
