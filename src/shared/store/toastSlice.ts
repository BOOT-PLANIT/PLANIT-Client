import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ToastPayolad {
  title?: string;
  message?: string;
  type: "success" | "error" | "info";
}

interface ToastState extends ToastPayolad {
  visible: boolean;
}

const initialState: ToastState = {
  visible: false,
  title: undefined,
  message: undefined,
  type: "info",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<ToastPayolad>) => {
      const { title, message, type } = action.payload;

      state.title = title;
      state.message = message;
      state.type = type;
      state.visible = true;
    },

    hideToast: (state) => {
      state.visible = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
