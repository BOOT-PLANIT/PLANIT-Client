"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";

import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { hideToast } from "@/shared/store/toastSlice";

import styles from "./Toast.module.scss";

const ErrorIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="8" y1="8" x2="16" y2="16" />
    <line x1="16" y1="8" x2="8" y2="16" />
  </svg>
);

const InfoIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="8" r="1.2" fill="currentColor" stroke="none" />
    <line x1="12" y1="11" x2="12" y2="17" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12.5 L11 15.5 L16 9.5" />
  </svg>
);

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
          <CheckIcon />
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
