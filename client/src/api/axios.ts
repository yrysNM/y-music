import axios from 'axios';
import { getItem } from '../helpers/persistanceStorage';

axios.defaults.baseURL = `${import.meta.env.VITE_SPOTIFY_BASE_URL_ACCOUNT}`;

axios.interceptors.request.use(config => {
  const token = getItem<string>('accessToken');
  const authorizationToken = token ? `Bearer ${token}` : '';
  config.headers.Authorization = authorizationToken;
  return config;
});

export { axios };
