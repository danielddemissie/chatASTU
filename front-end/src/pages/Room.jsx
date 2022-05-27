import { addChat, allChatinRoom } from '../api/index';
import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  cleanUpSocket,
  connectToSocket,
  getMessage,
  onWelcomeMessage,
  sendMessage,
} from '../utils/socket';
import { cancelAxios } from '../utils/axios';
import { Button, Input } from '@mui/material';
import { SendSharp } from '@mui/icons-material';
import Chat from '../components/Chat';
import { Box, Flex } from 'rebass';
import styled from '@emotion/styled';

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
      //add only once
    });
    getMessage(async (error, { msg, user }) => {
      if (error) return;
      const res = await addChat(user, room.current.name, msg);
      setChats((chats) => [...chats, res.data.Data]);
    });
    (async () => {
      const res = await allChatinRoom(room.current.name);
      setChats(() => res.data.Data);
    })();
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
    const newMessage = {
      _id: uuidv4(),
      user: user.current.username,
      rname: room.current.name,
      text: message,
    };
    setChats((chats) => [...chats, newMessage]);
    setMessage('');
  };

  const ScrollToBottom = styled.div`
    scroll-behavior: smooth;
    scroll-margin-bottom: initial;
    width: '90%';
    margin: 0 auto;
  `;

  return (
    <div>
      <h1>{user.current.username}</h1>
      <h3>{room.current.name}</h3>
      <ScrollToBottom>
        <div>
          {chats.length > 0 ? (
            chats.map((chat) => (
              <Chat
                sender={user.current.username}
                msg={chat.text}
                username={chat.user}
                key={chat._id}
              />
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
            <Box
              mt={5}
              mx={'auto'}
              sx={{
                border: '1px solid teal',
                borderRadius: 10,
                padding: '10px 20px',
                height: 100,
                width: '90%',
                marginBottom: 19,
              }}
            >
              <Flex mt={30}>
                <Input
                  autoFocus
                  fullWidth
                  type="text"
                  placeholder="Type a Message"
                  value={message}
                  onChange={onMessageChange}
                />
                <Button
                  style={{
                    fontSize: 40,
                  }}
                  type="submit"
                  disabled={message === '' ? true : false}
                >
                  <SendSharp />
                </Button>
              </Flex>
            </Box>
          </form>
        </div>
      </ScrollToBottom>
    </div>
  );
}
