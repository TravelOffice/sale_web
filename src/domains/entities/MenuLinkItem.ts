import { ReactNode } from 'react';
import { RequirePermissions } from '@domain/entities/RequirePermissions';

export interface MenuHeader {
  header: string,
}

export interface MenuLinkItem {
  badgeText?: string;
  badge?: string;
  disabled?: boolean;
  id: string,
  title: string,
  icon: ReactNode,
  children?: Array<MenuLinkItem>,
  navLink?: string,
  externalLink?: boolean,
  newTab?: boolean,
  requiredPermissions?: RequirePermissions,
}

export type MenuItem = MenuHeader | MenuLinkItem;
