import React, { useEffect } from 'react';
import { MenuLinkItem } from '@domain/entities/MenuLinkItem';
import { useTranslation } from 'react-i18next';
import { useLocation, Link } from 'react-router-dom';
import { hasActiveChild, removeChildren } from '@utils/MenuItemUtils';
import classnames from 'classnames';
import { Badge, Collapse } from 'reactstrap';
import VerticalNavMenuLink from '@components/Sidebar/VerticalNavMenuLink';

export interface VerticalNavMenuGroupProps {
  item: MenuLinkItem,
  groupOpen: string[],
  menuHover: boolean,
  activeItem?: string,
  parentItem?: MenuLinkItem,
  routerProps: any,
  groupActive: string[],
  currentActiveGroup: string[],
  setGroupOpen: (groupOpen: string[]) => void,
  setActiveItem: (activeItem: string) => void,
  menuCollapsed: boolean,
  setGroupActive: (groupActive: string[]) => void,
  setCurrentActiveGroup: (group: string[]) => void,
  currentActiveItem: string,
}

function VerticalNavMenuGroup(props: VerticalNavMenuGroupProps) {
  const {
    item,
    groupOpen,
    menuHover,
    activeItem,
    parentItem,
    routerProps,
    groupActive,
    currentActiveGroup,
    setGroupOpen,
    setActiveItem,
    menuCollapsed,
    setGroupActive,
    setCurrentActiveGroup,
    currentActiveItem,
    ...rest
  } = props;
  const { t } = useTranslation();
  const location = useLocation();
  const currentURL = location.pathname;
  const toggleOpenGroup = (menuItem: MenuLinkItem, parent?: MenuLinkItem) => {
    let openGroup = groupOpen;
    const activeGroup = groupActive;

    //  If Group is already open and clicked, close the group
    if (openGroup.includes(item.id)) {
      openGroup.splice(openGroup.indexOf(item.id), 1);

      //  If clicked Group has open group children, Also remove those children to close those groups
      if (item.children) {
        removeChildren(item.children, openGroup, groupActive);
      }
    } else if (activeGroup.includes(item.id) || currentActiveGroup.includes(item.id)) {
      //  If Group clicked is Active Group

      //  If Active group is closed and clicked again, we should open active group else
      //  close active group
      if (!activeGroup.includes(item.id) && currentActiveGroup.includes(item.id)) {
        activeGroup.push(item.id);
      } else {
        activeGroup.splice(activeGroup.indexOf(item.id), 1);
      }

      //  Update Active Group
      setGroupActive([...activeGroup]);
    } else if (parent) {
      // If Group clicked is the child of a open group, first remove
      // all the open groups under that parent
      if (parent.children) {
        removeChildren(parent.children, openGroup, groupActive);
      }

      //  After removing all the open groups under that parent, add the clicked
      //  group to open group array
      if (!openGroup.includes(item.id)) {
        openGroup.push(item.id);
      }
    } else {
      //  If clicked on another group that is not active or open, create
      //  openGroup array from scratch

      //  Empty Open Group array
      openGroup = [];

      //  Push current clicked group item to Open Group array
      if (!openGroup.includes(item.id)) {
        openGroup.push(item.id);
      }
    }
    setGroupOpen([...openGroup]);
  };

  const onCollapseClick = (menuItem: MenuLinkItem) => {
    toggleOpenGroup(menuItem, parentItem);
  };

  useEffect(() => {
    if (hasActiveChild(item, currentURL)) {
      if (!groupActive.includes(item.id)) groupActive.push(item.id);
    } else {
      const index = groupActive.indexOf(item.id);
      if (index > -1) groupActive.splice(index, 1);
    }
    setGroupActive([...groupActive]);
    setCurrentActiveGroup([...groupActive]);
    setGroupOpen([]);
  }, [location]);

  const openClassCondition = (id: string) => {
    if ((menuCollapsed && menuHover) || !menuCollapsed) {
      if (groupActive.includes(id) || groupOpen.includes(id)) {
        return true;
      }
    } else if (groupActive.includes(id) && menuCollapsed && !menuHover) {
      return false;
    }
    return false;
  };

  const isGroupActive = groupActive.includes(item.id)
    || groupOpen.includes(item.id) || currentActiveGroup.includes(item.id);

  const isOpen = (groupActive && groupActive.includes(item.id))
    || (groupOpen && groupOpen.includes(item.id));

  return (
    <li
      className={classnames('nav-item has-sub', {
        open: openClassCondition(item.id),
        'menu-collapsed-open': groupActive.includes(item.id),
        'sidebar-group-active': isGroupActive,
      })}
    >
      <Link
        className="d-flex align-items-center"
        to="/"
        onClick={(e) => {
          onCollapseClick(item);
          e.preventDefault();
        }}
      >
        {item.icon}
        <span className="menu-title text-truncate">{item.title}</span>

        {item.badge && item.badgeText ? (
          <Badge className="ms-auto me-1" color={item.badge} pill>
            {item.badgeText}
          </Badge>
        ) : null}
      </Link>

      {/* Render Child Recursively Through VerticalNavMenuItems Component */}
      <ul className="menu-content">
        <Collapse isOpen={isOpen}>
          {
            item.children?.map((child) => {
              if (child.children) {
                return (
                  <VerticalNavMenuGroup
                    key={child.id}
                    {...props}
                    item={child}
                  />
                );
              }
              return (
                <VerticalNavMenuLink
                  key={child.id}
                  {...props}
                  item={child}
                />
              );
            })
          }
        </Collapse>
      </ul>
    </li>
  );
}

VerticalNavMenuGroup.defaultProps = {

};

export default VerticalNavMenuGroup;
