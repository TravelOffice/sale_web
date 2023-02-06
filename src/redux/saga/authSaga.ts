import { accountConnectionPresenter, userPresenter } from '@adapter/presenters';
import { Page } from '@domain/entities/chat/Page';
import { User } from '@domain/entities/User';
import { authActions, AuthPayload } from '@redux/slices/authSlice';
import {
  all, call, put, take, takeLatest, fork, cancel, cancelled, delay, select,
} from 'redux-saga/effects';
import { Task } from 'redux-saga';
import { isTokenExpired } from '@utils/CheckExpireUntil';
import { RootState } from '@redux/store';
import { PayloadAction } from '@reduxjs/toolkit';
import { ID_TOKEN } from '@utils/Constants';
import history from '@utils/HistoryUtils';

function* attachSession(action: PayloadAction<string>) {
  try {
    localStorage.setItem(ID_TOKEN, action.payload);
    const currentUser: User = yield call(userPresenter.getCurrentUser);
    yield put(authActions.setCurrentUser(currentUser));
    const linkedPages: Page[] = yield call(accountConnectionPresenter.getLinkedPages, false);
    yield put(authActions.setLinkedPages(linkedPages));
    yield put(authActions.onInitialCompleted());
  } catch {
    // Do nothing
  }
}

function* getLinkedPages() {
  const linkedPages: Page[] = yield call(accountConnectionPresenter.getLinkedPages, false);
  yield put(authActions.setLinkedPages(linkedPages));
}

function* detachSession() {
  yield put({ type: 'signOut' });
}

function* refreshCurrentUser() {
  while (true) {
    try {
      const currentUser: User = yield call(userPresenter.getCurrentUser);
      yield put(authActions.setCurrentUser(currentUser));
    } catch {
      // Do nothing
    }
    // Delay to the next refreshing by the REACT_APP_REFRESH_CURRENT_USER_INTERVAL_MS config
    // If not set, default is 1 hour
    const refreshInterval = process.env.REACT_APP_REFRESH_CURRENT_USER_INTERVAL_MS
      ? parseInt(process.env.REACT_APP_REFRESH_CURRENT_USER_INTERVAL_MS, 10)
      : 60 * 60 * 1000;
    yield delay(refreshInterval);
    const isCancelled: boolean = yield cancelled();
    if (isCancelled) {
      break;
    }
  }
}

function* authFlow() {
  while (true) {
    yield take(authActions.onInitialCompleted);
    const task: Task = yield fork(refreshCurrentUser);
    yield take(authActions.detachSession);
    yield cancel(task);
  }
}

function* getIdToken() {
  const search: string = yield select((state: RootState) => state.router.location.search);
  const urlSearchParams = new URLSearchParams(search);
  if (urlSearchParams.has(ID_TOKEN)) {
    const path = window.location.pathname;
    history.push(path);
    const jwtToken = urlSearchParams.get(ID_TOKEN);
    return jwtToken;
  }
  return localStorage.getItem(ID_TOKEN);
}

function* checkAuth() {
  const idToken: string = yield getIdToken();
  if (isTokenExpired(idToken)) {
    yield put(authActions.changeAuthStatus({ status: 'notLoggedIn' }));
  } else {
    yield put(authActions.changeAuthStatus({ status: 'loggedIn', idToken }));
  }
}

function* listenToAuth(action: PayloadAction<AuthPayload>) {
  const { status, idToken } = action.payload;
  if (status === 'loggedIn') {
    yield put(authActions.attachSession(idToken!));
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(authActions.attachSession, attachSession),
    takeLatest(authActions.getLinkedPages, getLinkedPages),
    takeLatest(authActions.detachSession, detachSession),
    takeLatest(authActions.changeAuthStatus, listenToAuth),
    authFlow(),
    checkAuth(),
  ]);
}
