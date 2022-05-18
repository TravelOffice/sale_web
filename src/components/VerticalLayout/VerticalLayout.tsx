import React, { useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { ArrowUp } from 'react-feather';
import { Navbar, Button } from 'reactstrap';
import ScrollToTop from '@components/ScrollToTop/ScrollToTop';
import FooterComponent from '@components/FooterComponent/FooterComponent';
import {
  useFooterType, useNavbarColor, useNavbarType, useSkin,
} from '@hooks/layout';
import '@styles/base/core/menu/menu-types/vertical-menu.scss';
import '@styles/base/core/menu/menu-types/vertical-overlay-menu.scss';
import { RootState } from '@redux/store';
import { layoutActions } from '@redux/slices/layoutSlice';
import Sidebar from '@components/Sidebar/Sidebar';
import NavbarComponent from '@components/NavBarComponent/NavBarComponent';
import { MenuItem } from '@domain/entities/MenuLinkItem';
import defaultLayoutConfig from '../../config/LayoutConfig';

interface VerticalLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  navbar?: ReactNode,
  menuData: MenuItem[],
  footer?: ReactNode,
  menu?: ReactNode,
  currentActiveItem: any,
  routerProps?: any,
}

function VerticalLayout(props: VerticalLayoutProps) {
  const {
    menu,
    navbar,
    footer,
    menuData,
    children,
    routerProps,
    currentActiveItem,
  } = props;
  const { skin, setSkin } = useSkin();
  const { navbarType } = useNavbarType();
  const { footerType } = useFooterType();
  const { navbarColor } = useNavbarColor();
  const [isMounted, setIsMounted] = useState(false);
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const layoutStore = useSelector((state: RootState) => state.layout);
  const handleWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };
  const location = useLocation();
  const { contentWidth } = layoutStore;
  const { menuCollapsed } = layoutStore;
  const isHidden = layoutStore.menuHidden;
  const setMenuCollapsed = (val: boolean) => dispatch(layoutActions.handleMenuCollapsed(val));
  // const setContentWidth = (
  //   val: LayoutContentWidth,
  // ) => dispatch(layoutActions.handleContentWidth(val));
  // const setIsHidden = (val: boolean) => dispatch(layoutActions.handleMenuHidden(val));
  useEffect(() => {
    if (menuVisibility && windowWidth < 1200) {
      setMenuVisibility(false);
    }
  }, [location]);
  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener('resize', handleWindowWidth);
    }
  }, [windowWidth]);
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  const footerClasses = {
    static: 'footer-static',
    sticky: 'footer-fixed',
    hidden: 'footer-hidden',
  };

  const navbarWrapperClasses = {
    floating: 'navbar-floating',
    sticky: 'navbar-sticky',
    static: 'navbar-static',
    hidden: 'navbar-hidden',
  };
  const navbarClasses = {
    floating:
      contentWidth === 'boxed' ? 'floating-nav container-xxl' : 'floating-nav',
    sticky: 'fixed-top',
    static: 'navbar-static-top',
    hidden: 'd-none',
  };

  const bgColorCondition = navbarColor !== '' && navbarColor !== 'light' && navbarColor !== 'white';
  if (!isMounted) {
    return null;
  }
  return (
    <div
      className={classnames(
        `wrapper vertical-layout ${
          navbarWrapperClasses[navbarType] || 'navbar-floating'
        } ${footerClasses[footerType] || 'footer-static'}`,
        {
          // Modern Menu
          'vertical-menu-modern': windowWidth >= 1200,
          'menu-collapsed': menuCollapsed && windowWidth >= 1200,
          'menu-expanded': !menuCollapsed && windowWidth > 1200,

          // Overlay Menu
          'vertical-overlay-menu': windowWidth < 1200,
          'menu-hide': !menuVisibility && windowWidth < 1200,
          'menu-open': menuVisibility && windowWidth < 1200,
        },
      )}
      {...(isHidden ? { 'data-col': '1-column' } : {})}
    >
      {!isHidden ? (
        <Sidebar
          skin={skin}
          menu={menu}
          menuData={menuData}
          routerProps={routerProps}
          menuCollapsed={menuCollapsed}
          menuVisibility={menuVisibility}
          setMenuCollapsed={setMenuCollapsed}
          setMenuVisibility={setMenuVisibility}
          currentActiveItem={currentActiveItem}
        />
      ) : null}
      <Navbar
        expand="lg"
        container={false}
        light={skin !== 'dark'}
        dark={skin === 'dark' || bgColorCondition}
        color={bgColorCondition ? navbarColor : undefined}
        className={classnames(
          `header-navbar navbar align-items-center ${
            navbarClasses[navbarType] || 'floating-nav'
          } navbar-shadow`,
        )}
      >
        <div className="navbar-container d-flex content">
          {navbar || (
            <NavbarComponent
              setMenuVisibility={setMenuVisibility}
              skin={skin}
              setSkin={setSkin}
            />
          )}
        </div>
      </Navbar>
      {children}

      {/* Vertical Nav Menu Overlay */}
      <div
        className={classnames('sidenav-overlay', {
          show: menuVisibility,
        })}
        onClick={() => setMenuVisibility(false)}
      />
      {/* Vertical Nav Menu Overlay */}
      <footer
        className={classnames(
          `footer footer-light ${footerClasses[footerType] || 'footer-static'}`,
          {
            'd-none': footerType === 'hidden',
          },
        )}
      >
        {footer || (
          <FooterComponent />
        )}
      </footer>

      {defaultLayoutConfig.scrollTop ? (
        <div className="scroll-to-top">
          <ScrollToTop showOffset={300} className="scroll-top d-block">
            <Button className="btn-icon" color="primary">
              <ArrowUp size={14} />
            </Button>
          </ScrollToTop>
        </div>
      ) : null}
    </div>
  );
}

VerticalLayout.defaultProps = {
  footer: undefined,
  navbar: undefined,
  menu: undefined,
  routerProps: {},
};

export default VerticalLayout;
