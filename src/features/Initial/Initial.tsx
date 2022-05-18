import React, { useEffect } from 'react';
import './Initial.scss';
import { useDispatch } from 'react-redux';
import { authActions } from '@redux/slices/authSlice';
import { getSSOPage } from '@utils/EnvUtils';
import { useHistory } from 'react-router-dom';

const SSO_PAGE = getSSOPage();

/**
 * Define interface of message
 */
interface MessageData {
  type: string,
  session: any,
}

export default function Initial() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      // Skip event from other origin
      if (event.origin !== SSO_PAGE) {
        return;
      }
      const message : MessageData = event.data;
      // Skip unmatched event
      if (message.type !== 'cognito') {
        return;
      }
      const { session } = message;

      dispatch(authActions.attachSession(session));
      const locationState : any = history.location.state;
      history.push(locationState.from.pathname);
    };
    window.addEventListener('message', listener);
    return () => {
      window.removeEventListener('message', listener);
    };
  }, []);
  return (
    <div className="initial">
      <iframe src={SSO_PAGE} title="SSO" />
    </div>
  );
}
