import { addChat } from '../api/index';
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

  const room = useRef(data.state.room);
  const user = useRef(data.state.user);

  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    connectToSocket(room.current.name, user.current.username);
    onWelcomeMessage(async (error, msg) => {
      if (error) return;
      const res = await addChat(user.current.username, room.current.name, msg);
      setChats((chats) => [...chats, res.data.Data]);
    });
    getMessage(async (error, { msg, user }) => {
      if (error) return;
      const res = await addChat(user, room.current.name, msg);
      setChats((chats) => [...chats, res.data.Data]);
    });
    return () => {
      cleanUpSocket();
      cancelAxios();
    };
  }, []);

  const onMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handlerSendMessage = (e) => {
    e.preventDefault();
    message && sendMessage(user.current.username, room.current.name, message);
    setMessage('');
  };

  return (
    <div>
      <h1>{user.current.username}</h1>
      <h3>{room.current.name}</h3>
      <div>
        {chats.length > 0 ? (
          chats.map((chat) => (
            <Chat msg={chat.text} username={chat.user} key={chat._id} />
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
          />
          <Button type="submit" disabled={message === '' ? true : false}>
            <SendOutlined />
          </Button>
        </form>
      </div>
    </div>
  );
}
