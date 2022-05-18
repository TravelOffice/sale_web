import React from 'react';
import * as Icon from 'react-feather';
import {
  NavItem,
  NavLink,
} from 'reactstrap';

interface NavbarBookmarksProps {
  setMenuVisibility: (visibility: boolean) => void,
}

// const Icons = new Map(Object.entries(Icon));

const NavbarBookmarks = (props: NavbarBookmarksProps) => {
  const { setMenuVisibility } = props;
  // const [, setValue] = useState('');
  // const [openSearch, setOpenSearch] = useState(false);
  // const dispatch = useDispatch();
  // const store = useSelector((state: RootState) => state.navbar);

  // const renderBookmarks = () => {
  //   if (store.bookmarks.length) {
  //     return store.bookmarks
  //       .map((item) => {
  //         const IconTag : FC<IconProps> = Icons.get(item.icon) || Icon.Mail;
  //         return (
  //           <NavItem key={item.target} className="d-none d-lg-block">
  //             <NavLink tag={Link} to={item.link} id={item.target}>
  //               <IconTag className="ficon" />
  //               <UncontrolledTooltip target={item.target}>{item.title}</UncontrolledTooltip>
  //             </NavLink>
  //           </NavItem>
  //         );
  //       })
  //       .slice(0, 10);
  //   }
  //   return null;
  // };

  // ** If user has more than 10 bookmarks then add the extra Bookmarks to a dropdown
  // const renderExtraBookmarksDropdown = () => {
  //   if (store.bookmarks.length && store.bookmarks.length >= 11) {
  //     return (
  //       <NavItem className="d-none d-lg-block">
  //         <NavLink tag="span">
  //           <UncontrolledDropdown>
  //             <DropdownToggle tag="span">
  //               <Icon.ChevronDown className="ficon" />
  //             </DropdownToggle>
  //             <DropdownMenu end>
  //               {store.bookmarks
  //                 .map((item) => {
  //                   const IconTag : FC<IconProps> = Icons.get(item.icon) || Icon.Mail;
  //                   return (
  //                     <DropdownItem tag={Link} to={item.link} key={item.id}>
  //                       <IconTag className="me-50" size={14} />
  //                       <span className="align-middle">{item.title}</span>
  //                     </DropdownItem>
  //                   );
  //                 })
  //                 .slice(10)}
  //             </DropdownMenu>
  //           </UncontrolledDropdown>
  //         </NavLink>
  //       </NavItem>
  //     );
  //   }
  //   return null;
  // };

  // ** Removes query in store
  // const handleClearQueryInStore = () => dispatch(navbarActions.handleSearchQuery(''));

  // ** Function to handle Bookmarks visibility
  // const handleBookmarkVisibility = () => {
  //   setOpenSearch(!openSearch);
  //   setValue('');
  //   handleClearQueryInStore();
  // };

  return (
    <>
      <ul className="navbar-nav d-xl-none">
        <NavItem className="mobile-menu me-auto">
          <NavLink className="nav-menu-main menu-toggle hidden-xs is-active" onClick={() => setMenuVisibility(true)}>
            <Icon.Menu className="ficon" />
          </NavLink>
        </NavItem>
      </ul>
      {/* <ul className="nav navbar-nav bookmark-icons">
        {renderBookmarks()}
        {renderExtraBookmarksDropdown()}
        <NavItem className="nav-item d-none d-lg-block">
          <NavLink className="bookmark-star" onClick={handleBookmarkVisibility}>
            <Icon.Star className="ficon text-warning" />
          </NavLink>
          <div className={classnames('bookmark-input search-input', { show: openSearch })}>
            <div className="bookmark-input-icon">
              <Icon.Search size={14} />
            </div>
          </div>
        </NavItem>
      </ul> */}
    </>
  );
};

export default NavbarBookmarks;
