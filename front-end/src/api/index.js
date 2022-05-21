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

export function getUser(_id) {
  return axiosClient.post('/user/single' + _id);
}

export function addRoom(room, _id) {
  return axiosClient.post('/room/add/' + _id, { ...room });
}

export function getAllRooms(_id) {
  return axiosClient.get('/room/all/' + _id);
}

export function getRoom(_id, roomId) {
  return axiosClient.post('/room/single/' + _id, { roomId });
}

export function joinRooms(_id, roomId) {
  return axiosClient.post('/room/joinroom/' + _id, { roomId });
}

//TODO:
//getUserCurrentRoom
//getAllRoom and let user choose room
//
