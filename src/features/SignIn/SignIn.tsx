import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '@redux/slices/authSlice';

export default function SignIn() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    const signInPayload = { username, password };
    dispatch(authActions.signIn(signInPayload));
  };
  return (
    <div>
      Sign In page
      <form>
        <input name="username" placeholder="Username" onChange={(event) => setUsername(event.target.value)} />
        <input name="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
        <button type="button" onClick={handleLogin}>Sign In</button>
      </form>
    </div>
  );
}
