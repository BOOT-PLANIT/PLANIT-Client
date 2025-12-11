"use client";

import React, { useMemo } from "react";

import { Card, HorizontalPercentageBarChart } from "@/shared/ui";
import type { BarChartItem } from "@/shared/ui/Chart";

import styles from "./BarChartCard.module.scss";

interface BarChartCardProps {
  title: string;
  data: BarChartItem;
}

const BarChartCardBase = ({ title, data }: BarChartCardProps) => {
  const { total, value, label } = data;

  const showChart = total !== 0;

  const remaining = total - value;

  const calculatedPercent = useMemo(() => {
    if (total === 0) {
      return "0.0";
    }
    return ((value / total) * 100).toFixed(1);
  }, [total, value]);

  return (
    <Card title={title}>
      <div className={styles.cardContainer}>
        {!showChart ? (
          <div className={styles.noDataBox}>
            <span>데이터가 없습니다</span>
          </div>
        ) : (
          <>
            <span className={styles.percent}>{calculatedPercent}%</span>
            <HorizontalPercentageBarChart data={data} />
            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <span className={styles.label}>{label}</span>
                <span className={styles.value}>{value}</span>
              </div>

              <div className={styles.legendItem}>
                <span className={styles.label}>남은 일자</span>
                <span className={styles.value}>{remaining}</span>
              </div>

              <div className={styles.legendItem}>
                <span className={styles.label}>총 일자</span>
                <span className={styles.value}>{total}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

const BarChartCard = React.memo(BarChartCardBase);
BarChartCard.displayName = "BarChartCard";

export default BarChartCard;
