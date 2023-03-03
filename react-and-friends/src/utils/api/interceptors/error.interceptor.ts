import { AxiosInterceptorManager, AxiosResponse } from 'axios';

export const ErrorIntercept = (response: AxiosInterceptorManager<AxiosResponse>): void => {
  response.use(
    (data) => data,
    async (err) => {
      // const config = err?.config as AxiosRequestConfig & { sent: boolean };
      //   console.log('config: ', config);
      //
      // //error?.response?.status === 401 && !config?.sent
      // if (!err.response && !config.sent) {
      //   config.sent = true;
      //
      //   const tokenIsExpired = await memoizedCheckTokenIsExpired();
      //
      //   if (tokenIsExpired) {
      //     await memoizedRefreshToken();
      //   }
      //
      //   return axiosInstance(config);
      // } else if (config.sent) {
      //   // logout
      // }
      //
      // if (err.reponse) {
      //   return Promise.reject(err);
      // }

      return Promise.reject(err);
    }
  );
};
