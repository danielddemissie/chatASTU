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
  return axiosClient.get('/user/single/' + _id);
}

export function addRoom(roomName, _id) {
  return axiosClient.post('/room/add/' + _id, { roomName });
}

export function getAllRoomsOfUser(_id) {
  return axiosClient.get('/room/all/' + _id);
}
export function getAllRooms() {
  return axiosClient.get('/room/all');
}
export function getRoom(_id, roomId) {
  return axiosClient.post('/room/single/' + _id, { roomId });
}

export function joinRooms(_id, roomName) {
  return axiosClient.get('/room/joinroom/' + _id, {
    params: {
      name: roomName,
    },
  });
}

export function addChat(username, rname, text) {
  return axiosClient.post(
    '/chat/add/' + rname,
    { text },
    {
      params: {
        username,
      },
    }
  );
}
export function allChatinRoom(rname) {
  return axiosClient.get(`/chat/all/${rname}`);
}

//TODO:
//getUserCurrentRoom
//getAllRoom and let user choose room
//
