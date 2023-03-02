/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import {compileUrl} from "./utils/urlParser";
import {ObjectToFormData} from "./utils/formDataCompiler";
import axiosInstance from "./axios";

type RequestOptions = {
  headers?: AxiosRequestConfig['headers'];
  useFormData?: boolean;
  params?: any;
  platform?: string;
};

const REQUEST_TYPE = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DEL: 'DEL',
};

type QueryParams = {
  [key: string]: string;
};

/**
 * Requests to API
 * @param {String} type
 * @param {String} endpoint
 * @param {Object} queryParam
 * @param {Object} data
 * If you wish to send FormData instead of JSON, set options.useFormData to true.
 * @param options
 */
const request = <T>(
  type: string,
  endpoint: string,
  queryParam = {},
  data = {},
  options: RequestOptions = { useFormData: false }
): Promise<AxiosResponse<T>> => {
  let req;
  const url = compileUrl(endpoint, queryParam);
  let formData = { ...data };
  const reqOptions: RequestOptions = { ...options };

  if (options.useFormData) {
    formData = ObjectToFormData({ ...data });
    reqOptions.headers = { 'Content-Type': 'multipart/form-data' };
  }

  if (options.platform) {
    reqOptions.headers = {
      ...reqOptions.headers,
      platform: options.platform,
    };
  }

  switch (type) {
    case REQUEST_TYPE.POST:
      req = axiosInstance.post(url, formData, reqOptions);
      break;

    case REQUEST_TYPE.PUT:
      req = axiosInstance.put(url, formData, reqOptions);
      break;

    case REQUEST_TYPE.DEL:
      req = axiosInstance.delete(url, { data: formData, ...reqOptions });
      break;

    default:
      req = axiosInstance.get(url, reqOptions);
      break;
  }

  return req;
};

/**
 * Send GET Request to API
 * @param {String} url
 * @param {Object} queryParam
 * @param {AxiosRequestConfig} options
 */
const get = <T>(
  url: string,
  queryParam = {},
  options: RequestOptions = { useFormData: false }
): Promise<AxiosResponse<T>> => request(REQUEST_TYPE.GET, url, queryParam, undefined, options);

/**
 * Send POST Request to API
 * @param {String} url
 * @param {Object} queryParam
 * @param {Object} data
 * @param {AxiosRequestConfig} options
 * If you wish to send FormData instead of JSON, set options.useFormData to true.
 */
const post = <T>(
  url: string,
  queryParam = {},
  data = {},
  options: RequestOptions = { useFormData: false }
): Promise<AxiosResponse<T>> => request(REQUEST_TYPE.POST, url, queryParam, data, options);

/**
 * Send PUT Request to API
 * @param {String} url
 * @param queryParams
 * @param {Object} data
 * @param {AxiosRequestConfig} options
 * If you wish to send FormData instead of JSON, set options.useFormData to true.
 */
const put = <T>(
  url: string,
  queryParams: QueryParams = {},
  data = {},
  options: RequestOptions = { useFormData: false }
): Promise<AxiosResponse<T>> => request(REQUEST_TYPE.PUT, url, queryParams, data, options);

/**
 * Send DELETE Request to API
 * @param {String} url
 * @param queryParams
 * @param data
 * @param {AxiosRequestConfig} options
 */
const remove = <T>(
  url: string,
  queryParams: QueryParams = {},
  data = {},
  options: RequestOptions = { useFormData: false }
): Promise<AxiosResponse<T>> => request(REQUEST_TYPE.DEL, url, queryParams, data, options);

const api = {
  get,
  post,
  put,
  delete: remove,
};

export default api;
