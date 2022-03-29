import React from 'react';
import { RoutePathConfig } from '@features/Router/RouteConfig';
import NotFound from '@features/NotFound/NotFound';
import Chat from '@features/Chat/AppChat';
import Settings from '@features/Settings/Settings';

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
    path: '/settings',
    component: <Settings />,
  },
  {
    path: '*',
    component: <NotFound />,
  },
];

export default Routes;
