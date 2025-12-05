import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Button from "./Button";

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <circle
      cx="6"
      cy="6"
      r="4"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path d="M10 10l4 4" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const meta: Meta<typeof Button> = {
  title: "shared/ui/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "danger", "outline"],
      description: "버튼 스타일 변형",
    },
    width: {
      control: "text",
      description: "버튼 너비",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
    children: {
      control: "text",
      description: "버튼 텍스트",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
    width: "200px",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Danger Button",
    width: "200px",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
    width: "200px",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    children: "Disabled Button",
    disabled: true,
    width: "200px",
  },
};

export const WithIcon: Story = {
  args: {
    variant: "primary",
    children: "Add Item",
    icon: <PlusIcon />,
    width: "200px",
  },
};

export const FullWidth: Story = {
  args: {
    variant: "primary",
    children: "Full Width Button",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 16, width: 300 }}
    >
      <Button variant="primary">Primary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="primary" disabled>
        Disabled
      </Button>
    </div>
  ),
};

export const AllWithIcons: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 16, width: 300 }}
    >
      <Button icon={<PlusIcon />}>Add Item</Button>
      <Button icon={<SearchIcon />} variant="danger">
        Delete
      </Button>
      <Button icon={<SearchIcon />} variant="outline">
        Search
      </Button>
    </div>
  ),
};
