import React from 'react';
import { RoutePathConfig } from '@features/Router/RouteConfig';
import NotFound from '@features/NotFound/NotFound';

const Routes : RoutePathConfig[] = [
  {
    path: '/',
    exact: true,
    component: <NotFound />,
  },
  {
    path: '/dashboard',
    exact: true,
    component: <NotFound />,
  },
  {
    path: '*',
    component: <NotFound />,
  },
];

export default Routes;
