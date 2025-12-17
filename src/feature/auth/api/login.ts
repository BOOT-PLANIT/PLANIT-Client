import { apiClient } from "@/shared/api";

export async function login(idToken: string) {
  await apiClient.post("/auth/login", null, {
    headers: { Authorization: `Bearer ${idToken}` },
  });
}
