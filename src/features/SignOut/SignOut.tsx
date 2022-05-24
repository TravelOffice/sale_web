import React, { useEffect } from 'react';
import { getSSOPage } from '@utils/EnvUtils';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '@redux/slices/authSlice';
import EventMessageType from '@domain/entities/event/EventMassageType';

const SSO_PAGE = getSSOPage();

/**
 * Define interface of message
 */
interface MessageData {
  type: EventMessageType
}

export default function SignOut() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      // Skip event from other origin
      if (event.origin !== SSO_PAGE) {
        return;
      }
      const message: MessageData = event.data;
      // Handle matched event
      if (message.type === 'cognito-signout') {
        dispatch(authActions.detachSession());
        history.push('/');
      }
    };
    window.addEventListener('message', listener);
    return () => {
      window.removeEventListener('message', listener);
    };
  }, []);
  return (
    <div className="sign-out">
      <iframe src={`${SSO_PAGE}/sign-out`} title="SSO" />
    </div>
  );
}
