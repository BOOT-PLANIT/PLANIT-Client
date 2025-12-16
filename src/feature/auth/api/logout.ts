import { useMutation } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";

import { auth } from "@/shared/config/firebaseConfig";
import { queryClient } from "@/shared/query/queryClient";
import { clearAuth } from "@/shared/store/authSlice";

export const useLogout = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async () => {
      console.log("mutationFn 시작");
      await signOut(auth);

      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );
    },
    onSuccess: () => {
      console.log("로그아웃 성공");
      dispatch(clearAuth());
      queryClient.clear();
      window.location.href = "/signin";
    },
  });
};
