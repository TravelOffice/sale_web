import { authActions } from '@redux/slices/authSlice';
import {
  all, takeLatest, put, call,
} from 'redux-saga/effects';
import User from '@domain/entities/User';
import { userPresenter } from '@adapter/presenters';

function* attachSession() {
  const currentUser: User = yield call(userPresenter.getCurrentUser);
  yield put(authActions.setCurrentUser(currentUser));
}

export default function* authSaga() {
  yield all([
    takeLatest(authActions.attachSession, attachSession),
  ]);
}
