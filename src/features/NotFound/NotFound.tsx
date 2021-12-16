import React from 'react';
import { Redirect } from 'react-router-dom';
import { useIsLoggedIn } from '../../hooks/auth';

export default function NotFound() {
  const isLoggedIn = useIsLoggedIn();
  if (!isLoggedIn) {
    return <Redirect to="sign-in" />;
  }
  return (
    <div>
      Not Found
    </div>
  );
}
