import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Input from "./Input";

const meta = {
  title: "Shared/UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    errorMessage: { control: "text" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "이메일",
    placeholder: "이메일을 입력하세요",
  },
};

export const WithError: Story = {
  args: {
    label: "비밀번호",
    placeholder: "비밀번호를 입력하세요",
    errorMessage: "비밀번호가 너무 짧습니다.",
  },
};

export const Disabled: Story = {
  args: {
    label: "이름",
    placeholder: "입력 불가",
    disabled: true,
  },
};

export const OnlyInput: Story = {
  args: {
    placeholder: "라벨 없이 사용",
  },
};
