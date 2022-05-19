import axiosClient from '../utils';

export function signinUser(user) {
  return axiosClient.post('/user/signin', { ...user });
}

export function addUser(user) {
  return axiosClient.post('/user/add', { ...user });
}

export function getAllUsers() {
  return axiosClient.get('/user/all');
}
