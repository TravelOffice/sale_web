export type LayoutSkin = 'light' | 'dark' | 'bordered' | 'semi-dark';
export type LayoutRouterTransition = 'fadeIn' | 'fadeInLeft' | 'zoomIn' | 'none';
export type LayoutType = 'vertical' | 'horizontal';
export type LayoutContentWidth = 'full' | 'boxed';
export type LayoutMenu = { isHidden: boolean, isCollapsed: boolean };
export type NavBarType = 'static' | 'sticky' | 'floating' | 'hidden';
export type LayoutNavBar = { type: NavBarType, backgroundColor: string };
export type LayoutFooterType = 'static' | 'sticky' | 'hidden';
export type LayoutFooter = { type: LayoutFooterType };

export interface LayoutConfig {
  isRTL: boolean,
  skin: LayoutSkin,
  routerTransition: LayoutRouterTransition,
  type: LayoutType,
  contentWidth: LayoutContentWidth
  menu: LayoutMenu,
  navbar: LayoutNavBar,
  footer: LayoutFooter,
  customizer: boolean,
  scrollTop: boolean, // Enable scroll to top button
}

const defaultLayoutConfig : LayoutConfig = {
  isRTL: false,
  skin: 'light',
  routerTransition: 'fadeIn',
  type: 'vertical',
  contentWidth: 'boxed',
  menu: {
    isHidden: false,
    isCollapsed: false,
  },
  navbar: {

    type: 'floating',
    backgroundColor: 'white',
  },
  footer: {
    type: 'static',
  },
  customizer: false,
  scrollTop: true,
};

export default defaultLayoutConfig;
