"use client";

import { useState } from "react";

import { ATTENDANCE_ICON_MAP } from "@/entities/attendance/model";
import { Button, Modal, OptionButton } from "@/shared/ui";
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
    icon: ATTENDANCE_ICON_MAP.present,
  },
  {
    value: "late",
    label: "지각",
    icon: ATTENDANCE_ICON_MAP.late,
  },
  {
    value: "leftEarly",
    label: "조퇴",
    icon: ATTENDANCE_ICON_MAP.leftEarly,
  },
  {
    value: "leave",
    label: "공가",
    icon: ATTENDANCE_ICON_MAP.leave,
  },
  {
    value: "annual",
    label: "월차",
    icon: ATTENDANCE_ICON_MAP.annual,
  },
  {
    value: "absent",
    label: "결석",
    icon: ATTENDANCE_ICON_MAP.absent,
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
    <Modal onClose={onClose} title="출결 수정">
      <div className={styles.content}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            {selectedDates.length}개의 날짜 선택됨
          </h3>
          <div className={styles.options}>
            {attendanceOptions.map((option) => (
              <OptionButton
                key={option.value}
                value={option.value}
                label={option.label}
                icon={option.icon}
                checked={selectedStatus === option.value}
                onChange={(value) =>
                  setSelectedStatus(value as AttendanceStatus | "clear")
                }
                name="attendanceStatus"
              />
            ))}
            <OptionButton
              value="clear"
              label="초기화"
              icon={
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
              }
              checked={selectedStatus === "clear"}
              onChange={(value) =>
                setSelectedStatus(value as AttendanceStatus | "clear")
              }
              name="attendanceStatus"
            />
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
