import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "@/shared/config/firebaseConfig";

export async function googleLogin() {
  if (!auth) throw new Error("Auth not initialized");

  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  const idToken = await result.user.getIdToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      credentials: "include",
    },
  );

  if (!res.ok) throw new Error("로그인 실패");
}
