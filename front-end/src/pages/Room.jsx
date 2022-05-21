import React from 'react';
import { getRoom, getUser } from '../api/index';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Room() {
  const data = useLocation();
  const roomId = data.state.room;
  console.log(roomId);
  const user = data.state.user;

  useEffect(() => {
    getRoomapi();
  }, []);

  useEffect(() => {
    const data = getAllusersOfroom();
    console.log(data);
  }, []);

  const [room, setRoom] = useState({
    name: '',
    users: [],
  });

  const getRoomapi = async () => {
    const res = await getRoom(user._id, roomId);
    setRoom({ ...res.data.Data });
  };

  const getAllusersOfroom = () => {
    let allusers = [];
    room.users.lenght > 0 &&
      room.users.map(async (user) => {
        const res = await getUser(user._id);
        allusers.push(res.data.Data);
      });
    console.log(allusers);
    return allusers;
  };
  console.log(room);
  return <div>{room.name}</div>;
}
