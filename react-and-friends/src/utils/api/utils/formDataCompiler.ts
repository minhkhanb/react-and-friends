import {AxiosResponse} from "axios";

/**
 * Parse object into FormData
 * @param {Object} params
 */
type Params = {
  [key: string]: string;
};

export const ObjectToFormData = (params: Params = {}): FormData => {
  const formData = new FormData();
  Object.keys(params).forEach((key) => {
    formData.append(key, params[key]);
  });
  return formData;
};

export const responseDTO = async <DataType, TParam = unknown>(
  cb: (options: TParam) => Promise<AxiosResponse<DataType>>,
  options?: TParam,
) => {
  const defaultOptions = {} as TParam;
  const opts = options ? options : defaultOptions;

  const response = await cb(opts);

  return response?.data;
};
