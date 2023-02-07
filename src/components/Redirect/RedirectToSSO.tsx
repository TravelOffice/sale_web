import React from 'react';
import { getSSOPage } from '@utils/EnvUtils';
import RedirectToExternalUri from './RedirectToExternalUri';

interface RedirectToSSOProps {
  path: string;
}

const SSO_PAGE = getSSOPage();

export default function RedirectToSSO(props: RedirectToSSOProps) {
  const { path } = props;
  return (
    <RedirectToExternalUri to={`${SSO_PAGE}${path}?redirect_uri=${window.location.origin}`} />
  );
}
