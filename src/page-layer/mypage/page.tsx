"use client";
import { useMe } from "@/feature/user";
import { Card, Spinner } from "@/shared/ui";

import styles from "./MyPage.module.scss";
import { AccountActionsCard } from "./ui/AccountActionsCard";
import { AdminPanelCard } from "./ui/AdminPanelCard";
import { AlarmSettingCard } from "./ui/AlarmSettingCard";
import { MyBootcampListCard } from "./ui/MyBootcampListCard";
import { UserInfoCard } from "./ui/UserInfoCard";

const MyPage = () => {
  const { data: me, isLoading } = useMe();

  return (
    <div className={styles.container}>
      <div className={styles.myPageCard}>
        {isLoading ? (
          <Card>
            <Spinner size="md" />{" "}
          </Card>
        ) : (
          <UserInfoCard user={me} />
        )}
      </div>

      <div className={styles.myPageCard}>
        <MyBootcampListCard />
      </div>
      <div className={styles.myPageCard}>
        <AlarmSettingCard />
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
