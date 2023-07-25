import LayoutWrapper from '@components/LayoutWrapper/LayoutWrapper';
import VerticalLayout from '@components/VerticalLayout/VerticalLayout';
import Routes from '@features/Router/Routes';
import { useRouterTransition } from '@hooks/layout';
import { chatActions } from '@redux/slices/chatSlice';
import { notificationActions } from '@redux/slices/notificationSlice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import AccessControl from '@components/AccessControl/AccessControl';
import NotAuthorized from '@components/NotAuthorized/NotAuthorized';
import Navigation from '../../navigation/Navigation';

export default function Home() {
  const dispatch = useDispatch();
  const { transition } = useRouterTransition();

  useEffect(() => {
    dispatch(notificationActions.subscribeNewNotification());
    dispatch(chatActions.subscribeNewMessage());
  }, []);

  return (
    <VerticalLayout menuData={Navigation}>
      <Switch>
        {
          Routes.map((route) => (
            <Route path={route.path} exact={route.exact} key={route.path}>
              <LayoutWrapper
                transition={transition}
                wrapperClass={route.className}
                appLayout={route.appLayout}
              >
                <AccessControl
                  requiredPermissions={route.requiredPermissions || []}
                  fallback={route.fallback || <NotAuthorized />}
                >
                  {route.component}
                </AccessControl>
              </LayoutWrapper>
            </Route>
          ))
        }
      </Switch>
    </VerticalLayout>
  );
}
