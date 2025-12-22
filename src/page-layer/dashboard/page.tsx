"use client";

import { useMemo, useState } from "react";

import { AttendanceSummaryCard } from "@/entities/attendance/ui/AttendanceSummaryCard";
import { BootcampInfo } from "@/entities/bootcamp/ui/BootcampInfo";
import { useAttendanceBalance, useTotalAttendance } from "@/feature/attendance";
import { useBootcamp } from "@/feature/bootcamp";
import { useMyBootcamps } from "@/feature/enrollment";
import { useMe } from "@/feature/user";
import { parseDateString } from "@/shared/utils";
import { BarChartCard } from "@/widgets/ui/BarChartCard";
import { DoughnutChartCard } from "@/widgets/ui/DoughnutChartCard";

import styles from "./DashBoard.module.scss";
import { RemainingBalanceCard } from "./ui/RemainingBalanceCard";
import { TodaysAttendanceCard } from "./ui/TodaysAttendanceCard";
import { TotalAllowanceCard } from "./ui/TotalAllowanceCard";

const Dashboard = () => {
  const { data: meRes } = useMe();
  const userId = meRes?.id ?? null;
  const recentBootcampId = meRes?.recentBootcampId ?? null;

  const { data: myBootcampsRes } = useMyBootcamps();
  const myBootcamps = useMemo(
    () => myBootcampsRes?.data ?? [],
    [myBootcampsRes],
  );

  const [selectedBootcampIndex, setSelectedBootcampIndex] = useState<
    number | null
  >(null);

  const bootcampOptions = useMemo(
    () =>
      myBootcamps.map((bootcamp) => ({
        value: String(bootcamp.bootcampId),
        label: bootcamp.name,
      })),
    [myBootcamps],
  );

  const defaultBootcampIndex = useMemo(() => {
    if (myBootcamps.length === 0) return -1;

    if (recentBootcampId != null) {
      const idx = myBootcamps.findIndex(
        (b) => b.bootcampId === recentBootcampId,
      );
      if (idx >= 0) return idx;
    }

    return 0;
  }, [myBootcamps, recentBootcampId]);

  const resolvedBootcampIndex = useMemo(() => {
    const candidate = selectedBootcampIndex ?? defaultBootcampIndex;
    if (candidate < 0) return -1;
    if (candidate < myBootcamps.length) return candidate;
    return myBootcamps.length > 0 ? 0 : -1;
  }, [defaultBootcampIndex, myBootcamps.length, selectedBootcampIndex]);

  const selectedBootcamp =
    resolvedBootcampIndex >= 0 ? myBootcamps[resolvedBootcampIndex] : undefined;

  const bootcampId = selectedBootcamp?.bootcampId ?? null;

  const { data: balanceRes } = useAttendanceBalance(userId, bootcampId);

  const balanceData = useMemo(() => {
    if (!balanceRes?.data) {
      return { leftBalanceValue: 0, totalBalanceValue: 0 };
    }

    return {
      leftBalanceValue: balanceRes.data.remainingAnnual,
      totalBalanceValue: balanceRes.data.totalAnnual,
    };
  }, [balanceRes]);

  const { data: totalAttendanceRes } = useTotalAttendance(userId, bootcampId);
  const totalAttendance = totalAttendanceRes?.data;

  const doughnutData = useMemo(() => {
    if (!totalAttendance) return [];

    const present = totalAttendance.totalPresentCount ?? 0;
    const absent = totalAttendance.totalAbsentCount ?? 0;
    const total = totalAttendance.totalSessions ?? 0;
    const none = Math.max(total - present - absent, 0);

    return [
      { label: "총출석", value: present, color: "var(--foreground-success)" },
      { label: "총결석", value: absent, color: "var(--foreground-error)" },
      { label: "미출결", value: none, color: "var(--foreground-disable)" },
    ];
  }, [totalAttendance]);

  const attendanceSummary = useMemo(() => {
    if (!totalAttendance) {
      return {
        present: 0,
        late: 0,
        leftEarly: 0,
        leave: 0,
        annual: 0,
        absent: 0,
      };
    }

    return {
      present: totalAttendance.presentCount,
      late: totalAttendance.lateCount,
      leftEarly: totalAttendance.leftEarlyCount,
      leave: totalAttendance.leaveCount,
      annual: totalAttendance.annualCount,
      absent: totalAttendance.absentCount,
    };
  }, [totalAttendance]);

  const totalAllowance = totalAttendance?.totalSubsidy ?? 0;

  const { data: bootcampRes } = useBootcamp(bootcampId ?? 0);
  const bootcamp = bootcampRes?.data;

  const dateRange = useMemo(() => {
    if (!bootcamp?.startedAt || !bootcamp?.endedAt) return null;

    return {
      startDate: parseDateString(bootcamp.startedAt),
      endDate: parseDateString(bootcamp.endedAt),
      sessionCount: Array.isArray(bootcamp.classDates)
        ? bootcamp.classDates.length
        : undefined,
    };
  }, [bootcamp]);

  const progressChartItem = useMemo(() => {
    const label = "진행일";
    const color = "var(--foreground-success)";

    if (!bootcamp) return { label, value: 0, total: 0, color };

    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);

    const total = bootcamp.classDates.length;
    const value = bootcamp.classDates.filter(
      (d) => parseDateString(d).getTime() <= todayMidnight.getTime(),
    ).length;

    return { label, value: Math.min(value, total), total, color };
  }, [bootcamp]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.cardContainer}>
        <BootcampInfo
          options={bootcampOptions}
          selectedIndex={
            bootcampOptions.length > 0 ? resolvedBootcampIndex : -1
          }
          onIndexChange={setSelectedBootcampIndex}
          dateRange={dateRange}
        />

        <TodaysAttendanceCard bootcampId={bootcampId ?? undefined} />

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
