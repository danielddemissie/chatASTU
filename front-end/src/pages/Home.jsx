import React, { useState } from 'react';
import { Button, Grid, Box, Divider } from '@mui/material';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Lock } from '@mui/icons-material';
import { addUser, signinUser } from '../api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Home() {
  const navigateTo = useNavigate();
  const [action, setAction] = useState({
    title: 'Signin',
    btitle: 'Signup',
  });
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const onFormChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (user.username !== '') {
      let data = null;
      if (action.title === 'Signin') {
        const res = await signinUser(user);
        data = res.data.Data;
        if (data) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1000,
          });
          setUser({
            username: '',
            password: '',
          });
          navigateTo('/joinroom', {
            state: data,
          });
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else if (action.title === 'Signup') {
        const res = await addUser(user);
        const newUser = res.data.Data;
        if (newUser) {
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: res.data.message + '\nClick signin button to login.',
          });
          setAction({
            title: action.title === 'Signin' ? 'Signup' : 'Signin',
            btitle: action.btitle === 'Signup' ? 'Signin' : 'Signup',
          });
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: res.data.message,
            showConfirmButton: false,
            timer: 5500,
          });
        }
      }
    }
  };

  const toggleForm = () => {
    setAction({
      title: action.title === 'Signin' ? 'Signup' : 'Signin',
      btitle: action.btitle === 'Signup' ? 'Signin' : 'Signup',
    });
  };
  return (
    <div>
      <Grid container alignItems={'center'} justifyContent="center" mt={'10%'}>
        <Grid item xs={'auto'} md={4}>
          <Box>
            <form onSubmit={(e) => onSubmitHandler(e)}>
              <h1>{action.title}</h1>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }} mb={2}>
                <AccountCircle
                  sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                />
                <TextField
                  name="username"
                  id="username"
                  label="Username"
                  variant="standard"
                  type="text"
                  value={user.username}
                  onChange={(e) => onFormChange(e)}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }} mb={2}>
                <Lock sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField
                  value={user.password}
                  name="password"
                  id="password"
                  label="Password"
                  variant="standard"
                  type="password"
                  onChange={onFormChange}
                />
              </Box>
              <Box mt={2}>
                <Button
                  disabled={user.username ? false : true}
                  type="submit"
                  variant="contained"
                >
                  {action.title}
                </Button>
              </Box>
            </form>
          </Box>
        </Grid>
        <Divider />
        <Grid item xs={8} md={4} ml={5}>
          <Box textAlign={'center'}>
            <Button variant="contained" onClick={toggleForm}>
              {action.btitle}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
