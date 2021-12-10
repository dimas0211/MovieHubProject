import axios from 'axios/index';
import { API_KEY } from '../../constants/configurations';

axios.defaults.headers.common.Authorization = `Bearer ${API_KEY}`;

const successHandler = (response) => response.data;
const errorHandler = (error) => {
  throw error;
};
const defaultConfig = {
  headers: {
    'X-Custom-Header': 'foobar'
  }
};

export const createHttpHandler = (handler, onSuccess = successHandler, onError = errorHandler) => handler.then(onSuccess).catch(onError);

class httpService {
  static $singleton = true;

  constructor(config = defaultConfig) {
    this.config = config;
  }

  get(url, config) {
    return createHttpHandler(axios.get(url, config));
  }

  put(url, data, config) {
    return createHttpHandler(axios.put(url, data, config));
  }

  post(url, data, config) {
    return createHttpHandler(axios.post(url, data, config));
  }

  delete(url, config) {
    return createHttpHandler(axios.delete(url, config));
  }
}

export default httpService;
