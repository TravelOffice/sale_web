import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '@redux/rootSaga';
import { authReducers } from '@redux/slices/authSlice';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

const sageMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

const rootReducers = combineReducers({
  router: connectRouter(history),
  auth: authReducers,
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    sageMiddleware,
    routerMiddleware(history),
  ),
  reducer: rootReducers,
});

sageMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
