import React, { useEffect } from 'react';
import { Circle, Disc, X } from 'react-feather';
import { NavLink } from 'reactstrap';
import Images from '@themes/Images';
import appConfig from '@config/AppConfig';

export interface VerticalMenuHeaderProps {
  menuCollapsed?: boolean,
  setMenuCollapsed?: (menuCollapsed: boolean) => void,
  setMenuVisibility?: (visibility: boolean) => void,
  setGroupOpen?: (groupOpen: string[]) => void,
  menuHover?: boolean,
}

function renderToggle(menuCollapsed?: boolean, setMenuCollapsed?: (collapsed: boolean) => void) {
  if (!menuCollapsed) {
    return (
      <Disc
        size={20}
        data-tour="toggle-icon"
        className="text-primary toggle-icon d-none d-xl-block"
        onClick={() => setMenuCollapsed?.(true)}
      />
    );
  }
  return (
    <Circle
      size={20}
      data-tour="toggle-icon"
      className="text-primary toggle-icon d-none d-xl-block"
      onClick={() => setMenuCollapsed?.(false)}
    />
  );
}

function VerticalMenuHeader(props: VerticalMenuHeaderProps) {
  const {
    menuCollapsed, setMenuCollapsed, setMenuVisibility, setGroupOpen, menuHover,
  } = props;
  useEffect(() => {
    if (!menuHover && menuCollapsed && setGroupOpen) setGroupOpen([]);
  }, [menuHover, menuCollapsed]);
  return (
    <div className="navbar-header">
      <ul className="nav navbar-nav flex-row">
        <li className="nav-item me-auto">
          <NavLink to="/" className="navbar-brand">
            <span className="brand-logo">
              <img src={Images.appLogo} alt="logo" />
            </span>
            <h2 className="brand-text mb-0">{appConfig.appName}</h2>
          </NavLink>
        </li>
        <li className="nav-item nav-toggle">
          <div className="nav-link modern-nav-toggle cursor-pointer">
            {renderToggle(menuCollapsed, setMenuCollapsed)}
            <X onClick={() => setMenuVisibility?.(false)} className="toggle-icon icon-x d-block d-xl-none" size={20} />
          </div>
        </li>
      </ul>
    </div>
  );
}

VerticalMenuHeader.defaultProps = {
  menuCollapsed: false,
  setGroupOpen: undefined,
  setMenuVisibility: undefined,
};

export default VerticalMenuHeader;
