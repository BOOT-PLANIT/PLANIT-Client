import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./store";

export interface ToastPayload {
  message?: string;
  type: "success" | "error" | "info";
}

interface ToastState extends ToastPayload {
  visible: boolean;
}

const initialState: ToastState = {
  visible: false,
  message: undefined,
  type: "info",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<ToastPayload>) => {
      const { message, type } = action.payload;

      state.message = message;
      state.type = type;
      state.visible = true;
    },

    hideToast: (state) => {
      state.visible = false;
    },
  },
});

export const toastSelector = (state: RootState) => state.toast;
export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
