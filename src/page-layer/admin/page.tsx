"use client";
import { useState } from "react";

import { Bootcamp, BootcampList, useBootcampSummary } from "@/feature/bootcamp";
import { ModalType } from "@/feature/bootcamp/ui/BootcampList";
import { AddIcon, CalendarIcon, StudyIcon } from "@/shared/assets";
import { Button, Card } from "@/shared/ui";

import styles from "./AdminPage.module.scss";
import { AddBootcampModal } from "./ui/AddBootcampModal";
import { DeleteBootcampModal } from "./ui/DeleteBootcampModal";
import { EditBootcampModal } from "./ui/EditBootcampModal";
import { EditSessionModal } from "./ui/EditSessionModal";
import { StatCard } from "./ui/StatCard";

const AdminPage = () => {
  const [isModalOpen, setOpenModal] = useState<ModalType>(null);
  const [selectedBootcamp, setSelectedBootcamp] = useState<Bootcamp | null>(
    null,
  );

  const { data: bootcampSummaryData = { activeCount: 0, totalCount: 0 } } =
    useBootcampSummary();
  const handleModalOpen = (type: ModalType, bootcamp?: Bootcamp) => {
    setOpenModal(type);
    if (bootcamp) {
      setSelectedBootcamp(bootcamp);
    }
  };
  const handleModalClose = () => {
    setOpenModal(null);
    setSelectedBootcamp(null);
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
              onClick={() => handleModalOpen("add")}
              icon={<AddIcon size={18} />}
            >
              부트캠프 추가
            </Button>
          </div>
        </div>
        <div className={styles.cardLayout}>
          <StatCard
            icon={<StudyIcon size={20} />}
            label="전체 부트캠프 개수"
            value={bootcampSummaryData.totalCount}
            color="blue"
          />
          <StatCard
            icon={<CalendarIcon size={20} />}
            label="진행 중인 전체 부트캠프"
            value={bootcampSummaryData.activeCount}
            color="purple"
          />
        </div>
        <div className={styles.listLayout}>
          <Card title="부트캠프 목록">
            <BootcampList manage={true} onModalOpen={handleModalOpen} />
          </Card>
        </div>
      </div>
      {isModalOpen === "add" && <AddBootcampModal onClose={handleModalClose} />}
      {isModalOpen === "edit" && selectedBootcamp && (
        <EditBootcampModal
          onClose={handleModalClose}
          bootcamp={selectedBootcamp}
        />
      )}
      {isModalOpen === "session" && selectedBootcamp && (
        <EditSessionModal
          onClose={handleModalClose}
          bootcamp={selectedBootcamp}
        />
      )}
      {isModalOpen === "delete" && selectedBootcamp && (
        <DeleteBootcampModal
          onClose={handleModalClose}
          bootcamp={selectedBootcamp}
        />
      )}
    </>
  );
};

export default AdminPage;
