import { redirect } from "next/navigation";

import { getApiServer } from "@/shared/server/server";

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
    console.log(error);
    redirect("/signin");
  }
  return (
    <div className={styles.layout}>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
