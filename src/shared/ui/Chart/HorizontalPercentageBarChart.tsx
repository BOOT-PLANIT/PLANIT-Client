"use client";

import React from "react";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

export interface BarChartItem {
  label: string;
  value: number;
  color: string;
  total: number;
}

const BACKGROUND_LABEL = "__Background__";
const BACKGROUND_COLOR = "var(--background-tertiary-darker)";

function createSingleBarData(item: BarChartItem) {
  const SINGLE_BAR_KEY = "SingleBar";
  const total = item.total;
  const percentage = total > 0 ? (item.value / total) * 100 : 0;

  return [
    {
      name: SINGLE_BAR_KEY,
      [item.label]: percentage, // 실제 데이터 Bar
      [BACKGROUND_LABEL]: 100, // 배경 Bar
    },
  ];
}

interface BarChartProps {
  data: BarChartItem;
  height?: number;
}

const BarChartBase = ({ data, height = 20 }: BarChartProps) => {
  const stackedData = createSingleBarData(data);

  return (
    <div
      style={{
        width: "100%",
        pointerEvents: "none",
      }}
    >
      <ResponsiveContainer width="100%" height={height}>
        <ReBarChart
          layout="vertical" // x축 방향
          data={stackedData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis type="category" dataKey="name" hide />

          {/* 실제 데이터 Bar */}
          <Bar
            key={data.label}
            dataKey={data.label}
            fill={data.color}
            stackId="a"
          />

          {/* 배경 Bar */}
          <Bar
            key={BACKGROUND_LABEL}
            dataKey={BACKGROUND_LABEL}
            fill={BACKGROUND_COLOR}
            stackId="a"
          />
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
};

const HorizontalPercentageBarChart = React.memo(BarChartBase);
HorizontalPercentageBarChart.displayName = "HorizontalPercentageBarChart";

export default HorizontalPercentageBarChart;
