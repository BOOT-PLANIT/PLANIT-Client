"use client";

import { useMemo, useState } from "react";

import { AttendanceSummaryCard } from "@/entities/attendance/ui/AttendanceSummaryCard";
import { BootcampInfo } from "@/entities/bootcamp/ui/BootcampInfo";
import { useBootcamp } from "@/feature/bootcamp";
import { useMe } from "@/feature/user/api/hooks";
import { parseDateString } from "@/shared/utils";
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
export interface MeResponse {
  id: number;
  uid: string;
  email: string;
  displayName: string;
  photoUrl: string;
  userLevel: "USER" | "ADMIN";
  provider: string;
  emailVerified: boolean;
  createdAt: string;
  lastLoginAt: string;
  recentBootcampId: number | null;
}
const Dashboard = () => {
  const [selectedBootcampIndex, setSelectedBootcampIndex] = useState(0);

  const { data: meRes } = useMe();
  const recentBootcampId = meRes?.data?.recentBootcampId ?? null;

  const { data: bootcampRes } = useBootcamp(recentBootcampId ?? 0);
  const bootcamp = bootcampRes?.data;

  const bootcampOptions = useMemo(() => {
    if (!bootcamp || recentBootcampId == null) return [];
    return [{ value: String(recentBootcampId), label: bootcamp.name }];
  }, [bootcamp, recentBootcampId]);

  const comboboxIndex = bootcampOptions.length > 0 ? selectedBootcampIndex : -1;

  const dateRange = useMemo(() => {
    if (!bootcamp) return null;
    if (!bootcamp.startedAt || !bootcamp.endedAt) return null;

    const startDate = parseDateString(bootcamp.startedAt);
    const endDate = parseDateString(bootcamp.endedAt);
    const sessionCount =
      Array.isArray(bootcamp.classDates) && bootcamp.classDates.length > 0
        ? bootcamp.classDates.length
        : undefined;

    return { startDate, endDate, sessionCount };
  }, [bootcamp]);

  const progressChartItem = useMemo(() => {
    const label = "진행일";
    const color = "var(--foreground-success)";

    if (!bootcamp) {
      return { label, value: 0, total: 0, color };
    }

    const today = new Date();
    const todayMidnight = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    // 진행일 계산
    if (Array.isArray(bootcamp.classDates) && bootcamp.classDates.length > 0) {
      const total = bootcamp.classDates.length;
      const value = bootcamp.classDates.filter(
        (d) => parseDateString(d).getTime() <= todayMidnight.getTime(),
      ).length;

      return {
        label,
        value: Math.min(Math.max(value, 0), total),
        total,
        color,
      };
    }

    if (bootcamp.startedAt && bootcamp.endedAt) {
      const start = parseDateString(bootcamp.startedAt);
      const end = parseDateString(bootcamp.endedAt);

      const msPerDay = 24 * 60 * 60 * 1000;
      const total = Math.max(
        0,
        Math.floor((end.getTime() - start.getTime()) / msPerDay) + 1,
      );

      const effectiveEnd =
        todayMidnight.getTime() > end.getTime() ? end : todayMidnight;
      const value = Math.max(
        0,
        Math.floor((effectiveEnd.getTime() - start.getTime()) / msPerDay) + 1,
      );

      return { label, value: Math.min(value, total), total, color };
    }

    return { label, value: 0, total: 0, color };
  }, [bootcamp]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.cardContainer}>
        <BootcampInfo
          options={bootcampOptions}
          selectedIndex={comboboxIndex}
          onIndexChange={setSelectedBootcampIndex}
          dateRange={dateRange}
        />
        <TodaysAttendanceCard />
        <div className={styles.gridContainer}>
          <DoughnutChartCard title="출석률" data={doughnutData} />
          <RemainingBalanceCard values={balanceData} />
          <TotalAllowanceCard value={totalAllowance} />
        </div>
        <AttendanceSummaryCard title="출결 정보" values={attendanceSummary} />
        <BarChartCard title="부트캠프 진행률" data={progressChartItem} />
      </div>
    </div>
  );
};

export default Dashboard;
