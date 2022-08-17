import Chat from '@features/Chat/AppChat';
import LeadList from '@features/Lead/LeadList';
import NotFound from '@features/NotFound/NotFound';
import OpportunitiesList from '@features/Opportunity/OpportunitiesList';
import { RoutePathConfig } from '@features/Router/RouteConfig';
import Settings from '@features/Settings/Settings';
import React from 'react';
import CustomerList from '@features/Customer/CustomerList';
import LeadDetail from '@features/Lead/LeadDetail/LeadDetail';
import OpportunityDetail from '@features/Opportunity/OpportunityDetail/OpportunityDetail';
import UserList from '@features/User/UserList';

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
    path: '/apps/account-settings',
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
    path: '/apps/lead/:leadId/opp/:oppId',
    exact: true,
    component: <OpportunityDetail />,
  },
  {
    path: '/apps/customer/list',
    exact: true,
    component: <CustomerList />,
  },
  {
    path: '/admin/user/list',
    exact: true,
    component: <UserList />,
  },
  {
    path: '*',
    component: <NotFound />,
  },
];

export default Routes;
