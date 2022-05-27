import axios from 'axios';
const url = 'http://localhost:4300/api';
const axiosClient = axios.create({
  baseURL: url,
});

export function cancelAxios() {
  const source = axios.CancelToken.source();
  return source.cancel();
}

export function nameCapitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export default axiosClient;
