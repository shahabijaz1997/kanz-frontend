import axios from 'axios';
import { getEnv } from "../../env";

const ENV = getEnv();

const api = axios.create({
  baseURL: `${ENV.API_URL}/${ENV.API_VERSION}`,

});

// Add an interceptor for handling request errors
api.interceptors.request.use(
  (config) => config,
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add an interceptor for handling response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle response error
    return Promise.reject(error);
  }
);

export default api;