import { MenuItem } from '@domain/entities/MenuLinkItem';
import React from 'react';
import {
  Activity,
  File,
  FileMinus,
  FilePlus,
  Home,
  List,
  Mail,
  MapPin,
  MessageSquare,
  Settings,
  Shield,
  ShoppingCart,
  Truck,
  User,
  UserCheck,
  Users,
} from 'react-feather';
import PERMISSIONS from '@utils/PermissionUtils';

const Navigation: MenuItem[] = [
  {
    id: 'dashboards',
    title: 'Dashboards',
    icon: <Home />,
    navLink: '/apps/dashboard',
  },
  {
    header: 'Communication',
  },
  {
    id: 'chat',
    title: 'Chat',
    icon: <MessageSquare size={20} />,
    requiredPermissions: {
      any: [PERMISSIONS.view_assigned_conversations, PERMISSIONS.view_all_conversations],
    },
    navLink: '/apps/chat',
  },
  {
    id: 'email',
    title: 'Email',
    icon: <Mail size={20} />,
    navLink: '/apps/email',
  },
  {
    header: 'Businesses',
  },
  {
    id: 'tour',
    title: 'Tour',
    requiredPermissions: [PERMISSIONS.get_tour_templates],
    icon: <MapPin size={20} />,
    children: [
      {
        id: 'tour-templates',
        title: 'Tour Template',
        requiredPermissions: [PERMISSIONS.get_tour_templates],
        icon: <List size={12} />,
        navLink: '/apps/tours/template/list',
      },
      {
        id: 'tour-departure',
        title: 'Tour Departure',
        icon: <File size={30} />,
        navLink: '/apps/tours/departure/list',
      },
    ],
  },
  {
    id: 'receipt',
    title: 'Receipt',
    icon: <FilePlus size={12} />,
    navLink: '/apps/receipts',
  },
  {
    id: 'payment-voucher',
    title: 'Payment Voucher',
    icon: <FileMinus size={12} />,
    navLink: '/apps/payment-vouchers',
  },
  {
    id: 'leads',
    title: 'Lead',
    requiredPermissions: { any: [PERMISSIONS.get_leads, PERMISSIONS.get_my_leads] },
    icon: <User size={12} />,
    navLink: '/apps/leads/list',
  },
  {
    id: 'customers',
    title: 'Customer',
    icon: <UserCheck size={12} />,
    navLink: '/apps/customers/list',
  },
  {
    id: 'bookings',
    title: 'Booking',
    requiredPermissions: [PERMISSIONS.get_bookings],
    icon: <ShoppingCart size={12} />,
    navLink: '/apps/bookings/list',
  },
  {
    id: 'suppliers',
    title: 'Supplier',
    requiredPermissions: [PERMISSIONS.get_suppliers],
    icon: <Truck size={12} />,
    navLink: '/apps/suppliers/list',
  },
  {
    id: 'tours-operation',
    title: 'Tours Operation',
    icon: <Activity />,
    navLink: '/apps/tours-operation',
  },
  {
    header: 'Administrators',
  },
  {
    id: 'user',
    title: 'User',
    icon: <Users size={20} />,
    requiredPermissions: [PERMISSIONS.view_all_users],
    navLink: '/admin/user/list',
  },
  {
    id: 'roles-permissions',
    title: 'Roles & Permissions',
    requiredPermissions: [PERMISSIONS.get_roles],
    icon: <Shield size={20} />,
    navLink: '/apps/admin/roles',
  },
  {
    id: 'settings',
    title: 'Setting',
    icon: <Settings size={12} />,
    navLink: '/apps/account-settings',
  },
];

export default Navigation;
