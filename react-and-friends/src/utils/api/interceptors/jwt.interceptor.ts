import { AxiosInterceptorManager, AxiosRequestConfig } from 'axios';
import storage from "../storage";

export const JwtIntercept = (request: AxiosInterceptorManager<AxiosRequestConfig>): void => {
  request.use((config) => {
    const token = storage.loadData('token');

    if (token) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `${JSON.parse(token)}`,
        },
      };
    }

    return config;
  });
};
