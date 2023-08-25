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
  MoreHorizontal,
  Settings,
  Shield,
  ShoppingCart,
  Truck,
  User,
  UserCheck,
  Users,
} from 'react-feather';
import PERMISSIONS from '@utils/PermissionUtils';
import i18n from 'i18next';

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
    title: i18n.t('COMMON.CHAT'),
    icon: <MessageSquare size={20} />,
    requiredPermissions: {
      any: [PERMISSIONS.view_assigned_conversations, PERMISSIONS.view_all_conversations],
    },
    navLink: '/apps/chat',
  },
  {
    id: 'email',
    title: i18n.t('COMMON.EMAIL'),
    icon: <Mail size={20} />,
    navLink: '/apps/email',
  },
  {
    header: 'Businesses',
  },
  {
    id: 'tour',
    title: i18n.t('COMMON.TOUR'),
    requiredPermissions: [PERMISSIONS.get_tour_templates],
    icon: <MapPin size={20} />,
    children: [
      {
        id: 'tour-templates',
        title: i18n.t('COMMON.TOUR_TEMPLATE'),
        requiredPermissions: [PERMISSIONS.get_tour_templates],
        icon: <List size={12} />,
        navLink: '/apps/tours/template/list',
      },
      {
        id: 'tour-departure',
        title: i18n.t('COMMON.TOUR_DEPARTURE'),
        icon: <File size={30} />,
        navLink: '/apps/tours/departure/list',
      },
    ],
  },
  {
    id: 'leads',
    title: 'Lead',
    requiredPermissions: { any: [PERMISSIONS.get_leads, PERMISSIONS.get_my_leads] },
    icon: <User size={12} />,
    navLink: '/apps/leads/list',
  },
  {
    id: 'bookings',
    title: i18n.t('COMMON.BOOKING'),
    requiredPermissions: [PERMISSIONS.get_bookings],
    icon: <ShoppingCart size={12} />,
    navLink: '/apps/bookings/list',
  },
  {
    id: 'tours-operation',
    title: i18n.t('COMMON.TOUR_OPERATION'),
    icon: <Activity />,
    navLink: '/apps/tours-operation',
  },
  {
    id: 'customers',
    title: i18n.t('COMMON.CUSTOMER'),
    icon: <UserCheck size={12} />,
    navLink: '/apps/customers/list',
  },
  {
    id: 'others',
    title: i18n.t('COMMON.OTHERS'),
    icon: <MoreHorizontal size={12} />,
    children: [
      {
        id: 'suppliers',
        title: i18n.t('COMMON.SUPPLIER'),
        requiredPermissions: [PERMISSIONS.get_suppliers],
        icon: <Truck size={12} />,
        navLink: '/apps/suppliers/list',
      },
      {
        id: 'source',
        title: i18n.t('COMMON.SOURCE'),
        icon: <List size={12} />,
        navLink: '/admin/sources',
      },
      {
        id: 'tourLocation',
        title: i18n.t('TOURS_OPERATION.TOUR_LOCATION'),
        icon: <List size={12} />,
        navLink: '/admin/tour-locations',
      },
      {
        id: 'receipt',
        title: i18n.t('COMMON.RECEIPT'),
        icon: <FilePlus size={12} />,
        navLink: '/apps/receipts',
      },
      {
        id: 'payment-voucher',
        title: i18n.t('COMMON.PAYMENT_VOUCHER'),
        icon: <FileMinus size={12} />,
        navLink: '/apps/payment-vouchers',
      },
    ],
  },
  {
    header: i18n.t('COMMON.ADMINISTRATOR'),
  },
  {
    id: 'user',
    title: i18n.t('COMMON.USER'),
    icon: <Users size={20} />,
    requiredPermissions: [PERMISSIONS.view_all_users],
    navLink: '/admin/user/list',
  },
  {
    id: 'roles-permissions',
    title: i18n.t('COMMON.ROLES_PERMISSIONS'),
    requiredPermissions: [PERMISSIONS.get_roles],
    icon: <Shield size={20} />,
    navLink: '/apps/admin/roles',
  },
  {
    id: 'settings',
    title: i18n.t('COMMON.SETTING'),
    icon: <Settings size={12} />,
    navLink: '/apps/account-settings',
  },
];

export default Navigation;
