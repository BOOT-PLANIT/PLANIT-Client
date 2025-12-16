import { useMutation } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";

import { apiClient } from "@/shared/api";
import { auth } from "@/shared/config/firebaseConfig";
import { queryClient } from "@/shared/query/queryClient";
import { clearAuth } from "@/shared/store/authSlice";

export const useLogout = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async () => {
      await signOut(auth);
      await apiClient.post("/auth/logout");
    },
    onSuccess: () => {
      dispatch(clearAuth());
      queryClient.clear();
      window.location.href = "/signin";
    },
  });
};
