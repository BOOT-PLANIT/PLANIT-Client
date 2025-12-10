import { BarChartCard } from "@/widgets/ui/BarChartCard";
import { DoughnutChartCard } from "@/widgets/ui/DoughnutChartCard";

const doughnutData = [
  { label: "총 출석", value: 12, color: "var(--foreground-success)" },
  { label: "총 결석", value: 19, color: "var(--foreground-error)" },
  { label: "미출결", value: 3, color: "var(--foreground-disable)" },
];

const barChartItem = {
  label: "출석일",
  value: 42,
  color: "var(--foreground-success)",
  total: 135,
};

const Dashboard = () => {
  return (
    <>
      <DoughnutChartCard title="출석률" data={doughnutData} />
      <BarChartCard title="부트캠프 진행률" data={barChartItem} />
    </>
  );
};

export default Dashboard;
