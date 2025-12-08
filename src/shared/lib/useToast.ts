"use client";

import { useAppDispatch } from "../store/hooks";
import { showToast } from "../store/toastSlice";

const useToast = () => {
  const dispatch = useAppDispatch();

  return {
    success: (message: string) => {
      dispatch(showToast({ message, type: "success" }));
    },
    error: (message: string) => {
      dispatch(showToast({ message, type: "error" }));
    },
    info: (message: string) => {
      dispatch(showToast({ message, type: "info" }));
    },
  };
};

export default useToast;
