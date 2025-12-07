import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Radio from "./Radio";

const meta: Meta<typeof Radio> = {
  title: "Shared/ui/Radio",
  component: Radio,
  tags: ["autodocs"],
  argTypes: {
    selected: {
      control: "boolean",
      description: "라디오 선택 여부",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    selected: true,
  },
};
