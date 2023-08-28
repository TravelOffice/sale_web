import React from 'react';
import { Moon, Sun } from 'react-feather';
import { NavItem, NavLink } from 'reactstrap';
import IntlDropdown from './IntlDropdown';
import UserDropdown from './UserDropdown';
import NotificationDropdown from './NotificationDropdown';

interface NavbarUserProps {
  skin: string,
  setSkin: (skin: string) => void,
}

const NavbarUser = (props: NavbarUserProps) => {
  const { skin, setSkin } = props;

  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className="ficon" onClick={() => setSkin('light')} />;
    }
    return <Moon className="ficon" onClick={() => setSkin('dark')} />;
  };

  return (
    <ul className="nav navbar-nav align-items-center ms-auto">
      <IntlDropdown />
      <NavItem className="d-none d-lg-block">
        <NavLink className="nav-link-style">
          <ThemeToggler />
        </NavLink>
      </NavItem>
      <NotificationDropdown />
      <UserDropdown />
    </ul>
  );
};
export default NavbarUser;
