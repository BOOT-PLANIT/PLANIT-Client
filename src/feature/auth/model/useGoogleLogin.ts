import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { MeResponse } from "@/feature/user";
import { apiClient, ApiResponse } from "@/shared/api";
import { auth } from "@/shared/config/firebaseConfig";
import { setAuth } from "@/shared/store/authSlice";
import { showToast } from "@/shared/store/toastSlice";

import { login } from "../api/login";

export const useGoogleLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const provider = new GoogleAuthProvider();

      if (auth.currentUser) {
        await signOut(auth);
      }

      const result = await signInWithPopup(auth, provider);

      const idToken = await result.user.getIdToken();

      await login(idToken);

      const meRes = await apiClient.get<ApiResponse<MeResponse>>("/users/me");

      return meRes.data.data;
    },

    onSuccess: (me) => {
      dispatch(
        setAuth({
          userId: me.id,
          displayName: me.displayName,
          recentBootcampId: me.recentBootcampId,
        }),
      );
      router.replace(me.recentBootcampId == null ? "/bootcamps" : "/dashboard");
    },

    onError: async (error: unknown) => {
      await signOut(auth);

      let message = "로그인에 실패했어요";

      if (error instanceof FirebaseError) {
        if (error.code === "auth/popup-closed-by-user") {
          message = "로그인이 취소되었어요";
        } else if (error.code === "auth/popup-blocked") {
          message = "팝업 차단을 해제해주세요";
        } else if (error.code === "auth/user-token-expired") {
          message = "세션이 만료되어 다시 로그인해주세요";
        } else {
          console.error("로그인 오류:", error);
        }
      }

      dispatch(
        showToast({
          type: "error",
          message,
        }),
      );
    },
  });
};
