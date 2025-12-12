import styles from "./MyPage.module.scss";
import { UserInfoCard } from "./ui";

type authorityType = "admin" | "student";
export interface User {
  userName: string;
  userEmail: string;
  userEnrolledAt: string;
  authority: authorityType;
}

const userProfile: User = {
  userName: "MOON",
  userEmail: "abcdemail@gmail.com",
  userEnrolledAt: "2025-12-01",
  authority: "admin",
};

const MyPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <UserInfoCard user={userProfile} />
      </div>
    </div>
  );
};

export default MyPage;
