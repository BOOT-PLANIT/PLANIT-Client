import { BootcampTest as Bootcamp } from "@/feature/bootcamp";
import { User } from "@/feature/user";
import { Card } from "@/shared/ui";

import styles from "./MyPage.module.scss";
import { MyBootcampListCard } from "./ui/MyBootcampListCard";
import { UserInfoCard } from "./ui/UserInfoCard";

const userProfile: User = {
  id: 1,
  uid: "vWXeLvJa8gfGjGxttVeBztkBc0t1",
  email: "adcdemail@gmail.com",
  displayName: "정현문",
  photoUrl:
    "https://lh3.googleusercontent.com/a/ACg8ocJPONv2549sT57Bt9LekE1hBHwYRV1k66U9iRB3qlVBZ4jj2Q=s96-c",
  userLevel: "USER",
  provider: "google.com",
  emailVerified: true,
  createdAt: "2025-10-24 15:49:15",
  lastLoginAt: "2025-12-12 09:16:30",
};

const dummyBootcamps: Bootcamp[] = [
  {
    id: 1,
    name: "ITQ 쪽집게 강의』 ITQ OA Master(한글+파워포인트+엑셀) 자격증 취득 과정",
    organizer: "멀티 캠퍼스",
    isKdt: true,
    startedAt: "2025-12-01",
    endedAt: "2025-12-05",
    isEnded: true,
    classDates: [
      "2025-12-01",
      "2025-12-02",
      "2025-12-03",
      "2025-12-04",
      "2025-12-05",
    ],
  },
  {
    id: 2,
    name: "ChatGPT 마스터 클래스 : 남들보다 100배 더 잘 쓰기 위한 활용법 A to Z",
    organizer: "인공지능개발원",
    isKdt: false,
    startedAt: "2026-01-20",
    endedAt: "2026-01-25",
    isEnded: false,
    classDates: [
      "2026-01-20",
      "2026-01-21",
      "2026-01-22",
      "2026-01-23",
      "2026-01-24",
    ],
  },
];

const MyPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.userInfoCard}>
        <UserInfoCard user={userProfile} />
      </div>

      <div className={styles.myBootcampsCard}>
        <MyBootcampListCard bootcamps={dummyBootcamps} />
      </div>
      <div className={styles.myBootcampsCard}>
        <Card title="나의 부트캠프">ㅇ</Card>
      </div>
    </div>
  );
};

export default MyPage;
