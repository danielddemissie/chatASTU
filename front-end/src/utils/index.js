import axios from 'axios';

export const url = 'http://localhost:4300/api';
const axiosClient = axios.create({
  baseURL: url,
});

export function unsubscribeAxios() {
  const source = axios.CancelToken.source();
  return source.cancel();
}

export function cleanUpSocket(socket) {
  console.log('disconnected');
  return socket.disconnect();
}
export function nameCapitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export default axiosClient;
