import React from "react";

import { X as XIcon, Pencil } from "@/shared/assets/icons";

import styles from "./FloatingBar.module.scss";

interface FloatingBarProps {
  selectedCount: number;
  onClear: () => void;
  onEdit: () => void;
}

const FloatingBar = ({ selectedCount, onClear, onEdit }: FloatingBarProps) => {
  return (
    <div className={styles.floatingBar}>
      <span className={styles.selectionText}>
        {selectedCount}개 날짜 선택됨
      </span>
      <button
        type="button"
        className={styles.clearButton}
        onClick={onClear}
        aria-label="선택 초기화"
      >
        <XIcon width={16} height={16} />
      </button>
      <button
        type="button"
        className={styles.editButton}
        onClick={onEdit}
        aria-label="출결 등록"
      >
        <Pencil width={16} height={16} />
      </button>
    </div>
  );
};

export default FloatingBar;
