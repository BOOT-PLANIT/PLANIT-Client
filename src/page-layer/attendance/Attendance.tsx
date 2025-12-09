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
import { Calendar, Card, Combobox } from "@/shared/ui";

import styles from "./Attendance.module.scss";
import AttendanceSummaryCard from "./AttendanceSummaryCard";
import IconGuide from "./IconGuide";
import {
  generateAttendanceSummary,
  generateBootcampOptions,
  generateCalendarDates,
  generatePeriodAllowance,
  generateUnitStats,
  getCurrentUnit,
} from "./mockData";
import PeriodAllowanceCard from "./PeriodAllowanceCard";
import UnitPeriodStatsCard from "./UnitPeriodStatsCard";

const WeekendIcon = () => (
  <div
    style={{
      width: "16px",
      height: "16px",
      backgroundColor: "var(--background-tertiary-darker)",
      borderRadius: "4px",
    }}
  />
);

const HasSessionIcon = () => (
  <div
    style={{
      width: "16px",
      height: "16px",
      backgroundColor: "var(--color-purple-lightest)",
      borderRadius: "4px",
    }}
  />
);

const Attendance = () => {
  const [selectedBootcampIndex, setSelectedBootcampIndex] = useState(0);

  const bootcampOptions = generateBootcampOptions();
  const currentUnit = getCurrentUnit();
  const attendanceSummaryData = generateAttendanceSummary();
  const unitStats = generateUnitStats();
  const periodAllowance = generatePeriodAllowance();
  const calendarDates = generateCalendarDates();
  const initialMonth = new Date();

  const iconMap = {
    present: <PresentIcon width={20} height={20} />,
    late: <LateIcon width={20} height={20} />,
    leftEarly: <LeftEarlyIcon width={20} height={20} />,
    leave: <LeaveIcon width={20} height={20} />,
    annual: <AnnualIcon width={20} height={20} />,
    absent: <AbsentIcon width={20} height={20} />,
  };

  const attendanceSummary = attendanceSummaryData.map((item) => ({
    ...item,
    icon: iconMap[item.status],
  }));

  const iconGuideItems = [
    { icon: <PresentIcon width={20} height={20} />, label: "출석" },
    { icon: <LateIcon width={20} height={20} />, label: "지각" },
    { icon: <LeftEarlyIcon width={20} height={20} />, label: "조퇴" },
    { icon: <LeaveIcon width={20} height={20} />, label: "휴가" },
    { icon: <AnnualIcon width={20} height={20} />, label: "연차" },
    { icon: <AbsentIcon width={20} height={20} />, label: "결석" },
    { icon: <WeekendIcon />, label: "주말" },
    { icon: <HasSessionIcon />, label: "교육일" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.headerSection}>
          <div className={styles.bootcampInfo}>
            <Combobox
              options={bootcampOptions}
              value={selectedBootcampIndex}
              onChange={setSelectedBootcampIndex}
              width="400px"
            />
            <div className={styles.currentUnit}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={{ marginRight: "8px" }}
              >
                <rect
                  x="3"
                  y="4"
                  width="10"
                  height="9"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M3 6H13" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M6 2V4M10 2V4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span>{currentUnit}</span>
            </div>
          </div>
        </div>

        <div className={styles.summaryCards}>
          <AttendanceSummaryCard items={attendanceSummary} />
          <UnitPeriodStatsCard {...unitStats} />
          <PeriodAllowanceCard {...periodAllowance} />
        </div>

        <Card variant="solid" width="100%">
          <Calendar dates={calendarDates} initialMonth={initialMonth} />
          <IconGuide items={iconGuideItems} />
        </Card>
      </div>
    </div>
  );
};

export default Attendance;
