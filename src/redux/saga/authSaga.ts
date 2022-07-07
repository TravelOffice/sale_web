import { accountConnectionPresenter, userPresenter } from '@adapter/presenters';
import { Page } from '@domain/entities/Page';
import User from '@domain/entities/User';
import { authActions } from '@redux/slices/authSlice';
import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

function* attachSession() {
  try {
    const currentUser: User = yield call(userPresenter.getCurrentUser);
    yield put(authActions.setCurrentUser(currentUser));
    const linkedPages: Page[] = yield call(accountConnectionPresenter.getLinkedPages);
    yield put(authActions.setLinkedPages(linkedPages));
    yield put(authActions.onInitialCompleted());
  } catch {
    // Do nothing
  }
}

function* getLinkedPages() {
  const linkedPages: Page[] = yield call(accountConnectionPresenter.getLinkedPages);
  yield put(authActions.setLinkedPages(linkedPages));
}

export default function* authSaga() {
  yield all([
    takeLatest(authActions.attachSession, attachSession),
    takeLatest(authActions.getLinkedPages, getLinkedPages),
  ]);
}
