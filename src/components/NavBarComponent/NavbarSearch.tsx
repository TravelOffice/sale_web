import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import * as Icon from 'react-feather';
import { NavItem, NavLink } from 'reactstrap';

const NavbarSearch = () => {
  const [navbarSearch, setNavbarSearch] = useState(false);

  useEffect(() => {

  }, []);

  return (
    <NavItem className="nav-search" onClick={() => setNavbarSearch(true)}>
      <NavLink className="nav-link-search">
        <Icon.Search className="ficon" />
      </NavLink>
      <div
        className={classnames('search-input', {
          open: navbarSearch,
        })}
      >
        <div className="search-input-icon">
          <Icon.Search />
        </div>
        <div className="search-input-close">
          <Icon.X
            className="ficon"
            onClick={(e) => {
              e.stopPropagation();
              setNavbarSearch(false);
            }}
          />
        </div>
      </div>
    </NavItem>
  );
};

export default NavbarSearch;
