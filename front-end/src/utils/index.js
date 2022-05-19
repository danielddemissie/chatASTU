import axios from 'axios';

const url = 'http://localhost:4300/api';
const axiosClient = axios.create({
  baseURL: url,
});

export function unsubscribeAxios() {
  const source = axios.CancelToken.source();
  return source.cancel();
}

export default axiosClient;
