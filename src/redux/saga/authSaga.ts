import { authActions } from '@redux/slices/authSlice';
import {
  all, takeLatest, put,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';

function* attachSession() {
  yield put(push(('/')));
}

export default function* authSaga() {
  yield all([
    takeLatest(authActions.attachSession, attachSession),
  ]);
}
