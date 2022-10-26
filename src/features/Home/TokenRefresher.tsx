import React from 'react';
import { getSSOPage } from '@utils/EnvUtils';
import { useSsoEvent } from '@hooks/auth';
import { useDispatch } from 'react-redux';
import { authActions } from '@redux/slices/authSlice';

const refreshTokenUrl = `${getSSOPage()}/refresh`;

export default function TokenRefresher() {
  const dispatch = useDispatch();

  useSsoEvent('cognito-refresh', (data) => {
    dispatch(authActions.refreshSession(data));
  });

  return (
    <>
      <iframe title="Refresh token" hidden src={refreshTokenUrl} />
    </>
  );
}
