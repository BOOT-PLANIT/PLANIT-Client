import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Avatar from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "shared/ui/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    userName: {
      control: "text",
      description: "사용자 이름 (첫 글자가 표시됨)",
    },
    size: {
      control: "select",
      options: ["md", "lg"],
      description: "아바타 크기",
    },
    onClick: {
      action: "clicked",
      description: "클릭 이벤트 핸들러",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Medium: Story = {
  args: {
    userName: "John",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    userName: "John",
    size: "lg",
  },
};

export const Korean: Story = {
  args: {
    userName: "홍길동",
    size: "md",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Avatar userName="John" size="md" />
      <Avatar userName="John" size="lg" />
    </div>
  ),
};

export const DifferentNames: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Avatar userName="Alice" />
      <Avatar userName="Bob" />
      <Avatar userName="Charlie" />
      <Avatar userName="홍길동" />
      <Avatar userName="planit" />
    </div>
  ),
};
