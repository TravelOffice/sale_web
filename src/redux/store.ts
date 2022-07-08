import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '@redux/rootSaga';
import { authReducers } from '@redux/slices/authSlice';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { layoutReducers } from '@redux/slices/layoutSlice';
import { navbarReducers } from '@redux/slices/navbarSlice';
import { chatReducers } from '@redux/slices/chatSlice';
import { pageConnectionReducers } from '@redux/slices/pageConnectionSlice';
import { leadReducers } from '@redux/slices/leadSlice';
import { opportunityReducers } from '@redux/slices/opportunitySlice';
import { customerReducers } from './slices/customerSlice';

const sageMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

const combinedReducers = combineReducers({
  router: connectRouter(history),
  auth: authReducers,
  layout: layoutReducers,
  navbar: navbarReducers,
  chat: chatReducers,
  lead: leadReducers,
  opportunity: opportunityReducers,
  pageConnection: pageConnectionReducers,
  customer: customerReducers,
});

type Reducers = typeof combinedReducers;

const rootReducers: Reducers = (state, action) => {
  if (action.type === 'signOut') {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
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
