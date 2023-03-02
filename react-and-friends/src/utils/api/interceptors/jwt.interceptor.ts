import { AxiosInterceptorManager, AxiosRequestConfig } from 'axios';
import storage from '@src/utils/api/storage';
import * as constants from 'src/utils/constants';

export const JwtIntercept = (request: AxiosInterceptorManager<AxiosRequestConfig>): void => {
  request.use((config) => {
    const token = storage.loadData(constants.accessTokenKey);

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
