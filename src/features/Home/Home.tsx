import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useRouterTransition } from '@hooks/layout';
import VerticalLayout from '@components/VerticalLayout/VerticalLayout';
import LayoutWrapper from '@components/LayoutWrapper/LayoutWrapper';
import Routes from '@features/Router/Routes';
import Navigation from '../../navigation/Navigation';

export default function Home() {
  const { transition } = useRouterTransition();
  const currentActiveItem = null;
  return (
    <VerticalLayout currentActiveItem={currentActiveItem} menuData={Navigation}>
      <Switch>
        {
          Routes.map((route) => (
            <Route path={route.path} exact={route.exact} key={route.path}>
              <LayoutWrapper
                transition={transition}
                wrapperClass={route.className}
                appLayout={route.appLayout}
              >
                {route.component}
              </LayoutWrapper>
            </Route>
          ))
        }
      </Switch>
    </VerticalLayout>
  );
}
