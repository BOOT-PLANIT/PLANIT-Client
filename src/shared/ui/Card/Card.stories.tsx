import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Card from "./Card";

const DollarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path
      d="M10 2v16M6 6h6a2 2 0 012 2v0a2 2 0 01-2 2H6M6 10h6a2 2 0 012 2v0a2 2 0 01-2 2H6"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

const meta: Meta<typeof Card> = {
  title: "shared/ui/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "gradient"],
      description: "카드 배경 스타일",
    },
    title: {
      control: "text",
      description: "카드 제목",
    },
    width: {
      control: "text",
      description: "카드 너비",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Solid: Story = {
  args: {
    variant: "solid",
    title: "Solid Card",
    children: <div>흰색 단색 배경</div>,
    width: "300px",
  },
};

export const Gradient: Story = {
  args: {
    variant: "gradient",
    title: "Gradient Card",
    children: <div>블루 5% 그라데이션 (좌상단 → 우하단)</div>,
    width: "300px",
  },
};

export const WithIcon: Story = {
  args: {
    variant: "solid",
    title: "Period Allowance",
    titleIcon: <DollarIcon />,
    children: (
      <div>
        <p style={{ fontSize: 24, fontWeight: 600, color: "#048724" }}>
          ₩500,000
        </p>
        <p style={{ fontSize: 14, color: "#8d929f", marginTop: 8 }}>
          ↝ Oct 14-25
        </p>
      </div>
    ),
    width: "300px",
  },
};

export const NoTitle: Story = {
  args: {
    variant: "solid",
    children: <div style={{ padding: 20 }}>Card without title</div>,
    width: "300px",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 20 }}>
      <Card title="Solid" width="200px">
        <div>흰색 단색</div>
      </Card>
      <Card variant="gradient" title="Gradient" width="200px">
        <div>블루 5%</div>
      </Card>
    </div>
  ),
};

export const AttendanceSummary: Story = {
  render: () => (
    <Card title="Attendance Summary" width="500px">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}
      >
        <StatItem icon="✓" label="Present" value={13} color="#048724" />
        <StatItem icon="⏰" label="Late" value={2} color="#f59e0b" />
        <StatItem icon="→" label="Left Early" value={2} color="#3ecf8e" />
        <StatItem icon="📅" label="Leave" value={2} color="#8b5cf6" />
        <StatItem icon="✈" label="Annual" value={1} color="#00aff0" />
        <StatItem icon="✕" label="Absent" value={0} color="#d21c1c" />
      </div>
    </Card>
  ),
};

export const UnitPeriodStats: Story = {
  render: () => (
    <Card variant="gradient" title="Unit Period Stats" width="350px">
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            border: "12px solid #048724",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <LegendItem color="#048724" label="총출석" value="9 (100%)" />
          <LegendItem color="#D21C1C" label="총결석" value="0 (0%)" />
          <LegendItem color="#8D929F" label="미출결" value="0 (0%)" />
        </div>
      </div>
    </Card>
  ),
};

export const PeriodAllowance: Story = {
  render: () => (
    <Card title="Period Allowance" titleIcon={<DollarIcon />} width="250px">
      <div>
        <p style={{ fontSize: 24, fontWeight: 600, color: "#048724" }}>
          ₩500,000
        </p>
        <p style={{ fontSize: 14, color: "#8d929f", marginTop: 8 }}>
          ↝ Oct 14-25
        </p>
      </div>
    </Card>
  ),
};

const StatItem = ({
  icon,
  label,
  value,
  color,
}: {
  icon: string;
  label: string;
  value: number;
  color: string;
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: `${color}15`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color,
        fontSize: 16,
      }}
    >
      {icon}
    </div>
    <div>
      <div style={{ fontSize: 12, color: "#8d929f" }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 600, color: "#141517" }}>
        {value}
      </div>
    </div>
  </div>
);

const LegendItem = ({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: string;
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <div
      style={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        backgroundColor: color,
      }}
    />
    <span style={{ fontSize: 14, color: "#8d929f" }}>{label}</span>
    <span style={{ fontSize: 14, fontWeight: 600, color: "#141517" }}>
      {value}
    </span>
  </div>
);
