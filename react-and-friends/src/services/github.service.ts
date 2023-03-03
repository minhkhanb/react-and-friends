import apiClient from '../utils/api/axios';

export function getRepositories() {
  return apiClient.get('/users/minhkhanb/repos');
}
