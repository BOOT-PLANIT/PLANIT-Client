"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button, Calendar, Input, Modal } from "@/shared/ui";
import { DateData } from "@/shared/ui/Calendar";
import { parseDateString } from "@/shared/utils";

import styles from "./EditBootcampModal.module.scss";

interface AddBootcampModalProps {
  onClose: () => void;
  bootcampId: number | null;
}

interface BootcampFormValues {
  organizer: string;
  name: string;
  isKdt: boolean;
  classDates: string[];
}

const getDateKey = (date: Date): string => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

const dummyDate = [
  "2025-12-10",
  "2025-12-11",
  "2025-12-12",
  "2025-12-15",
  "2025-12-16",
  "2025-12-17",
  "2025-12-18",
  "2025-12-19",
];
//bootcampId 추가해야됨
const EditBootcampModal = ({ onClose }: AddBootcampModalProps) => {
  const [selectedDatesForEdit, setSelectedDatesForEdit] = useState<Date[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BootcampFormValues>({
    defaultValues: {
      isKdt: false,
    },
  });
  const onSubmit = (data: BootcampFormValues) => {
    console.log("제출 데이터:", data);
    onClose();
  };

  const calendarSessionDate: DateData[] = dummyDate.map((date) => {
    return { date: parseDateString(date), isCurrentUnit: true };
  });

  const handleSessionEditModal = (dates: Date[]) => {
    setSelectedDatesForEdit(dates);
    setModalOpen(true);
  };

  const handleSessionEditSubmit = () => {
    const stringClassDate = selectedDatesForEdit.map((date) =>
      getDateKey(date),
    );
    console.log(stringClassDate);
  };

  return (
    <Modal title="부트캠프 수정" onClose={onClose}>
      <div className={styles.layout}>
        <div className={styles.container}>
          <div className={styles.description}>
            부트캠프의 상세정보 및 일정을 수정하세요.
          </div>

          <form className={styles.formLayout} onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="훈련기관 이름"
              placeholder="ex. 멀티 캠퍼스"
              errorMessage={errors.organizer?.message}
              {...register("organizer", {
                required: "훈련기관 이름은 필수입니다.",
              })}
            />
            <Input
              label="부트캠프 이름"
              placeholder="ex. [LG유플러스] 유레카 프론트엔드 개발자"
              errorMessage={errors.name?.message}
              {...register("name", {
                required: "부트캠프 이름은 필수입니다.",
              })}
            />
            <label className={styles.kdtCheckBox}>
              <input type="checkbox" {...register("isKdt")} />
              <div className={styles.kdtContent}>
                <span className={styles.kdtTitle}>
                  K-Digital Training (KDT) 훈련
                </span>
                <span className={styles.kdtDescription}>
                  이 부트캠프가 KDT 훈련인지 확인하세요
                </span>
              </div>
            </label>

            <Calendar
              onEdit={handleSessionEditModal}
              dates={calendarSessionDate}
              unitColors={{ currentUnit: "var(--color-purple-lightest)" }}
            />

            <div className={styles.buttonLayout}>
              <Button onClick={onClose} variant="outline" width="70px">
                취소
              </Button>
              <Button type="submit" width="120px">
                부트캠프 수정
              </Button>
            </div>
          </form>
        </div>
      </div>
      {isModalOpen && (
        <Modal title="일정 삭제 확인" onClose={() => setModalOpen(false)}>
          삭제 하시겠습니까?
          <Button onClick={() => setModalOpen(false)} variant="outline">
            취소
          </Button>
          <Button onClick={handleSessionEditSubmit}>일정 삭제</Button>
        </Modal>
      )}
    </Modal>
  );
};

export default EditBootcampModal;
