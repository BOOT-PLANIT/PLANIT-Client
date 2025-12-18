import { AxiosError } from "axios";
import { redirect } from "next/navigation";

import { getApiServer } from "@/shared/server";

export async function checkAuth() {
  try {
    const apiServer = await getApiServer();
    await apiServer.get("/users/me");
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      redirect("/signin");
    }
    throw error;
  }
}
