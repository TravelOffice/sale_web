import React from 'react';
import {
  Switch,
  Route, BrowserRouter, Redirect,
} from 'react-router-dom';
import appConfig from '@config/AppConfig';
import Home from '../Home/Home';
import Initial from '../Initial/Initial';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/initial">
          <Initial />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
