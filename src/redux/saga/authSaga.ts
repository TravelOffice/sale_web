import { authActions } from '@redux/slices/authSlice';
import {
  all, takeLatest, put, call,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { Page } from '@domain/entities/Page';
import { accountConnectionPresenter } from '@adapter/presenters';
import { pageConnectionActions } from '@redux/slices/pageConnectionSlice';

function* getLinkedFacebookPage() {
  try {
    const page: Page = yield call(accountConnectionPresenter.getLinkedFacebookPage);
    yield put(pageConnectionActions.onLinkedFacebookPageRetrieved(page));
  } catch {
    // Do nothing
  }
}

function* attachSession() {
  yield all([
    getLinkedFacebookPage(),
  ]);
  yield put(push(('/')));
}

export default function* authSaga() {
  yield all([
    takeLatest(authActions.attachSession, attachSession),
  ]);
}
