import React, { useEffect } from 'react';
import { MenuLinkItem } from '@domain/entities/MenuLinkItem';
import { useLocation, NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { Badge } from 'reactstrap';
import { useTranslation } from 'react-i18next';

export interface VerticalNavMenuLinkProps {
  item: MenuLinkItem,
  activeItem?: string,
  setActiveItem: (item: string) => void,
  currentActiveItem?: string
}

function renderLink(item: MenuLinkItem) {
  const { t } = useTranslation();

  if (item.externalLink) {
    return (
      <a href={item.navLink || '/'}>
        {item.badge && item.badgeText ? (
          <Badge className="ms-auto me-1" color={item.badge} pill>
            {item.badgeText}
          </Badge>
        ) : null}
      </a>
    );
  }
  return (
    <NavLink
      to={item.navLink || '/'}
      isActive={(match) => {
        if (!match) {
          return false;
        }
        // if (
        //                   match.url &&
        //                   match.url !== '' &&
        //                   match.url === item.navLink
        //                 ) {
        //                   currentActiveItem = item.navLink
        //                 }
        return true;
      }}
    >
      {item.icon}
      <span className="menu-item text-truncate">{t(item.title)}</span>
      {item.badge && item.badgeText ? (
        <Badge className="ms-auto me-1" color={item.badge} pill>
          {item.badgeText}
        </Badge>
      ) : null}
    </NavLink>
  );
}

export default function VerticalNavMenuLink(props: VerticalNavMenuLinkProps) {
  const {
    item,
    activeItem,
    setActiveItem,
    currentActiveItem,
  } = props;
  const location = useLocation();

  useEffect(() => {
    if (currentActiveItem) {
      setActiveItem(currentActiveItem);
    }
  }, [location]);
  return (
    <li
      className={classnames({
        'nav-item': !item.children,
        disabled: item.disabled,
        active: item.navLink === activeItem,
      })}
    >
      {renderLink(item)}
    </li>
  );
}
