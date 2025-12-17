import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { MeResponse } from "@/feature/user";
import { apiClient, ApiResponse } from "@/shared/api";
import { auth } from "@/shared/config/firebaseConfig";
import { showToast } from "@/shared/store/toastSlice";

import { login } from "../api/login";

export const useGoogleLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      await login(idToken);

      const meRes = await apiClient.get<ApiResponse<MeResponse>>("/users/me");
      return meRes.data.data;
    },
    onSuccess: (me) => {
      router.replace(
        me.recentBootcampId == null ? "/bootcamps/new" : "/dashboard",
      );
    },
    onError: (error: unknown) => {
      let message = "로그인에 실패했어요";

      if (error instanceof FirebaseError) {
        if (error.code === "auth/popup-closed-by-user") {
          message = "로그인이 취소되었어요";
        } else if (error.code === "auth/popup-blocked") {
          message = "팝업 차단을 해제해주세요";
        } else {
          // 예상치 못한 에러는 로깅
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
