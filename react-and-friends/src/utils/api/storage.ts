/**
 * Find an item from Storage by key
 * @param {String} key
 * @returns {Promise} return a Promise
 */

export const loadData = (key: string): string | null => localStorage.getItem(key);

/**
 * Set an item to Storage by key
 * @param {String} key
 * @param {any} data
 * @returns {Promise} return a Promise
 */
export const saveData = (key: string, data: string): void => localStorage.setItem(key, data);

export const clearData = (key: string): void => localStorage.removeItem(key);

const storage = {
  loadData,
  saveData,
  clearData,
};

export default storage;
