"use client";
import { useRouter } from "next/navigation";

import ShieldIcon from "@/shared/assets/icons/ShieldIcon";
import { Button, Card } from "@/shared/ui";

import styles from "./AdminPanelCard.module.scss";

const AdminPanelCard = () => {
  const router = useRouter();
  const handleAdmin = () => {
    router.push("/admin");
  };

  return (
    <Card
      titleIcon={<ShieldIcon size={20} className={styles.titleIcon} />}
      title="관리자 페이지"
    >
      <div className={styles.container}>
        <span className={styles.description}>
          관리자 페이지에 접속하여 부트캠프 일정을 관리하세요.
        </span>
        <Button onClick={handleAdmin} icon={<ShieldIcon size={18} />}>
          관리자 페이지로 이동
        </Button>
      </div>
    </Card>
  );
};

export default AdminPanelCard;
