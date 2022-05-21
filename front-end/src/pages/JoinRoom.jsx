import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { Button, Divider, Grid } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllRooms, joinRooms } from '../api';
import { cancelAxios } from '../utils';

export default function JoinRoom() {
  const [rooms, setRooms] = useState([]);
  const data = useLocation();
  const loggedUser = data.state;
  const navigateTo = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await getAllRooms(loggedUser._id);
      setRooms(() => res.data.Data);
    })();
    return () => {
      cancelAxios();
    };
  }, [loggedUser]);

  const [selectedIndex, setSelectedIndex] = useState(1);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const joinRoomHandler = async (roomId) => {
    await joinRooms(loggedUser._id, roomId);
    navigateTo('/room', {
      state: {
        room: roomId,
        user: { ...loggedUser },
      },
    });
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav">
        {loggedUser && rooms.length > 0 ? (
          <Box>
            <h1>Welcome {loggedUser.username} Your Rooms.</h1>
            {rooms.map((room) => (
              <ListItemButton
                key={room._id}
                selected={selectedIndex === 0}
                onClick={(event) => {
                  handleListItemClick(event, 0);
                  joinRoomHandler(room._id);
                }}
              >
                <ListItemText primary={room.name} />
              </ListItemButton>
            ))}
          </Box>
        ) : (
          <div>
            <h1>Welcome {loggedUser.username} you currently have 0 Room.</h1>
            <Grid container alignItems={'center'}>
              <Grid item>
                <ListItemButton>
                  <ListItemText>Add Room</ListItemText>
                </ListItemButton>
              </Grid>
              <Divider orientation="vertical" flexItem>
                Or-Join
              </Divider>
              <Grid item>
                <Button variant="contained">Public</Button>
              </Grid>
            </Grid>
          </div>
        )}
      </List>
    </Box>
  );
}
