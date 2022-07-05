import { authActions } from '@redux/slices/authSlice';
import {
  all, takeLatest, put, call,
} from 'redux-saga/effects';
import User from '@domain/entities/User';
import { accountConnectionPresenter, userPresenter } from '@adapter/presenters';
import { Page } from '@domain/entities/Page';

function* attachSession() {
  try {
    const currentUser: User = yield call(userPresenter.getCurrentUser);
    yield put(authActions.setCurrentUser(currentUser));
    const linkedPages: Page[] = yield call(accountConnectionPresenter.getLinkedPages);
    yield put(authActions.setLinkedPages(linkedPages));
  } catch {
    // Do nothing
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(authActions.attachSession, attachSession),
  ]);
}
