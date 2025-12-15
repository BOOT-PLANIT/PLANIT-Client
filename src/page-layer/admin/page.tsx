"use client";
import { useState } from "react";

import { BootcampList } from "@/feature/bootcamp";
import {
  AddIcon,
  CalendarIcon,
  InstituteIcon,
  StudyIcon,
} from "@/shared/assets";
import { Button, Card } from "@/shared/ui";

import styles from "./AdminPage.module.scss";
import { AddBootcampModal } from "./ui/AddBootcampModal";
import { StatCard } from "./ui/StatCard";

const AdminPage = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const handleAddBootcampModalOpen = () => {
    setAddModalOpen(true);
  };
  const handleAddBootcampModalClose = () => {
    setAddModalOpen(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className={styles.titleLayout}>
            <div className={styles.title}>관리자 페이지</div>
            <div className={styles.description}>
              부트캠프와 일정을 관리할수 있습니다.
            </div>
          </div>
          <div className={styles.buttonLayout}>
            <Button
              onClick={handleAddBootcampModalOpen}
              icon={<AddIcon size={18} />}
            >
              부트캠프 추가
            </Button>
          </div>
        </div>
        <div className={styles.cardLayout}>
          <StatCard
            icon={<StudyIcon size={20} />}
            label="전체 부트 캠프 개수"
            value={5}
            color="blue"
          />
          <StatCard
            icon={<InstituteIcon size={20} />}
            label="전체 훈련 기관 개수"
            value={3}
            color="green"
          />
          <StatCard
            icon={<CalendarIcon size={20} />}
            label="진행 중인 전체 부트 캠프"
            value={2}
            color="purple"
          />
        </div>
        <div className={styles.listLayout}>
          <Card title="부트캠프 목록">
            <BootcampList manage={true} />
          </Card>
        </div>
      </div>
      {isAddModalOpen && (
        <AddBootcampModal onClose={handleAddBootcampModalClose} />
      )}
    </>
  );
};

export default AdminPage;
