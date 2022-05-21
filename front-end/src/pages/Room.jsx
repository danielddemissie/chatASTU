import React from 'react';
import { addChat, getRoom } from '../api/index';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  cancelAxios,
  cleanUpSocket,
  connectToSocket,
  getMessage,
  onWelcomeMessage,
  sendMessage,
} from '../utils';
import { Button, Input } from '@mui/material';
import { SendOutlined } from '@mui/icons-material';

export default function Room() {
  const data = useLocation();
  const roomId = data.state.room;
  const user = data.state.user;
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState({
    name: '',
    users: [],
  });

  useEffect(() => {
    connectToSocket(room.name, user.username);
    onWelcomeMessage(async (error, msg) => {
      if (error) return;
      const res = await addChat(user._id, roomId, msg);
      setChats((chats) => [res.data.Data, ...chats]);
    });
    getMessage(async (error, msg) => {
      if (error) return;
      const res = await addChat(user._id, roomId, msg);
      console.log(res.data);
      setChats((chats) => [...chats, res.data.Data]);
    });
    return () => {
      cleanUpSocket();
    };
  }, [room, user, roomId]);

  useEffect(() => {
    getRoomapi();
    return () => {
      cancelAxios();
    };
  }, []);

  const getRoomapi = async () => {
    const res = await getRoom(user._id, roomId);
    setRoom({ ...res.data.Data });
  };

  const onMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handlerSendMessage = (e) => {
    e.preventDefault();
    if (message) {
      sendMessage(user.username, room.name, message);
    }
    setMessage('');
  };

  return (
    <div>
      {room.name}
      <div>
        {chats.length > 0 ? (
          chats.map((chat) => <p key={chat._id}>{chat.chat}</p>)
        ) : (
          <p>no chats</p>
        )}
        <form className="form" onSubmit={(e) => handlerSendMessage(e)}>
          <Input
            type="text"
            placeholder="Type a Message"
            value={message}
            onChange={onMessageChange}
            // onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
          />
          <Button type="submit" disabled={message === '' ? true : false}>
            <SendOutlined />
          </Button>
        </form>
      </div>
    </div>
  );
}
