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
import CreateCustomerPage from '@features/Customer/CreateCustomerPage';
import EditCustomerPage from '@features/Customer/CustomerDetailPage';
import TourTemplateListPage from '@features/Tour/Template/TourTemplateListPage';
import CreateDepartureTour from '@features/Tour/Departure/CreateDepartureTour';
import BookingListPage from '@features/Booking/BookingListPage';
import TourTemplateCreatePage from '@features/Tour/Template/TourTemplateCreatePage';
import BookingCreatePage from '@features/Booking/BookingCreatePage';
import TourTemplateEditPage from '@features/Tour/Template/TourTemplateEditPage';
import ReceiptListPage from '@features/Receipt/ReceiptListPage';
import BookingCreateFromLeadPage from '@features/Booking/BookingCreateFromLeadPage';
import SupplierListPage from '@features/Supplier/SupplierListPage';

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
    path: '/apps/tour-templates/list',
    exact: true,
    requiredPermissions: [PERMISSIONS.get_tour_templates],
    component: <TourTemplateListPage />,
  },
  {
    path: '/apps/tour-templates/create',
    exact: true,
    requiredPermissions: [PERMISSIONS.create_tour_template],
    component: <TourTemplateCreatePage />,
  },
  {
    path: '/apps/tour-templates/:tourTemplateId/edit',
    exact: true,
    requiredPermissions: [PERMISSIONS.update_tour_template],
    component: <TourTemplateEditPage />,
  },
  {
    path: '/apps/leads/list',
    exact: true,
    requiredPermissions: { any: [PERMISSIONS.get_leads, PERMISSIONS.get_my_leads] },
    component: <LeadListPage />,
  },
  {
    path: '/apps/leads/create',
    component: <CreateLeadPage />,
  },
  {
    path: '/apps/leads/:leadId/edit',
    component: <EditLeadPage />,
  },
  {
    path: '/apps/bookings/list',
    exact: true,
    requiredPermissions: [PERMISSIONS.get_bookings],
    component: <BookingListPage />,
  },
  {
    path: '/apps/bookings/create',
    exact: true,
    requiredPermissions: [PERMISSIONS.create_booking],
    component: <BookingCreatePage />,
  },
  {
    path: '/apps/bookings/create-from-lead',
    exact: true,
    requiredPermissions: [PERMISSIONS.create_booking],
    component: <BookingCreateFromLeadPage />,
  },
  {
    path: '/apps/customer/list',
    exact: true,
    requiredPermissions: [PERMISSIONS.get_customers],
    component: <CustomerListPage />,
  },
  {
    path: '/apps/customer/create',
    component: <CreateCustomerPage />,
  },
  {
    path: '/apps/customer/:customerId/edit',
    component: <EditCustomerPage />,
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
    path: '/apps/tour/departure',
    exact: true,
    component: <CreateDepartureTour />,
  },
  {
    path: '/apps/receipt',
    exact: true,
    component: <ReceiptListPage />,
  },
  {
    path: '/apps/suppliers/list',
    exact: true,
    requiredPermissions: [PERMISSIONS.get_suppliers],
    component: <SupplierListPage />,
  },
  {
    path: '*',
    component: <NotFound />,
  },
];

export default Routes;
