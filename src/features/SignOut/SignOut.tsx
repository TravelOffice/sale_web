import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '@redux/slices/authSlice';
import RedirectToSSO from '@components/Redirect/RedirectToSSO';

/**
 * Define interface of message
 */

export default function SignOut() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.detachSession());
  }, []);
  return (
    <div className="sign-out">
      <RedirectToSSO path="/sign-out" />
    </div>
  );
}
