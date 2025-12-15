"use client";
import { useState } from "react";

import { Bootcamp } from "@/feature/bootcamp";
import { Button, Calendar, Modal } from "@/shared/ui";
import { DateData } from "@/shared/ui/Calendar";
import { parseDateString } from "@/shared/utils";

import styles from "./EditSessionModal.module.scss";

interface EditSessionModalProps {
  onClose: () => void;
  bootcamp: Bootcamp | null;
}

const getDateKey = (date: Date): string => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

const EditSessionModal = ({ onClose, bootcamp }: EditSessionModalProps) => {
  const [selectedDatesForEdit, setSelectedDatesForEdit] = useState<Date[]>([]);

  const handleSelectSession = (dates: Date[]) => {
    setSelectedDatesForEdit(dates);
  };

  const handleEditSession = () => {
    const stringClassDate = selectedDatesForEdit.map((date) =>
      getDateKey(date),
    );
    console.log(stringClassDate);
  };

  if (!bootcamp) return <div>부트캠프에 입력된 강의가 없습니다.</div>;

  const calendarSessionDate: DateData[] = bootcamp?.classDates.map((date) => {
    return { date: parseDateString(date), isCurrentUnit: true };
  });

  return (
    <Modal title="부트캠프 일정 수정" onClose={onClose}>
      <div className={styles.layout}>
        <div className={styles.container}>
          <div className={styles.description}>
            부트캠프의 일정을 수정하세요.
          </div>

          <Calendar
            onEdit={handleSelectSession}
            dates={calendarSessionDate}
            unitColors={{ currentUnit: "var(--color-purple-lightest)" }}
            allowSelectionWithoutData={true}
          />

          <div className={styles.buttonLayout}>
            <Button onClick={onClose} variant="outline" width="70px">
              취소
            </Button>
            <Button onClick={handleEditSession} width="120px">
              일정 수정
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditSessionModal;
