import useInput from '@hooks/useInput';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Success, Form, Label, Error, Input, LinkContainer, Button, Header } from './styles';

const SignUp = () => {
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, , setPassword] = useInput('');
  const [passwordCheck, , setPasswordCheck] = useInput('');
  const [mismatchError, setMismatchError] = useState(false);

  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck],
  );
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!mismatchError) {
        console.log('sign up of server');
        setSignUpError('');
        setSignUpSuccess(false);

        axios
          .post('/api/users', {
            email,
            nickname,
            password,
          })
          .then((response) => {
            console.log('success!!!!!!!!');
            setSignUpSuccess(true);
          })
          .catch((error) => {
            console.log('Error!!!!!!!!!!');
            setSignUpError(error.response.data);
          })
          .finally(() => {});
      }
    },
    [email, nickname, password, passwordCheck, mismatchError],
  );

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
        <Label id='nickname-label'>
          <span>Nickname</span>
          <div>
            <Input type='text' id='nickname' name='nickname' value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id='password-label'>
          <span>Password</span>
          <div>
            <Input type='password' id='password' name='password' value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id='password-check-label'>
          <span>Password check</span>
          <div>
            <Input
              type='password'
              id='password-check'
              name='password-check'
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error> Password do not match.</Error>}
          {!nickname && <Error>Enter your nickname.</Error>}
          {signUpError && <Error>{signUpError}</Error>}
          {signUpSuccess && <Success>Success!</Success>}
        </Label>
        <Button type='submit'>Sign up</Button>
      </Form>
      <LinkContainer>
        Do you have account?&nbsp;
        <a href='/login'>Sgin in to Slack</a>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
