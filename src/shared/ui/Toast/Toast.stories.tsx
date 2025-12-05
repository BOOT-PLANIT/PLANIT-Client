"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Provider } from "react-redux";

import { makeStore } from "@/shared/store";
import { showToast } from "@/shared/store/toastSlice";

import Toast from "./Toast";

const store = makeStore();

const meta: Meta<typeof Toast> = {
  title: "shared/ui/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Toast>;

const WithProvider = (StoryComponent: React.ComponentType) => (
  <Provider store={store}>
    <StoryComponent />
  </Provider>
);

export const Success: Story = {
  render: () => {
    store.dispatch(
      showToast({
        type: "success",
        message: "성공적으로 처리되었습니다!",
      }),
    );

    return WithProvider(() => <Toast />);
  },
};

export const Error: Story = {
  render: () => {
    store.dispatch(
      showToast({
        type: "error",
        message: "에러가 발생했습니다!",
      }),
    );

    return WithProvider(() => <Toast />);
  },
};

export const Info: Story = {
  render: () => {
    store.dispatch(
      showToast({
        type: "info",
        message: "정보 메시지입니다.",
      }),
    );

    return WithProvider(() => <Toast />);
  },
};

export const Interactive: Story = {
  render: () =>
    WithProvider(() => {
      const handleToast = (type: "success" | "error" | "info") => {
        store.dispatch(
          showToast({
            type,
            message: `${type} 토스트 테스트`,
          }),
        );
      };

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <button onClick={() => handleToast("success")}>Success Toast</button>
          <button onClick={() => handleToast("error")}>Error Toast</button>
          <button onClick={() => handleToast("info")}>Info Toast</button>

          <Toast />
        </div>
      );
    }),
};
