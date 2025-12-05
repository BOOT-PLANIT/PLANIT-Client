"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";

import { InfoIcon, ErrorIcon, SuccessIcon } from "@/shared/assets";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { hideToast } from "@/shared/store/toastSlice";

import styles from "./Toast.module.scss";

const Toast = () => {
  const dispatch = useAppDispatch();
  const toast = useAppSelector((state) => state.toast);

  const { visible, message, type } = toast;

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => dispatch(hideToast()), 2300);
      return () => clearTimeout(timer);
    }
  }, [visible, dispatch]);

  if (!visible) return null;

  const element = (
    <div className={`${styles.toast} ${styles[type]}`}>
      {type === "success" && (
        <div className={styles.icon}>
          <SuccessIcon />
        </div>
      )}
      {type === "error" && (
        <div className={styles.icon}>
          <ErrorIcon />
        </div>
      )}
      {type === "info" && (
        <div className={styles.icon}>
          <InfoIcon />
        </div>
      )}

      <div className={styles.content}>
        {message && <div className={styles.message}>{message}</div>}
      </div>
    </div>
  );
  return createPortal(element, document.body);
};

export default Toast;
