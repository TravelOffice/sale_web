import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '@redux/rootSaga';
import { authReducers } from '@redux/slices/authSlice';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { layoutReducers } from '@redux/slices/layoutSlice';
import { navbarReducers } from '@redux/slices/navbarSlice';
import { chatReducers } from '@redux/slices/chatSlice';
import { leadReducers } from './slices/leadSlice';

const sageMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

const rootReducers = combineReducers({
  router: connectRouter(history),
  auth: authReducers,
  layout: layoutReducers,
  navbar: navbarReducers,
  chat: chatReducers,
  lead: leadReducers,
});

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
