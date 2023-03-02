import { AxiosError, AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosInstance from '../axios';
import {
  memoizedCheckTokenIsExpired,
  memoizedRefreshToken,
} from '@src/utils/api/utils/refreshToken';
import { store } from '@src/store';
import { logout } from '@src/store/actionCreators/auth';

export const ErrorIntercept = (response: AxiosInterceptorManager<AxiosResponse>): void => {
  response.use(
    (data) => data,
    async (err) => {
      const config = err?.config as AxiosRequestConfig & { sent: boolean };

      //error?.response?.status === 401 && !config?.sent
      if (!err.response && !config.sent) {
        config.sent = true;

        const tokenIsExpired = await memoizedCheckTokenIsExpired();

        if (tokenIsExpired) {
          await memoizedRefreshToken();
        }

        return axiosInstance(config);
      } else if (config.sent) {
        store.dispatch(logout());
      }

      if (err.reponse) {
        return Promise.reject(err);
      }

      return Promise.reject(err);
    }
  );
};
