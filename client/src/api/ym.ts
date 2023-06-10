import { YMApi } from 'ym-api';
import configUserData from '../utils/configUserData';

const api = new YMApi();

export const ymApi = () => {

  /**
   * @TODO change config 
   */
  // const {username, password, uid} = configUserData.user;

  api.init(configUserData.user);

  return api;
};
