import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:6000";

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: 인증 토큰 추가 (필요시)
apiClient.interceptors.request.use(
  (config) => {
    // TODO: Firebase ID Token을 여기서 추가
    // const token = getAuthToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터: 공통 응답 형식 처리
apiClient.interceptors.response.use(
  (response) => {
    // API 응답이 { code, message, data } 형식이므로 그대로 반환
    return response.data;
  },
  (error) => {
    // 에러 응답 처리
    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  },
);
