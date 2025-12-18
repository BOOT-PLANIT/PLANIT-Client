"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import type { MeResponse } from "@/feature/user";
import { apiClient, type ApiResponse } from "@/shared/api";
import { clearAuth, setAuth } from "@/shared/store/authSlice";

const AuthHydrator = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    if (pathname.startsWith("/signin")) return;

    let cancelled = false;

    (async () => {
      try {
        const meRes = await apiClient.get<ApiResponse<MeResponse>>("/users/me");
        const me = meRes.data.data;
        if (!me || cancelled) return;

        dispatch(
          setAuth({
            userId: me.id,
            displayName: me.displayName,
            recentBootcampId: me.recentBootcampId,
          }),
        );
      } catch {
        await apiClient.post("/auth/logout");
        dispatch(clearAuth());
        window.location.href = "/signin";
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [dispatch, pathname]);

  return null;
};

export default AuthHydrator;
