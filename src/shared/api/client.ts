import axios from "axios";

import { queryClient } from "@/shared/query/queryClient";
import { clearAuth } from "@/shared/store/authSlice";
import { getStore } from "@/shared/store/store";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:6000";

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 3000,
  withCredentials: true,
});

function buildSigninUrl() {
  const next = window.location.pathname + window.location.search;

  const url = new URL("/signin", window.location.origin);
  url.searchParams.set("next", next);
  return url.toString();
}

let redirecting = false;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;

    if (status === 401 && typeof window !== "undefined") {
      const store = getStore();
      store.dispatch(clearAuth());
      queryClient.clear();

      if (!redirecting) {
        redirecting = true;
        window.location.assign(buildSigninUrl());
      }
    }

    // 기존처럼 서버 에러 payload 넘기기
    if (error.response?.data) return Promise.reject(error.response.data);
    return Promise.reject(error);
  },
);
