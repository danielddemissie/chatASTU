import { useState, useEffect, useRef } from 'react';
import {
  List,
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  TextField,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllRooms, getAllRoomsOfUser, joinRooms, addRoom } from '../api';
import { cancelAxios } from '../utils';
import { useCallback } from 'react';

export default function JoinRoom() {
  const navigateTo = useNavigate();
  const data = useLocation();

  const [allRooms, setallRooms] = useState([]);
  const [userRooms, setuserRooms] = useState([]);

  const [selectedIndex, setSelectedIndex] = useState(1);
  const [open, setOpen] = useState(false);
  const [rName, setrName] = useState('');

  let loggedUser = useRef(data.state);
  loggedUser = loggedUser.current;

  useEffect(() => {
    (async () => {
      const allrooms = await getAllRooms();
      const usersrooms = await getAllRoomsOfUser(loggedUser._id);
      setallRooms(() => allrooms.data.Data);
      setuserRooms(() => usersrooms.data.Data);
    })();
    return () => {
      cancelAxios();
    };
  }, []);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const joinRoomHandler = async (roomN) => {
    const res = await joinRooms(loggedUser._id, roomN);
    if (res.data.Data) {
      navigateTo('/room', {
        state: {
          room: res.data.Data,
          user: { ...loggedUser },
        },
      });
    }
  };

  const toggleModal = () => {
    setOpen(!open);
  };

  const onFormChange = (e) => {
    setrName(e.target.value);
  };
  const addroomHandler = useCallback(async (rName) => {
    const newRoom = await addRoom(rName, loggedUser._id);
    setuserRooms((userrooms) => [...userrooms, newRoom.data.Data]);
  }, []);
  const onFormSubmit = async (e) => {
    e.preventDefault();
    addroomHandler(rName);
    setrName('');
    toggleModal();
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav">
        {loggedUser && userRooms.length > 0 ? (
          <Box>
            <h1>Welcome {loggedUser.username} Your Rooms.</h1>
            {userRooms.map((room) => (
              <ListItemButton
                key={room._id}
                selected={selectedIndex === 0}
                onClick={(event) => {
                  handleListItemClick(event, 0);
                  joinRoomHandler(room.name);
                }}
              >
                <ListItemText primary={room.name} />
              </ListItemButton>
            ))}
          </Box>
        ) : (
          <div>
            <h1>Welcome {loggedUser.username} .you currently have NO Room.</h1>
            <Grid container alignItems={'center'}>
              <Grid item>
                <ListItemButton>
                  <ListItemText
                    sx={{
                      bgcolor: '#f3f3f3',
                      borderRadius: 2,
                    }}
                    onClick={() => toggleModal()}
                  >
                    Add Room
                  </ListItemText>
                </ListItemButton>
                <Modal open={open} onClose={() => toggleModal()}>
                  <Box
                    sx={{
                      bgcolor: 'background.paper',
                      width: 300,
                      height: 100,
                      borderRadius: 2,
                    }}
                    mx={'auto'}
                    mt={30}
                    p={5}
                    fontSize={[12, 15, 20]}
                  >
                    <form onSubmit={onFormSubmit}>
                      <TextField
                        label="roomName"
                        variant="standard"
                        type="text"
                        value={rName}
                        onChange={(e) => onFormChange(e)}
                      />
                      <Box mt={3}>
                        <Button type="submit" variant="contained">
                          Add
                        </Button>
                      </Box>
                    </form>
                  </Box>
                </Modal>
              </Grid>
              <Divider orientation="vertical" flexItem>
                Or-Join
              </Divider>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => joinRoomHandler('public')}
                >
                  Public
                </Button>
              </Grid>
            </Grid>
          </div>
        )}
      </List>
      {allRooms.length > 0 && (
        <Box>
          <h1>all Rooms.</h1>
          {allRooms.map((room) => (
            <ListItemButton
              key={room._id}
              selected={selectedIndex === 0}
              onClick={(event) => {
                handleListItemClick(event, 0);
                joinRoomHandler(room.name);
              }}
            >
              <ListItemText primary={room.name} />
            </ListItemButton>
          ))}
        </Box>
      )}
    </Box>
  );
}
