import { AxiosError } from "axios";
import { redirect } from "next/navigation";

import { getApiServer } from "@/shared/server/server";

import styles from "./layout.module.scss";

export default async function SubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const apiServer = await getApiServer();
    await apiServer.get("/users/me");
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      redirect("/signin");
    }
    console.error("[MainLayout] Auth check failed:", error);
    throw error;
  }
  return (
    <div className={styles.layout}>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
