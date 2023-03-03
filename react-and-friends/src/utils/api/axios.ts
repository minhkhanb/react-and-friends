import axios, { AxiosInstance } from 'axios';
import { JwtIntercept } from './interceptors/jwt.interceptor';
import { ErrorIntercept } from './interceptors/error.interceptor';

const appConfig = {
  API_URL: process.env.GATSBY_API_SERVER_URL,
  API_TIMEOUT: 20000,
};

const axiosInstance = axios.create({
  baseURL: appConfig.API_URL,
  timeout: appConfig.API_TIMEOUT,
  headers: {
    'Content-type': 'application/json',
  },
});

const registerInterceptors = (axiosInst: AxiosInstance) => {
  JwtIntercept(axiosInst.interceptors.request);
  ErrorIntercept(axiosInst.interceptors.response);
};

registerInterceptors(axiosInstance);

export default axiosInstance;
