import React, { useEffect } from 'react';
import './Initial.scss';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '@redux/slices/authSlice';
import { getSSOPage } from '@utils/EnvUtils';
import EventMessageType from '@domain/entities/event/EventMassageType';
import { RootState } from '@redux/store';
import { useHistory } from 'react-router-dom';

const SSO_PAGE = getSSOPage();

/**
 * Define interface of message
 */
interface MessageData {
  type: EventMessageType,
  session: any,
}

export default function Initial() {
  const dispatch = useDispatch();
  const history = useHistory();
  const initialized = useSelector((state: RootState) => state.auth.initialized);
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      // Skip event from other origin
      if (event.origin !== SSO_PAGE) {
        return;
      }
      const message: MessageData = event.data;
      // Handle matched event
      // eslint-disable-next-line no-console
      console.log(message);
      if (message.type === 'cognito-signin') {
        const { session } = message;
        dispatch(authActions.attachSession(session));
      }
    };
    window.addEventListener('message', listener);
    return () => {
      window.removeEventListener('message', listener);
    };
  }, []);

  useEffect(() => {
    if (initialized) {
      const locationState: any = history.location.state;
      history.push(locationState.from.pathname);
    }
  }, [initialized]);

  return (
    <div className="initial">
      <iframe src={SSO_PAGE} title="SSO" />
    </div>
  );
}
