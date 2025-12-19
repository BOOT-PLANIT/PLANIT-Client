"use client";
import { useMe } from "@/feature/user";

import styles from "./MyPage.module.scss";
import { AccountActionsCard } from "./ui/AccountActionsCard";
import { AdminPanelCard } from "./ui/AdminPanelCard";
import { MyBootcampListCard } from "./ui/MyBootcampListCard";
import { UserInfoCard } from "./ui/UserInfoCard";

const MyPage = () => {
  const { data: me, isLoading, isError } = useMe();

  return (
    <div className={styles.container}>
      <div className={styles.myPageCard}>
        <UserInfoCard user={me} isLoading={isLoading} isError={isError} />
      </div>

      <div className={styles.myPageCard}>
        <MyBootcampListCard />
      </div>
      {me && me.userLevel === "ADMIN" && (
        <div className={styles.myPageCard}>
          <AdminPanelCard />
        </div>
      )}
      <div className={styles.myPageCard}>
        <AccountActionsCard />
      </div>
    </div>
  );
};

export default MyPage;
