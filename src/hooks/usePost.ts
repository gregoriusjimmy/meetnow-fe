import axios, { AxiosRequestConfig } from 'axios';
import { useCallback } from 'react';

export function usePost<TResponse, TPayload>(url: string) {
  return () =>
    useCallback(
      async (data: TPayload, config?: AxiosRequestConfig) => {
        try {
          // const cookies = parseCookies();
          const customData = data;
          // if (cookies.token) {
          //   customData = { ...data, context: { token: cookies.token } };
          // }
          const res = await axios.post<TResponse>(url, customData, config);
          return res.data;
        } catch (error) {
          console.error(error instanceof Error ? error.message : error);
          throw error;
        }
      },
      [url]
    );
}
