"use client";
import { useState } from "react";

import { BellIcon } from "@/shared/assets";
import { Card } from "@/shared/ui";
import { ToggleSwitch } from "@/shared/ui";

import styles from "./AlarmSettingCard.module.scss";

interface AlarmSettingCardProps {
  alarmDefaultIs?: boolean;
}

const AlarmSettingCard = ({
  alarmDefaultIs = false,
}: AlarmSettingCardProps) => {
  const [enabled, setEnabled] = useState(alarmDefaultIs);

  const handleToggle = () => {
    setEnabled((prev) => !prev);
  };

  return (
    <Card
      titleIcon={<BellIcon size={20} className={styles.titleIcon} />}
      title="알림 설정"
    >
      <div className={styles.container}>
        <div className={styles.textLayout}>
          <span className={styles.title}>출석 알림</span>
          <span className={styles.description}>
            체크인/체크아웃 시간에 대한 알림을 받으세요
          </span>
        </div>
        <div className={styles.toggleButton}>
          <ToggleSwitch checked={enabled} onToggle={handleToggle} />
        </div>
      </div>
    </Card>
  );
};

export default AlarmSettingCard;
