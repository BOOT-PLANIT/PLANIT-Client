import axios from "axios";
import { cookies } from "next/headers";
export const getApiServer = async () => {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  return axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
    headers: {
      Cookie: cookieString,
    },
  });
};
