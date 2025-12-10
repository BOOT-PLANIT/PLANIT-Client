"use client";

import { useState } from "react";

import {
  AbsentIcon,
  AnnualIcon,
  LateIcon,
  LeftEarlyIcon,
  LeaveIcon,
  PresentIcon,
} from "@/shared/assets/icons";
import { Button, Modal } from "@/shared/ui";
import type { AttendanceStatus } from "@/shared/ui/Calendar";

import styles from "./EditAttendanceModal.module.scss";

interface EditAttendanceModalProps {
  selectedDates: Date[];
  onClose: () => void;
  onSave: (dates: Date[], status: AttendanceStatus | undefined) => void;
}

const attendanceOptions: {
  value: AttendanceStatus;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "present",
    label: "출석",
    icon: <PresentIcon width={20} height={20} />,
  },
  {
    value: "late",
    label: "지각",
    icon: <LateIcon width={20} height={20} />,
  },
  {
    value: "leftEarly",
    label: "조퇴",
    icon: <LeftEarlyIcon width={20} height={20} />,
  },
  {
    value: "leave",
    label: "공가",
    icon: <LeaveIcon width={20} height={20} />,
  },
  {
    value: "annual",
    label: "월차",
    icon: <AnnualIcon width={20} height={20} />,
  },
  {
    value: "absent",
    label: "결석",
    icon: <AbsentIcon width={20} height={20} />,
  },
];

const EditAttendanceModal = ({
  selectedDates,
  onClose,
  onSave,
}: EditAttendanceModalProps) => {
  const [selectedStatus, setSelectedStatus] = useState<
    AttendanceStatus | "clear"
  >("present");

  const handleSave = () => {
    onSave(
      selectedDates,
      selectedStatus === "clear" ? undefined : selectedStatus,
    );
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.content}>
        <h2 className={styles.title}>출결 수정</h2>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            {selectedDates.length}개의 날짜 선택됨
          </h3>
          <div className={styles.options}>
            {attendanceOptions.map((option) => (
              <label
                key={option.value}
                className={`${styles.option} ${
                  selectedStatus === option.value ? styles.selected : ""
                }`}
              >
                <input
                  type="radio"
                  name="attendanceStatus"
                  value={option.value}
                  checked={selectedStatus === option.value}
                  onChange={() => setSelectedStatus(option.value)}
                  className={styles.radio}
                />
                <div className={styles.icon}>{option.icon}</div>
                <span className={styles.label}>{option.label}</span>
              </label>
            ))}
            <label
              className={`${styles.option} ${
                selectedStatus === "clear" ? styles.selected : ""
              }`}
            >
              <input
                type="radio"
                name="attendanceStatus"
                value="clear"
                checked={selectedStatus === "clear"}
                onChange={() => setSelectedStatus("clear")}
                className={styles.radio}
              />
              <div className={styles.icon}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 5L5 15M5 5L15 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className={styles.label}>초기화</span>
            </label>
          </div>
        </div>

        <div className={styles.actions}>
          <Button variant="outline" onClick={onClose} width="auto">
            취소
          </Button>
          <Button variant="primary" onClick={handleSave} width="auto">
            저장
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditAttendanceModal;
