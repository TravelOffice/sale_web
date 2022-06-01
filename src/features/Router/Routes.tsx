import Chat from '@features/Chat/AppChat';
import LeadList from '@features/Lead/LeadList';
import NotFound from '@features/NotFound/NotFound';
import OpportunitiesList from '@features/Opportunity/OpportunitiesList';
import { RoutePathConfig } from '@features/Router/RouteConfig';
import Settings from '@features/Settings/Settings';
import React from 'react';
import CustomerList from '@features/Customer/CustomerList';
import LeadDetail from '@features/Lead/LeadDetail/LeadDetail';

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
    path: '/apps/lead/list',
    exact: true,
    component: <LeadList />,
  },
  {
    path: '/apps/lead/:leadId',
    exact: true,
    component: <LeadDetail />,
  },
  {
    path: '/apps/opp/list',
    exact: true,
    component: <OpportunitiesList />,
  },
  {
    path: '/apps/customer/list',
    exact: true,
    component: <CustomerList />,
  },
  {
    path: '*',
    component: <NotFound />,
  },
];

export default Routes;
