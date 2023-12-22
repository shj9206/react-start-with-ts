import axios, { AxiosPromise } from "axios";

// 임시 타이핑
export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

// Define HTTPHeaders as a record with string keys and values
export type HTTPHeaders = Record<string, string>;

export type HTTPParams = unknown;

//
class API {
  readonly method: HTTPMethod;
  readonly url: string;
  baseURL?: string;
  headers?: HTTPHeaders;
  params?: HTTPParams;
  data?: unknown;
  timeout?: number;
  withCredentials?: boolean;

  constructor(method: HTTPMethod, url: string) {
    this.method = method;
    this.url = url;
  }

  call<T>(): AxiosPromise<T> {
    const http = axios.create();
    if (this.withCredentials) {
      http.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config;

          if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
              // 사용자 식별 정보와 함께 리프레시 토큰 요청
              const userId = "user-id"; // 실제 사용자 ID로 대체
              const sessionId = "session-id"; // 실제 세션 ID로 대체
              const response = await http.post("/refresh-token", {
                userId,
                sessionId,
              });

              const { accessToken } = response.data;

              // 새 액세스 토큰을 설정
              document.cookie = `accessToken=${accessToken};path=/`;

              // 원래 요청을 새 토큰으로 재시도
              return http(originalRequest);
            } catch (refreshError) {
              // 리프레시 토큰 요청 실패 처리
              return Promise.reject(refreshError);
            }
          }

          return Promise.reject(error);
        },
      );
    }
    return http.request({ ...this });
  }
}

export default API;
