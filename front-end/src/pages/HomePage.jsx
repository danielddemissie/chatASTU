import React from 'react';
import {
  Button,
  Divider,
  Form,
  Grid,
  Segment,
  Container,
} from 'semantic-ui-react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { signinUser } from '../api';

const HomePage = () => {
  const DividerC = styled(Divider)`
    @media (max-width: 500px) {
    }
  `;

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

  const onSubmitHandler = async () => {
    const userData = await signinUser(user);
    console.log(userData.data);
    setUser({
      username: '',
      password: '',
    });
  };
  return (
    <div>
      <Container textAlign="left">
        <Segment>
          <Grid columns={2} relaxed="very" stackable>
            <Grid.Column>
              <Form onSubmit={onSubmitHandler}>
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  label="Username"
                  placeholder="Username"
                  name="username"
                  value={user.username}
                  onChange={(e) => onFormChange(e)}
                />
                <Form.Input
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  label="Password"
                  value={user.password}
                  type="password"
                  onChange={(e) => onFormChange(e)}
                />

                <Button content="Login" primary />
              </Form>
            </Grid.Column>

            <Grid.Column verticalAlign="middle">
              <Button content="Sign up" icon="signup" size="big" />
            </Grid.Column>
          </Grid>

          <DividerC vertical={true}>Or</DividerC>
        </Segment>
      </Container>
    </div>
  );
};

export default HomePage;
