import { useMutation } from "@tanstack/react-query";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { auth } from "@/shared/config/firebaseConfig";
import { setAuth } from "@/shared/store/authSlice";

import { login } from "../api/login";

export const useGoogleLogin = () => {
  const dispatch = useDispatch();
  const rouer = useRouter();

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
      rouer.replace("/dashboard");
    },
  });
};
