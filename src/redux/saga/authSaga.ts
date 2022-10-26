import { accountConnectionPresenter, userPresenter } from '@adapter/presenters';
import { Page } from '@domain/entities/chat/Page';
import { User } from '@domain/entities/User';
import { authActions } from '@redux/slices/authSlice';
import {
  all, call, put, take, takeLatest, fork, cancel, cancelled, delay,
} from 'redux-saga/effects';
import { Task } from 'redux-saga';

function* attachSession() {
  try {
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

export default function* authSaga() {
  yield all([
    takeLatest(authActions.attachSession, attachSession),
    takeLatest(authActions.getLinkedPages, getLinkedPages),
    takeLatest(authActions.detachSession, detachSession),
    authFlow(),
  ]);
}
