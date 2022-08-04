import React from 'react';
import { MenuHeader, MenuItem, MenuLinkItem } from '@domain/entities/MenuLinkItem';
import VerticalNavMenuGroup from '@components/Sidebar/VerticalNavMenuGroup';
import VerticalNavMenuLink from '@components/Sidebar/VerticalNavMenuLink';
import VerticalNavMenuSectionHeader from '@components/Sidebar/VerticalNavMenuSectionHeader';
import { useAccessControl } from '@hooks/auth';

export interface VerticalMenuNavItemsProps {
  items: MenuItem[],
  menuData: MenuItem[]
  menuHover: boolean,
  activeItem?: string,
  parentItem?: MenuItem,
  routerProps: any,
  groupActive: string[],
  currentActiveGroup: string[],
  setGroupOpen: (groupOpen: string[]) => void,
  setActiveItem: (activeItem: string) => void,
  menuCollapsed: boolean,
  setGroupActive: (groupActive: string[]) => void,
  setCurrentActiveGroup: (group: string[]) => void,
  currentActiveItem: string,
  groupOpen: string[],
}

export default function VerticalMenuNavItems(props: VerticalMenuNavItemsProps) {
  const { items, parentItem } = props;
  const { canAccess } = useAccessControl();
  return (
    <>
      {items.map((item) => {
        const menuHeader = item as MenuHeader;
        // Render if the item is a header
        if (menuHeader.header) {
          return <VerticalNavMenuSectionHeader key={menuHeader.header} item={menuHeader} />;
        }

        // Render if the item is a group item
        const menuItem = item as MenuLinkItem;
        if (menuItem.requiredPermissions && !canAccess(menuItem.requiredPermissions)) {
          return <></>;
        }
        if (menuItem.children) {
          return (
            <VerticalNavMenuGroup
              {...props}
              item={menuItem}
              key={menuItem.id}
              parentItem={parentItem as MenuLinkItem}
            />
          );
        }

        // Render if the item just is a menu item
        return (
          <VerticalNavMenuLink
            key={menuItem.id}
            item={menuItem}
            {...props}
          />
        );
      })}
    </>
  );
}
