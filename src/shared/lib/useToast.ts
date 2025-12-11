"use client";

import { useMemo } from "react";

import { useAppDispatch } from "../store/hooks";
import { showToast } from "../store/toastSlice";

const useToast = () => {
  const dispatch = useAppDispatch();

  return useMemo(
    () => ({
      success: (message: string) => {
        dispatch(showToast({ message, type: "success" }));
      },
      error: (message: string) => {
        dispatch(showToast({ message, type: "error" }));
      },
      info: (message: string) => {
        dispatch(showToast({ message, type: "info" }));
      },
    }),
    [dispatch],
  );
};

export default useToast;
