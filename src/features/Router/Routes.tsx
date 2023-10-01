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
import BookingListPage from '@features/Booking/BookingListPage';
import TourTemplateCreatePage from '@features/Tour/Template/TourTemplateCreatePage';
import BookingCreatePage from '@features/Booking/BookingCreatePage';
import TourTemplateEditPage from '@features/Tour/Template/TourTemplateEditPage';
import ReceiptListPage from '@features/Receipt/ReceiptListPage';
import BookingDetail from '@features/Booking/BookingDetailPage';
import BookingCreateFromLeadPage from '@features/Booking/BookingCreateFromLeadPage';
import SupplierListPage from '@features/Supplier/SupplierListPage';
import ToursOperationMain from '@features/ToursOperation/ToursOperationMain';
import SupplierCreatePage from '@features/Supplier/SupplierCreatePage';
import PaymentVoucherListPage from '@features/PaymentVoucher/PaymentVoucherListPage';
import SupplierEditPage from '@features/Supplier/SupplierEditPage';
import DepartureTourListPage from '@features/Tour/Departure/DepartureTourListPage';
import DepartureTourCreatePage from '@features/Tour/Departure/DepartureTourCreatePage';
import DepartureTourEditPage from '@features/Tour/Departure/DepartureTourEditPage';
import ToursOperationDetail from '@features/ToursOperation/ToursOperationDetail';
import EstimationPage from '@features/ToursOperation/Estimation/EstimationPage';
import SourceListPage from '@features/Source/SourceListPage';
import TourLocationListPage from '@features/TourLocation/TourLocationListPage';
import UserDetail from '@features/User/UserDetail';
import ManagerDashboard from '@features/Dashboard/ManagerDashboard/ManagerDashboard';
import MyDashboard from '@features/Dashboard/MyDashboard/MyDashboard';

const Routes: RoutePathConfig[] = [
  {
    path: '/',
    exact: true,
    component: <MyDashboard />,
  },
  {
    path: '/apps/dashboards/my-dashboard',
    exact: true,
    component: <MyDashboard />,
  },
  {
    path: '/apps/dashboards/manager-dashboard',
    exact: true,
    component: <ManagerDashboard />,
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
    path: '/apps/tours/template/list',
    exact: true,
    requiredPermissions: [PERMISSIONS.get_tour_templates],
    component: <TourTemplateListPage />,
  },
  {
    path: '/apps/tours/template/create',
    exact: true,
    requiredPermissions: [PERMISSIONS.create_tour_template],
    component: <TourTemplateCreatePage />,
  },
  {
    path: '/apps/tours/template/:tourTemplateId/edit',
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
    path: '/apps/bookings/:bookingId/edit',
    exact: true,
    requiredPermissions: [PERMISSIONS.get_bookings],
    component: <BookingDetail />,
  },
  {
    path: '/apps/customers/list',
    exact: true,
    requiredPermissions: [PERMISSIONS.get_customers],
    component: <CustomerListPage />,
  },
  {
    path: '/apps/customers/create',
    component: <CreateCustomerPage />,
  },
  {
    path: '/apps/customers/:customerId/edit',
    component: <EditCustomerPage />,
  },
  {
    path: '/apps/customers/:customerId/leads/create',
    component: <CreateLeadPage />,
  },
  {
    path: '/admin/user/list',
    exact: true,
    requiredPermissions: [PERMISSIONS.view_all_users],
    component: <UserList />,
  },
  {
    path: '/apps/user/view/:userId',
    exact: true,
    requiredPermissions: [PERMISSIONS.view_all_users],
    component: <UserDetail />,
  },
  {
    path: '/apps/admin/roles',
    exact: true,
    requiredPermissions: [PERMISSIONS.get_roles],
    component: <Roles />,
  },
  {
    path: '/apps/tours/departure/list',
    exact: true,
    component: <DepartureTourListPage />,
  },
  {
    path: '/apps/tours/departure/create',
    exact: true,
    component: <DepartureTourCreatePage />,
  },
  {
    path: '/apps/tours/departure/:tourId/edit',
    exact: true,
    requiredPermissions: [PERMISSIONS.update_tour_template],
    component: <DepartureTourEditPage />,
  },
  {
    path: '/apps/receipts',
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
    path: '/apps/suppliers/create',
    exact: true,
    requiredPermissions: [PERMISSIONS.create_supplier],
    component: <SupplierCreatePage />,
  },
  {
    path: '/apps/suppliers/:supplierId/edit',
    exact: true,
    requiredPermissions: [PERMISSIONS.update_supplier],
    component: <SupplierEditPage />,
  },
  {
    path: '/apps/tours-operation',
    exact: true,
    component: <ToursOperationMain />,
  },
  {
    path: '/apps/tours-operation/:tourId/operate',
    exact: true,
    component: <ToursOperationDetail />,
  },
  {
    path: '/apps/tours-operation/:tourId/estimations',
    exact: true,
    component: <EstimationPage />,
  },
  {
    path: '/apps/payment-vouchers',
    exact: true,
    component: <PaymentVoucherListPage />,
  },
  {
    path: '/admin/sources',
    component: <SourceListPage />,
  },
  {
    path: '/admin/tour-locations',
    component: <TourLocationListPage />,
  },
  {
    path: '*',
    component: <NotFound />,
  },
];

export default Routes;
