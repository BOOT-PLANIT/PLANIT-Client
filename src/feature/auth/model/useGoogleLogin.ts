import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

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
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      return login(idToken);
    },
    onSuccess: (data) => {
      dispatch(
        setAuth({
          userId: data.userId,
          recentBootcampId: data.recentBootcampId,
        }),
      );
      router.replace("/dashboard");
    },
    onError: (error: unknown) => {
      let message = "로그인에 실패했어요.";

      if (error instanceof FirebaseError) {
        if (error.code === "auth/popup-closed-by-user") {
          message = "로그인이 취소되었어요.";
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
