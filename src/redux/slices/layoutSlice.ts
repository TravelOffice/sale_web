import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import layoutConfig, {
  LayoutContentWidth,
  LayoutFooterType, LayoutRouterTransition,
  LayoutType,
  NavBarType,
} from '../../config/LayoutConfig';

const initialMenuCollapsed = () => {
  const item = window.localStorage.getItem('menuCollapsed');
  // Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : layoutConfig.menu.isCollapsed;
};

const initialDirection = () => {
  const item = window.localStorage.getItem('direction');
  //* * Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : layoutConfig.isRTL;
};

const initialSkin = () => {
  const item = window.localStorage.getItem('skin');
  //* * Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : layoutConfig.skin;
};

interface LayoutState {
  skin: string,
  isRTL: boolean,
  layout: LayoutType,
  lastLayout: LayoutType,
  menuCollapsed: boolean,
  footerType: LayoutFooterType,
  navbarType: NavBarType,
  menuHidden: boolean,
  contentWidth: LayoutContentWidth,
  routerTransition: LayoutRouterTransition,
  navbarColor: string,
}

const initialState : LayoutState = {
  skin: initialSkin(),
  isRTL: initialDirection(),
  layout: layoutConfig.type,
  lastLayout: layoutConfig.type,
  menuCollapsed: initialMenuCollapsed(),
  footerType: layoutConfig.footer.type,
  navbarType: layoutConfig.navbar.type,
  menuHidden: layoutConfig.menu.isHidden,
  contentWidth: layoutConfig.contentWidth,
  routerTransition: layoutConfig.routerTransition,
  navbarColor: layoutConfig.navbar.backgroundColor,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    handleRTL: (state, action: PayloadAction<boolean>) => {
      state.isRTL = action.payload;
      window.localStorage.setItem('direction', JSON.stringify(action.payload));
    },
    handleSkin: (state, action: PayloadAction<string>) => {
      state.skin = action.payload;
      window.localStorage.setItem('skin', JSON.stringify(action.payload));
    },
    handleLayout: (state, action : PayloadAction<LayoutType>) => {
      state.layout = action.payload;
    },
    handleFooterType: (state, action: PayloadAction<LayoutFooterType>) => {
      state.footerType = action.payload;
    },
    handleNavbarType: (state, action: PayloadAction<NavBarType>) => {
      state.navbarType = action.payload;
    },
    handleMenuHidden: (state, action: PayloadAction<boolean>) => {
      state.menuHidden = action.payload;
    },
    handleLastLayout: (state, action: PayloadAction<LayoutType>) => {
      state.lastLayout = action.payload;
    },
    handleNavbarColor: (state, action: PayloadAction<string>) => {
      state.navbarColor = action.payload;
    },
    handleContentWidth: (state, action: PayloadAction<LayoutContentWidth>) => {
      state.contentWidth = action.payload;
    },
    handleMenuCollapsed: (state, action: PayloadAction<boolean>) => {
      state.menuCollapsed = action.payload;
      window.localStorage.setItem('menuCollapsed', JSON.stringify(action.payload));
    },
    handleRouterTransition: (state, action: PayloadAction<LayoutRouterTransition>) => {
      state.routerTransition = action.payload;
    },
  },
});

// Actions
export const layoutActions = layoutSlice.actions;

// Reducers
export const layoutReducers = layoutSlice.reducer;

export default { layoutReducers, layoutActions };
