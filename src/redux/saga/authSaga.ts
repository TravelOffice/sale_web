import { authActions, LoginPayload } from '@redux/slices/authSlice';
import {
  all, takeLatest, put, call,
} from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import AdminUser from '@domain/entities/AdminUser';
import { push } from 'connected-react-router';
import { authPresenter } from '@adapter/presenters';

/**
 * Initialize authentication state
 */
function* init() {
  try {
    const currentUser : AdminUser | undefined = yield call(authPresenter.getCurrentUser);
    yield put({ type: authActions.initialized.type, payload: currentUser });
  } catch (error) {
    yield put({ type: authActions.initialized.type, payload: undefined });
  }
}

/**
 * Conduct sign in function
 * @param action
 */
function* login(action: PayloadAction<LoginPayload>) {
  const { payload } = action;
  const { username, password } = payload;
  const user : AdminUser = yield call(authPresenter.signIn, username, password);
  yield put({ type: authActions.signInSuccessfully.type, payload: user });
  yield put(push('/'));
}

export default function* authSaga() {
  yield all([
    init(),
    takeLatest(authActions.signIn.type, login),
  ]);
}
