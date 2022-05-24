import React from 'react';
import { addChat, allChatinRoom, getRoom } from '../api/index';
import { useEffect, useState, useRef } from 'react';
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
import Chat from '../components/Chat';

export default function Room() {
  const data = useLocation();

  let roomId = useRef(data.state.roomId);
  let user = useRef(data.state.user);

  roomId = roomId.current;
  user = user.current;

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
      setChats((chats) => [...chats, res.data.Data]);
    });
    getMessage(async (error, msg) => {
      if (error) return;
      const res = await addChat(user._id, roomId, msg);
      console.log(res.data);
      setChats((chats) => [...chats, res.data.Data]);
    });
    return () => {
      cancelAxios();
    };
  }, [room.name]);

  useEffect(() => {
    (async () => {
      const res = await getRoom(user._id, roomId);
      const allchatsinroom = await allChatinRoom(roomId._id);
      console.log(allchatsinroom.data);
      setRoom({ ...res.data.Data });
    })();
    return () => {
      cleanUpSocket(user, roomId);
      cancelAxios();
    };
  }, []);

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
      <h1>{user.username}</h1>
      <h3>{room.name}</h3>
      <div>
        {chats.length > 0 ? (
          chats.map((chat) => (
            <Chat text={chat.chat} username={chat.username} key={chat._id} />
          ))
        ) : (
          <p>no chats</p>
        )}
        <form
          className="form"
          onSubmit={(e) => handlerSendMessage(e)}
          style={{
            marginLeft: 10,
          }}
        >
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
