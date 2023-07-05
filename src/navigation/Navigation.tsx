import { MenuItem } from '@domain/entities/MenuLinkItem';
import React from 'react';
import {
  Activity, Home, Mail,
  MessageSquare, Settings, Shield,
  ShoppingCart, User, UserCheck, Users,
} from 'react-feather';
import PERMISSIONS from '@utils/PermissionUtils';

const Navigation : MenuItem[] = [
  {
    id: 'dashboards',
    title: 'Dashboards',
    icon: <Home />,
    children: [
      {
        id: 'analyticsDash',
        title: 'Analytics',
        icon: <Activity />,
        navLink: '/dashboard/analytics',
      },
      {
        id: 'eCommerceDash',
        title: 'eCommerce',
        icon: <ShoppingCart />,
        navLink: '/dashboard/ecommerce',
      },
    ],
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
    id: 'customers',
    title: 'Customer',
    icon: <UserCheck size={12} />,
    navLink: '/apps/customer/list',
  },
  {
    id: 'leads',
    title: 'Lead',
    requiredPermissions: { any: [PERMISSIONS.get_leads, PERMISSIONS.get_my_leads] },
    icon: <User size={12} />,
    navLink: '/apps/lead/list',
  },
  {
    id: 'bookings',
    title: 'Booking',
    requiredPermissions: [PERMISSIONS.get_bookings],
    icon: <ShoppingCart size={12} />,
    navLink: '/apps/booking/list',
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
