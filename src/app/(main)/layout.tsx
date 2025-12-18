import { checkAuth } from "@/feature/auth/server";
import { Header, NavItem } from "@/widgets/ui";

import styles from "./layout.module.scss";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();
  return (
    <div className={styles.layout}>
      <Header title="PLANIT">
        <NavItem href="/dashboard">대시보드</NavItem>
        <NavItem href="/attendance">출결관리</NavItem>
      </Header>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
