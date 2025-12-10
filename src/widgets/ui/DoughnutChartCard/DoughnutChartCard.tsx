"use client";

import { useMemo } from "react";

import { Card } from "@/shared/ui/Card";
import { DoughnutChart } from "@/shared/ui/Chart";
import type { ChartItem } from "@/shared/ui/Chart/DoughnutChart";

import styles from "./DoughnutChartCard.module.scss";

interface DoughnutChartCardProps {
  title: string;
  data: ChartItem[];
}

const DoughnutChartCard = ({ title, data }: DoughnutChartCardProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const showChart = data.length > 0 && total !== 0;

  const legendData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      percent: total === 0 ? "0.0" : ((item.value / total) * 100).toFixed(1),
    }));
  }, [data, total]);

  return (
    <Card title={title}>
      <div className={styles.cardContainer}>
        {!showChart ? (
          <div className={styles.noDataBox}>
            <span>데이터가 없습니다</span>
          </div>
        ) : (
          <>
            <div className={styles.chartBox}>
              <DoughnutChart data={data} />
            </div>
            <div className={styles.legend}>
              {legendData.map((item) => (
                <div key={item.label} className={styles.legendItem}>
                  <span
                    className={styles.colorDot}
                    style={{ backgroundColor: item.color }}
                  />
                  <span className={styles.label}>{item.label}</span>
                  <span className={styles.value}>{item.value}</span>
                  <span className={styles.percent}>({item.percent}%)</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default DoughnutChartCard;
