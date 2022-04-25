import { MenuItem } from '@domain/entities/MenuLinkItem';
import React from 'react';
import {
  Activity, Home, MessageSquare, Settings, ShoppingCart, User,
} from 'react-feather';

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
    header: 'Apps & Pages',
  },
  {
    id: 'chat',
    title: 'Chat',
    icon: <MessageSquare size={20} />,
    navLink: '/apps/chat',
  },
  {
    id: 'settings',
    title: 'Setting',
    icon: <Settings size={12} />,
    navLink: '/settings',
  },
  {
    id: 'leads',
    title: 'Lead',
    icon: <User size={12} />,
    navLink: '/apps/lead/list',
  },
];

export default Navigation;
