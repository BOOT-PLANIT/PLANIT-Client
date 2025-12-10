import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Calendar from "./Calendar";
import type { DateData } from "./Calendar";

const meta: Meta<typeof Calendar> = {
  title: "shared/ui/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    dates: {
      control: "object",
      description: "날짜 데이터 배열 (상태 및 현재 단위 기간 정보 포함)",
    },
    onDateSelect: {
      action: "dateSelected",
      description: "날짜 선택 시 호출되는 콜백 함수",
    },
    onEdit: {
      action: "editClicked",
      description: "편집 버튼 클릭 시 호출되는 콜백 함수",
    },
    onMonthChange: {
      action: "monthChanged",
      description: "월 변경 시 호출되는 콜백 함수",
    },
    initialMonth: {
      control: "date",
      description: "초기 표시할 월",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

// 2025년 10월 샘플 데이터 생성
const generateMockData = (): DateData[] => {
  const dates: DateData[] = [];

  // Present (출근) - 여러 날짜
  [1, 2, 7, 9, 10, 14, 15, 16, 17, 21, 22, 23, 24, 28].forEach((day) => {
    dates.push({
      date: new Date(2025, 9, day),
      status: "present",
    });
  });

  // Late (지각)
  [3, 11].forEach((day) => {
    dates.push({
      date: new Date(2025, 9, day),
      status: "late",
    });
  });

  // Left Early (조기 퇴근)
  dates.push({
    date: new Date(2025, 9, 8),
    status: "leftEarly",
  });

  // Leave (휴가)
  [4, 25].forEach((day) => {
    dates.push({
      date: new Date(2025, 9, day),
      status: "leave",
    });
  });

  // Annual (월차)
  dates.push({
    date: new Date(2025, 9, 18),
    status: "annual",
  });

  return dates;
};

export const Default: Story = {
  args: {
    dates: [],
    initialMonth: new Date(2025, 9, 1), // October 2025
  },
};

export const WithData: Story = {
  args: {
    dates: generateMockData(),
    initialMonth: new Date(2025, 9, 1), // October 2025
  },
};

export const CurrentMonth: Story = {
  args: {
    dates: generateMockData(),
    initialMonth: new Date(), // 현재 월
  },
};

export const WithSelection: Story = {
  args: {
    dates: generateMockData(),
    initialMonth: new Date(2025, 9, 1),
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 20 }}>
        <Story />
      </div>
    ),
  ],
};

export const AllStatusTypes: Story = {
  render: () => {
    const allStatusDates: DateData[] = [
      { date: new Date(2025, 9, 1), status: "present" },
      { date: new Date(2025, 9, 2), status: "late" },
      { date: new Date(2025, 9, 3), status: "leftEarly" },
      { date: new Date(2025, 9, 4), status: "leave" },
      { date: new Date(2025, 9, 5), status: "annual" },
      { date: new Date(2025, 9, 6), status: "absent" },
    ];

    return (
      <div style={{ padding: 20 }}>
        <Calendar dates={allStatusDates} initialMonth={new Date(2025, 9, 1)} />
      </div>
    );
  },
};

export const WithCurrentUnit: Story = {
  render: () => {
    const currentUnitDates: DateData[] = [
      { date: new Date(2025, 9, 14), status: "present", isCurrentUnit: true },
      { date: new Date(2025, 9, 15), status: "present", isCurrentUnit: true },
      { date: new Date(2025, 9, 16), status: "present", isCurrentUnit: true },
      { date: new Date(2025, 9, 17), status: "present", isCurrentUnit: true },
      { date: new Date(2025, 9, 22), status: "present", isCurrentUnit: true },
      { date: new Date(2025, 9, 23), status: "present", isCurrentUnit: true },
      { date: new Date(2025, 9, 24), status: "present", isCurrentUnit: true },
    ];

    return (
      <div style={{ padding: 20 }}>
        <Calendar
          dates={currentUnitDates}
          initialMonth={new Date(2025, 9, 1)}
        />
      </div>
    );
  },
};

export const DifferentMonths: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 40,
        padding: 20,
      }}
    >
      <div>
        <h3 style={{ marginBottom: 16 }}>September 2025</h3>
        <Calendar dates={[]} initialMonth={new Date(2025, 8, 1)} />
      </div>
      <div>
        <h3 style={{ marginBottom: 16 }}>October 2025</h3>
        <Calendar
          dates={generateMockData()}
          initialMonth={new Date(2025, 9, 1)}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: 16 }}>November 2025</h3>
        <Calendar dates={[]} initialMonth={new Date(2025, 10, 1)} />
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    dates: generateMockData(),
    initialMonth: new Date(2025, 9, 1),
    onDateSelect: (dates) => {
      console.log("Selected dates:", dates);
    },
    onEdit: (dates) => {
      console.log("Edit dates:", dates);
      alert(
        `편집할 날짜: ${dates.map((d) => d.toLocaleDateString()).join(", ")}`,
      );
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 20 }}>
        <Story />
      </div>
    ),
  ],
};

export const EmptyState: Story = {
  args: {
    dates: [],
    initialMonth: new Date(2025, 9, 1),
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 20 }}>
        <Story />
      </div>
    ),
  ],
};

export const WithMonthChange: Story = {
  args: {
    dates: generateMockData(),
    initialMonth: new Date(2025, 9, 1),
    onMonthChange: (month) => {
      console.log("월이 변경되었습니다:", month);
      alert(
        `월이 변경되었습니다: ${month.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
        })}`,
      );
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 20 }}>
        <Story />
      </div>
    ),
  ],
};
