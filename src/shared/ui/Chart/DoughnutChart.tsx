"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export interface DoughnutChartItem {
  label: string;
  value: number;
  color: string;
}

function convertToPieData(items: DoughnutChartItem[]) {
  return items.map((item) => ({
    name: item.label,
    value: item.value,
    fill: item.color,
  }));
}

interface DoughnutChartProps {
  data: DoughnutChartItem[];
  width?: string | number;
}

const DoughnutChartBase = ({ data, width = "100%" }: DoughnutChartProps) => {
  const pieData = convertToPieData(data);

  return (
    <div
      style={{
        width,
        pointerEvents: "none",
      }}
    >
      <ResponsiveContainer width="100%" aspect={1}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="100%"
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const DoughnutChart = React.memo(DoughnutChartBase);
DoughnutChart.displayName = "DoughnutChart";

export default DoughnutChart;
