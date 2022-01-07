import React from 'react';
import { RouteGroupConfig } from '@features/Router/RouteConfig';
import NotFound from '@features/NotFound/NotFound';

const HomeRoutes : RouteGroupConfig = {
  path: '',
  default: '/dashboard',
  group: [
    {
      path: '/dashboard',
      component: <NotFound />,
    },
    {
      path: '/apps',
      default: '/app1',
      group: [
        {
          path: '/app1',
          component: <NotFound />,
        },
      ],
    },
  ],
};

export default HomeRoutes;
