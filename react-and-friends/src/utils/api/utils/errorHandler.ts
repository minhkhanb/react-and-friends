/**
 * Handle api error
 * @param url - api url occurs errors
 * @param err
 */
export const handleApiError = (url: string, err: Error): void => {
  console.log(`GOT ERROR WHILE CALLING API: ${url}`, err);
  throw err;
};
