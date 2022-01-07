import React from 'react';
import {
  Redirect,
  Route, RouteProps,
} from 'react-router-dom';
import { useIsLoggedIn } from '../../hooks/auth';

/**
 * A route component extended from default Route (react-Router-dom). This component
 * should redirect to the /sign-in page if the user has not logged in.
 * @param props properties of the route.
 */
export default function AuthRoute(props: RouteProps) {
  const isLoggedIn = useIsLoggedIn();
  const { children, ...rest } = props;
  return (
    <>
      <div>hha</div>
      <Route
        {...rest}
        render={({ location }) => (
          isLoggedIn ? children : <Redirect to={{ pathname: '/initial', state: { from: location } }} />
        )}
      />
    </>
  );
}
