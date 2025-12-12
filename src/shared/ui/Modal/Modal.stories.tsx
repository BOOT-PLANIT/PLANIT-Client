import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";

import Modal from "./Modal";

const modalMeta: Meta<typeof Modal> = {
  title: "Shared/UI/Modal",
  component: Modal,
  tags: ["autodocs"],
};

export default modalMeta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const Example = () => {
      const [open, setOpen] = React.useState(true);

      return (
        <>
          <button onClick={() => setOpen(true)}>Open Modal</button>

          {open && (
            <Modal onClose={() => setOpen(false)} title="타이틀입니다">
              <div>
                <h2>모달 내용</h2>
                <p>Storybook에서도 정상적으로 동작합니다.</p>
              </div>
            </Modal>
          )}
        </>
      );
    };

    return <Example />;
  },
};
