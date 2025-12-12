"use client";

import { useEffect, useRef } from "react";

import { X } from "@/shared/assets";

import styles from "./Modal.module.scss";

interface ModalProps {
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
}

const Modal = ({ title, children, onClose }: ModalProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay}>
      <div
        ref={modalRef}
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          ref={closeButtonRef}
          className={styles.closeButton}
          onClick={onClose}
        >
          <X />
        </button>
        <h1 className={styles.title}>{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default Modal;
