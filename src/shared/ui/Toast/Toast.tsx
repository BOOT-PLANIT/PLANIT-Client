"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";

import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { hideToast } from "@/shared/store/toastSlice";

import styles from "./Toast.module.scss";

const Toast = () => {
  const dispatch = useAppDispatch();
  const toast = useAppSelector((state) => state.toast);

  const { visible, title, message, type } = toast;

  // 자동 닫힘
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => dispatch(hideToast()), 2000);
      return () => clearTimeout(timer);
    }
  }, [visible, dispatch]);

  if (!visible) return null;

  const element = (
    <div className={`${styles.toast} ${styles[type]}`}>
      {type === "success" && <div className={styles.icon}>성공</div>}
      {type === "error" && <div className={styles.icon}>에러</div>}
      {type === "info" && <div className={styles.icon}>기본</div>}

      <div className={styles.content}>
        {title && <div className={styles.title}>{title}</div>}
        {message && <div className={styles.message}>{message}</div>}
      </div>
    </div>
  );
  return createPortal(element, document.body);
};

export default Toast;
