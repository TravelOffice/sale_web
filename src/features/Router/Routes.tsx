import React from 'react';
import { RoutePathConfig } from '@features/Router/RouteConfig';
import NotFound from '@features/NotFound/NotFound';
import Chat from '@features/Chat/AppChat';

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
    path: '/apps/chat',
    exact: true,
    appLayout: true,
    className: 'chat-application',
    component: <Chat />,
  },
  {
    path: '*',
    component: <NotFound />,
  },
];

export default Routes;
