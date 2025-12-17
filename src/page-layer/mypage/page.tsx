import { MeResponse } from "@/feature/user";

import styles from "./MyPage.module.scss";
import { AccountActionsCard } from "./ui/AccountActionsCard";
import { AdminPanelCard } from "./ui/AdminPanelCard";
import { AlarmSettingCard } from "./ui/AlarmSettingCard";
import { MyBootcampListCard } from "./ui/MyBootcampListCard";
import { UserInfoCard } from "./ui/UserInfoCard";

const userProfile: MeResponse = {
  id: 1,
  uid: "vWXeL",
  email: "adcdemail@gmail.com",
  displayName: "정현문",
  photoUrl: "https://lh3.googleusercontent.com/",
  userLevel: "ADMIN",
  provider: "google.com",
  emailVerified: true,
  createdAt: "2025-10-24 15:49:15",
  lastLoginAt: "2025-12-12 09:16:30",
  recentBootcampId: 1,
};

const MyPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.myPageCard}>
        <UserInfoCard user={userProfile} />
      </div>

      <div className={styles.myPageCard}>
        <MyBootcampListCard />
      </div>
      <div className={styles.myPageCard}>
        <AlarmSettingCard />
      </div>
      {userProfile.userLevel === "ADMIN" && (
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
