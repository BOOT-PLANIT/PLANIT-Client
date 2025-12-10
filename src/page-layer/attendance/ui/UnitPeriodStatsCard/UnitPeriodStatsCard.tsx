"use client";

import { useMemo } from "react";

import { Card } from "@/shared/ui";
import { DoughnutChart } from "@/shared/ui/Chart";
import type { ChartItem } from "@/shared/ui/Chart/DoughnutChart";

import styles from "./UnitPeriodStatsCard.module.scss";

interface UnitPeriodStatsCardProps {
  totalAttendance: number;
  totalAbsent: number;
  totalUnrecorded: number;
  totalDays: number;
}

const UnitPeriodStatsCard = ({
  totalAttendance,
  totalAbsent,
  totalUnrecorded,
  totalDays,
}: UnitPeriodStatsCardProps) => {
  const chartData = useMemo<ChartItem[]>(() => {
    return [
      {
        label: "총출석",
        value: totalAttendance,
        color: "#048724",
      },
      {
        label: "총결석",
        value: totalAbsent,
        color: "#d21c1c",
      },
      {
        label: "미출결",
        value: totalUnrecorded,
        color: "#8d929f",
      },
    ];
  }, [totalAttendance, totalAbsent, totalUnrecorded]);

  const total = totalDays;
  const showChart = total > 0;

  const legendData = useMemo(() => {
    return chartData.map((item) => ({
      ...item,
      percent: total === 0 ? "0.0" : ((item.value / total) * 100).toFixed(1),
    }));
  }, [chartData, total]);

  return (
    <Card variant="solid" title="기간 통계">
      <div className={styles.wrapper}>
        {!showChart ? (
          <div className={styles.noDataBox}>
            <span>데이터가 없습니다</span>
          </div>
        ) : (
          <div className={styles.container}>
            <div className={styles.chart}>
              <DoughnutChart data={chartData} />
            </div>
            <div className={styles.legend}>
              {legendData.map((item) => (
                <div key={item.label} className={styles.legendItem}>
                  <div className={styles.legendText}>
                    <div className={styles.labelRow}>
                      <span
                        className={styles.colorDot}
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.label}</span>
                    </div>
                    <span className={styles.percent}>
                      {item.value} ({item.percent}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default UnitPeriodStatsCard;
