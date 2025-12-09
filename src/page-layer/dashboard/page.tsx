import { DoughnutChartCard } from "@/widgets/ui/DoughnutChartCard";

const data = [
  { label: "총 출석", value: 12, color: "var(--foreground-success)" },
  { label: "총 결석", value: 19, color: "var(--foreground-error)" },
  { label: "미출결", value: 3, color: "var(--foreground-disable)" },
];

const Dashboard = () => {
  return <DoughnutChartCard title="출석률" data={data} />;
};

export default Dashboard;
