"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useLogout } from "@/feature/auth/api";
import type { MeResponse } from "@/feature/user";
import { apiClient, type ApiResponse } from "@/shared/api";
import { setAuth } from "@/shared/store/authSlice";

const AuthHydrator = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { mutate: logout } = useLogout();
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
        logout();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [dispatch, pathname, logout]);

  return null;
};

export default AuthHydrator;
