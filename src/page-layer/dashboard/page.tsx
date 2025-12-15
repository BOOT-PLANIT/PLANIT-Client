"use client";

import { useState } from "react";

import { AttendanceSummaryCard } from "@/entities/attendance/ui/AttendanceSummaryCard";
import { BootcampInfo } from "@/entities/bootcamp/ui/BootcampInfo";
import { BarChartCard } from "@/widgets/ui/BarChartCard";
import { DoughnutChartCard } from "@/widgets/ui/DoughnutChartCard";

import styles from "./DashBoard.module.scss";
import { RemainingBalanceCard } from "./ui/RemainingBalanceCard";
import { TodaysAttendanceCard } from "./ui/TodaysAttendanceCard";
import { TotalAllowanceCard } from "./ui/TotalAllowanceCard";

const doughnutData = [
  { label: "총출석", value: 12, color: "var(--foreground-success)" },
  { label: "총결석", value: 19, color: "var(--foreground-error)" },
  { label: "미출결", value: 3, color: "var(--foreground-disable)" },
];

const barChartItem = {
  label: "진행일",
  value: 42,
  color: "var(--foreground-success)",
  total: 135,
};

const attendanceSummary = {
  present: 42,
  late: 3,
  leftEarly: 0,
  leave: 0,
  annual: 0,
  absent: 12,
};

const totalAllowance = 13000000;

const balanceData = {
  leftBalanceValue: 3,
  totalBalanceValue: 15,
};

const bootcampOption = [
  {
    value: "유플러스",
    label: "유레카",
  },
];

const Dashboard = () => {
  const [selectedBootcampIndex, setSelectedBootcampIndex] = useState(0);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.cardContainer}>
        <BootcampInfo
          options={bootcampOption}
          selectedIndex={selectedBootcampIndex}
          onIndexChange={setSelectedBootcampIndex}
          dateRange={{
            startDate: new Date("2025-04-12"),
            endDate: new Date("2025-09-12"),
            sessionCount: 135,
          }}
        />
        <TodaysAttendanceCard />
        <div className={styles.gridContainer}>
          <DoughnutChartCard title="출석률" data={doughnutData} />
          <RemainingBalanceCard values={balanceData} />
          <TotalAllowanceCard value={totalAllowance} />
        </div>
        <AttendanceSummaryCard title="출결 정보" values={attendanceSummary} />
        <BarChartCard title="부트캠프 진행률" data={barChartItem} />
      </div>
    </div>
  );
};

export default Dashboard;
