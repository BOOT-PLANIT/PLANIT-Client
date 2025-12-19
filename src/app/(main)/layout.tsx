import { Header, NavItem } from "@/widgets/ui";

import styles from "./layout.module.scss";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.layout}>
      <Header title="PLANIT" userName="PLANIT">
        <NavItem href="/dashboard">대시보드</NavItem>
        <NavItem href="/attendance">출결관리</NavItem>
      </Header>

      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default MainLayout;
