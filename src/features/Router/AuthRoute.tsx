import React from 'react';
import {
  Route, RouteProps,
} from 'react-router-dom';
import { useAuthStatus } from '@hooks/auth';
import { getSSOPage } from '@utils/EnvUtils';
import FallbackSpinner from '@components/FallbackSpinner/FallbackSpinner';
import RedirectToExternalUri from '@components/Redirect/RedirectToExternalUri';

const SSO_PAGE = getSSOPage();

/**
 * A route component extended from default Route (react-Router-dom). This component
 * should redirect to the /sign-in page if the user has not logged in.
 * @param props properties of the route.
 */
export default function AuthRoute(props: RouteProps) {
  const authStatus = useAuthStatus();
  const { children, ...rest } = props;

  // TODO: state oneOf checking | notLoggedIn | loggedIn
  // checking -> show spinner
  // notLoggedIn (expired) -> redirect SSO
  // loggedIn -> render

  return (
    <>
      <Route
        {...rest}
        render={() => {
          if (authStatus === 'checking') {
            return <FallbackSpinner />;
          }
          if (authStatus === 'notLoggedIn') {
            return <RedirectToExternalUri to={`${SSO_PAGE}?redirect_uri=${window.location.href}`} />;
          }
          return children;
        }}
      />
    </>
  );
}
