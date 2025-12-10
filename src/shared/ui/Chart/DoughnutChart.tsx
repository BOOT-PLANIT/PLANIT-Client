import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export interface ChartItem {
  label: string;
  value: number;
  color: string;
}

function convertToPieData(items: ChartItem[]) {
  return items.map((item) => ({
    name: item.label,
    value: item.value,
    fill: item.color,
  }));
}

interface DoughnutChartProps {
  data: ChartItem[];
  width?: string | number;
}

const DoughnutChart = ({ data, width = "100%" }: DoughnutChartProps) => {
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

export default DoughnutChart;
