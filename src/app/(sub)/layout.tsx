import { checkAuth } from "@/feature/auth/server";

import styles from "./layout.module.scss";

export default async function SubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();
  return (
    <div className={styles.layout}>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
