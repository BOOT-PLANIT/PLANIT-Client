"use client";

import { LeaveIcon } from "@/shared/assets";
import { Card, OptionButton } from "@/shared/ui";

import styles from "./TodaysAttendanceCard.module.scss";

const handleClick = () => {
  console.log("click");
};

const TodaysAttendanceCard = () => {
  return (
    <Card title="오늘의 출석">
      <span className={styles.guide}>오늘의 출결을 선택해주세요</span>
      <div className={styles.container}>
        <OptionButton
          value="안녕"
          label="안녕"
          onChange={handleClick}
          icon={<LeaveIcon />}
          checked={true}
        />
      </div>
    </Card>
  );
};

export default TodaysAttendanceCard;
