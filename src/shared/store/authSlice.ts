import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isAuthenticated: boolean;
  userId: number | null;
  displayName: string | null;
  recentBootcampId: number | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  userId: null,
  displayName: null,
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
        displayName: string;
        recentBootcampId: number | null;
      }>,
    ) => {
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.displayName = action.payload.displayName;
      state.recentBootcampId = action.payload.recentBootcampId;
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.displayName = null;
      state.recentBootcampId = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
