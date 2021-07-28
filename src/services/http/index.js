import axios from 'axios';
import { BASE_URL } from './config';

const http = axios.create({
  baseURL: BASE_URL,
});

http.interceptors.response.use(
  (response) => {
    // Do something before response is sent
    const { data } = response;
    return Promise.resolve(data);
  },
  (error) => {
    // Do something with response error
    const { status, statusText } = error.response;
    // TODO: display error info to user
    console.log(`Error: ${status} ${statusText}`);
    return Promise.reject(error);
  },
);

export default http;
