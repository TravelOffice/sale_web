// ** Store Imports
import { useDispatch, useSelector } from 'react-redux';
import { layoutActions } from '@redux/slices/layoutSlice';
import { RootState } from '@redux/store';
import { useEffect } from 'react';
import {
  LayoutFooterType, LayoutRouterTransition, LayoutType, NavBarType,
} from '../config/LayoutConfig';

export const useLayout = () => {
  // ** Hooks
  const dispatch = useDispatch();
  const store = useSelector((state : RootState) => state.layout);

  const setLayout = (value: LayoutType) => {
    dispatch(layoutActions.handleLayout(value));
  };

  const setLastLayout = (value: LayoutType) => {
    dispatch(layoutActions.handleLastLayout(value));
  };

  // const handleLayoutUpdate = useCallback(() => {
  //   // ** If layout is horizontal & screen size is equals to or below 1200
  //   if (store.layout === 'horizontal' && window.innerWidth <= 1200) {
  //     setLayout('vertical')
  //     setLastLayout('horizontal')
  //   }
  //   // ** If lastLayout is horizontal & screen size is equals to or above 1200
  //   if (store.lastLayout === 'horizontal' && window.innerWidth >= 1200) {
  //     setLayout('horizontal')
  //   }
  // }, [])

  // // ** ComponentDidMount
  // useEffect(() => {
  //   handleLayoutUpdate()
  // }, [])

  // useEffect(() => {
  //   // ** Window Resize Event
  //   window.addEventListener('resize', handleLayoutUpdate)
  // }, [store.layout, store.lastLayout])

  if (window) {
    const breakpoint = 1200;

    if (window.innerWidth < breakpoint) {
      setLayout('vertical');
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth <= breakpoint && store.lastLayout !== 'vertical' && store.layout !== 'vertical') {
        setLayout('vertical');
      }
      if (window.innerWidth >= breakpoint && store.lastLayout !== store.layout) {
        setLayout(store.lastLayout);
      }
    });
  }

  return {
    layout: store.layout, setLayout, lastLayout: store.lastLayout, setLastLayout,
  };
};

export const useRouterTransition = () => {
  // ** Hooks
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.layout);

  const setTransition = (type: LayoutRouterTransition) => {
    dispatch(layoutActions.handleRouterTransition(type));
  };

  return { transition: store.routerTransition, setTransition };
};

export const useSkin = () => {
  // ** Hooks
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.layout);

  const setSkin = (type: string) => {
    dispatch(layoutActions.handleSkin(type));
  };

  useEffect(() => {
    // ** Get Body Tag
    const element = window.document.body;

    // ** Define classnames for skins
    const classNames : { [key: string]: string } = {
      dark: 'dark-layout',
      bordered: 'bordered-layout',
      'semi-dark': 'semi-dark-layout',
    };

    // ** Remove all classes from Body on mount
    const classList : string[] = [];
    element.classList.forEach((classname) => classList.push(classname));
    element.classList.remove(...classList);

    // ** If skin is not light add skin class
    if (store.skin !== 'light') {
      element.classList.add(classNames[store.skin]);
    }
  }, [store.skin]);

  return { skin: store.skin, setSkin };
};

export const useRTL = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const isRtl = useSelector((state: RootState) => state.layout.isRTL);

  // ** Return a wrapped version of useState's setter function
  const setValue = (value: boolean) => {
    dispatch(layoutActions.handleRTL(value));
  };

  useEffect(() => {
    // ** Get HTML Tag
    const element = document.getElementsByTagName('html')[0];

    // ** If isRTL then add attr dir='rtl' with HTML else attr dir='ltr'
    if (isRtl) {
      element.setAttribute('dir', 'rtl');
    } else {
      element.setAttribute('dir', 'ltr');
    }
  }, [isRtl]);

  return [isRtl, setValue];
};

export const useNavbarType = () => {
  // ** Hooks
  const dispatch = useDispatch();
  const store = useSelector((state:RootState) => state.layout);

  const setNavbarType = (type: NavBarType) => {
    dispatch(layoutActions.handleNavbarType(type));
  };

  return { navbarType: store.navbarType, setNavbarType };
};

export const useFooterType = () => {
  // ** Hooks
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.layout);

  const setFooterType = (type: LayoutFooterType) => {
    dispatch(layoutActions.handleFooterType(type));
  };

  return { setFooterType, footerType: store.footerType };
};

export const useNavbarColor = () => {
  // ** Hooks
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.layout);

  // ** Return a wrapped version of useState's setter function
  const setNavbarColor = (value: string) => {
    dispatch(layoutActions.handleNavbarColor(value));
  };

  return { navbarColor: store.navbarColor, setNavbarColor };
};
