import useInput from '@hooks/useInput';
import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from '@pages/SignUp/styles';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { truncate } from 'fs';
import React, { useCallback, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import useSWR from 'swr';

const LogIn = () => {
  const { data, error, mutate } = useSWR('/api/users', fetcher, {
    dedupingInterval: 10000,
  });
  const [logInError, setLogInError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLogInError(false);
      axios
        .post('/api/users/login', { email, password }, { withCredentials: true })
        .then((response) => {
          mutate(response.data, false); //OPTIMISTIC UI
        })
        .catch((error) => {
          setLogInError(error.response?.data?.statusCode === 401);
        });
    },
    [email, password],
  );

  if (data === undefined) {
    return <div>Loding...</div>;
  }

  if (data) {
    return <Redirect to='/workspace/channel' />;
  }

  // console.log(error, userData);
  // if (!error && userData) {
  //   console.log('로그인됨', userData);
  //   return <Redirect to="/workspace/sleact/channel/일반" />;
  // }

  return (
    <div id='container'>
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id='email-label'>
          <span>Email address</span>
          <div>
            <Input type='email' id='email' name='email' value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id='password-label'>
          <span>Password</span>
          <div>
            <Input type='password' id='password' name='password' value={password} onChange={onChangePassword} />
          </div>
          {logInError && <Error>Email and password combinations do not match.</Error>}
        </Label>
        <Button type='submit'>Login</Button>
      </Form>
      <LinkContainer>
        Not a member yet? &nbsp;
        <Link to='/signup'>Sign Up</Link>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
