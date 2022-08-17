import rootSaga from '@redux/rootSaga';
import { authReducers } from '@redux/slices/authSlice';
import { chatReducers } from '@redux/slices/chatSlice';
import { layoutReducers } from '@redux/slices/layoutSlice';
import { leadReducers } from '@redux/slices/leadSlice';
import { navbarReducers } from '@redux/slices/navbarSlice';
import { notificationReducers } from '@redux/slices/notificationSlice';
import { opportunityReducers } from '@redux/slices/opportunitySlice';
import { pageConnectionReducers } from '@redux/slices/pageConnectionSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { enableMapSet } from 'immer';
import createSagaMiddleware from 'redux-saga';
import client from '@graphql/client';
import { customerReducers } from './slices/customerSlice';
import { userReducers } from './slices/userSlice';

enableMapSet();

const sageMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

const combinedReducers = combineReducers({
  router: connectRouter(history),
  auth: authReducers,
  user: userReducers,
  layout: layoutReducers,
  navbar: navbarReducers,
  chat: chatReducers,
  lead: leadReducers,
  opportunity: opportunityReducers,
  pageConnection: pageConnectionReducers,
  customer: customerReducers,
  notification: notificationReducers,
});

type Reducers = typeof combinedReducers;

const rootReducers: Reducers = (state, action) => {
  if (action.type === 'signOut') {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
    client.resetStore().then();
  }
  return combinedReducers(state, action);
};

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(
    sageMiddleware,
    routerMiddleware(history),
  ),
  reducer: rootReducers,
});

sageMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
