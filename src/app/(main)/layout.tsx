import { AxiosError } from "axios";
import { redirect } from "next/navigation";

import { getApiServer } from "@/shared/server/server";
import { Header, NavItem } from "@/widgets/ui";

import styles from "./layout.module.scss";

export default async function MainLayout({
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
      <Header title="PLANIT" userName="PLANIT">
        <NavItem href="/dashboard">대시보드</NavItem>
        <NavItem href="/attendance">출결관리</NavItem>
      </Header>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
