import { AxiosError } from "axios";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getApiServer } from "@/shared/server";

export async function checkAuth() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  try {
    const apiServer = await getApiServer();
    const res = await apiServer.get("/users/me");
    const me = res.data.data; // 서버에서 가져온 유저 정보

    if (pathname === "/signin") redirect("/dashboard");

    return me; // 유저 정보 반환
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      if (pathname !== "/signin") redirect("/signin");
      return null;
    }
    throw error;
  }
}
