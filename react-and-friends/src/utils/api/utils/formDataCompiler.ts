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
