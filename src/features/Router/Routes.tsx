import Chat from '@features/Chat/AppChat';
import NotFound from '@features/NotFound/NotFound';
import { RoutePathConfig } from '@features/Router/RouteConfig';
import Settings from '@features/Settings/Settings';
import React from 'react';
import UserList from '@features/User/UserList';
import Roles from '@features/Roles-Permissions/Roles/Role';
import PERMISSIONS from '@utils/PermissionUtils';
import AppMail from '@features/Mail/AppMail';
import LeadListPage from '@features/Lead/LeadListPage';
import CreateLeadPage from '@features/Lead/CreateLeadPage';
import EditLeadPage from '@features/Lead/EditLeadPage';
import CustomerListPage from '@features/Customer/CustomerListPage';

const Routes: RoutePathConfig[] = [
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
    requiredPermissions: {
      any: [PERMISSIONS.view_assigned_conversations, PERMISSIONS.view_all_conversations],
    },
    component: <Chat />,
  },
  {
    path: '/apps/email',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: <AppMail />,
  },
  {
    path: '/apps/account-settings',
    component: <Settings />,
  },
  {
    path: '/apps/lead/list',
    exact: true,
    requiredPermissions: { any: [PERMISSIONS.get_leads, PERMISSIONS.get_my_leads] },
    component: <LeadListPage />,
  },
  {
    path: '/apps/booking/list',
    exact: true,
    requiredPermissions: [PERMISSIONS.get_leads],
    component: <LeadListPage />,
  },
  {
    path: '/apps/lead/create',
    component: <CreateLeadPage />,
  },
  {
    path: '/apps/lead/:leadId/edit',
    component: <EditLeadPage />,
  },
  {
    path: '/apps/customer/list',
    exact: true,
    requiredPermissions: [PERMISSIONS.get_customers],
    component: <CustomerListPage />,
  },
  {
    path: '/admin/user/list',
    exact: true,
    requiredPermissions: [PERMISSIONS.view_all_users],
    component: <UserList />,
  },
  {
    path: '/apps/admin/roles',
    exact: true,
    requiredPermissions: [PERMISSIONS.get_roles],
    component: <Roles />,
  },
  {
    path: '*',
    component: <NotFound />,
  },
];

export default Routes;
