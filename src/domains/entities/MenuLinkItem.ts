import { ReactNode } from 'react';

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
}

export type MenuItem = MenuHeader | MenuLinkItem;
