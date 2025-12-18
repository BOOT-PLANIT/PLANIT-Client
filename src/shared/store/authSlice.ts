import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isAuthenticated: boolean;
  userId: number | null;
  recentBootcampId: number | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  userId: null,
  recentBootcampId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{
        userId: number;
        recentBootcampId: number | null;
      }>,
    ) => {
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.recentBootcampId = action.payload.recentBootcampId;
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.recentBootcampId = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
