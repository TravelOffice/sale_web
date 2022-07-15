// ** React Imports
import React, { useEffect } from 'react';

// ** Third Party Components
import classnames from 'classnames';

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@redux/store';
import { layoutActions } from '@redux/slices/layoutSlice';
// import { handleContentWidth, handleMenuCollapsed, handleMenuHidden } from '@store/layout';

// ** Styles
import 'animate.css/animate.css';
import { LayoutContentWidth } from '@config/LayoutConfig';

interface RouteMeta {
  contentWidth: LayoutContentWidth,
  menuCollapsed: boolean,
  menuHidden: boolean,
}

interface LayoutWrapperProps extends React.HTMLAttributes<any>{
  appLayout?: boolean,
  wrapperClass?: string,
  transition: string,
  routeMeta?: RouteMeta,
}

const LayoutWrapper = (props: LayoutWrapperProps) => {
  // ** Props
  const {
    children, appLayout, wrapperClass, transition, routeMeta,
  } = props;

  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state : RootState) => state);

  const navbarStore = store.navbar;
  const { contentWidth } = store.layout;

  const cleanUp = () => {
    if (routeMeta) {
      if (routeMeta.contentWidth) {
        dispatch(layoutActions.handleContentWidth('full'));
      }
      if (routeMeta.menuCollapsed) {
        dispatch(layoutActions.handleMenuCollapsed(!routeMeta.menuCollapsed));
      }
      if (routeMeta.menuHidden) {
        dispatch(layoutActions.handleMenuHidden(!routeMeta.menuHidden));
      }
    }
  };

  // ** ComponentDidMount
  useEffect(() => {
    if (routeMeta) {
      if (routeMeta.contentWidth) {
        dispatch(layoutActions.handleContentWidth(routeMeta.contentWidth));
      }
      if (routeMeta.menuCollapsed) {
        dispatch(layoutActions.handleMenuCollapsed(routeMeta.menuCollapsed));
      }
      if (routeMeta.menuHidden) {
        dispatch(layoutActions.handleMenuHidden(routeMeta.menuHidden));
      }
    }
    return () => cleanUp();
  }, []);

  return (
    <div
      className={classnames('app-content content overflow-hidden', wrapperClass, {
        'show-overlay': navbarStore.query.length,
      })}
    >
      <div className="content-overlay" />
      <div className="header-navbar-shadow" />
      <div
        className={classnames({
          'content-wrapper': !appLayout,
          'content-area-wrapper': appLayout,
          'container-fluid p-0': contentWidth === 'boxed',
          [`animate__animated animate__${transition}`]: transition !== 'none' && transition.length,
        })}
      >
        {children}
      </div>
    </div>
  );
};

LayoutWrapper.defaultProps = {
  appLayout: false,
  wrapperClass: undefined,
  routeMeta: undefined,
};

export default LayoutWrapper;
