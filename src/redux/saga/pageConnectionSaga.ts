import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';
import {
  ConnectFacebookPageRequest, ConnectZaloPageRequest,
  pageConnectionActions,
} from '@redux/slices/pageConnectionSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { accountConnectionPresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';
import i18n from '@config/i18n';
import { ZaloPage } from '@domain/entities/ZaloPage';

function* connectFacebookPage({ payload }: PayloadAction<ConnectFacebookPageRequest>) {
  try {
    const { userAccessToken, page } = payload;
    yield call(accountConnectionPresenter.connectFacebookPage, userAccessToken, page);
    yield put({ type: pageConnectionActions.onFacebookPageConnected.type, payload: page });
    toasty.show({
      type: 'success',
      title: i18n.t('PAGE.SUCCESS'),
      message: i18n.t('PAGE.MESSAGE_LINK_SUCCESSFULLY'),
    });
  } catch {
    toasty.show({
      type: 'error',
      title: i18n.t('PAGE.ERROR'),
      message: i18n.t('PAGE.MESSAGE_LINK_FAILED'),
    });
  } finally {
    yield put({ type: pageConnectionActions.onFacebookPageConnectCompleted.type });
  }
}

function* connectZaloPage({ payload }: PayloadAction<ConnectZaloPageRequest>) {
  try {
    const { pageId, state, authorizationCode } = payload;
    const zaloPage : ZaloPage = yield call(
      accountConnectionPresenter.connectZaloPage,
      pageId,
      state,
      authorizationCode,
    );
    yield put(pageConnectionActions.onZaloPageConnected(zaloPage));
    toasty.show({
      type: 'success',
      title: i18n.t('PAGE.SUCCESS'),
      message: i18n.t('PAGE.MESSAGE_LINK_SUCCESSFULLY'),
    });
  } catch {
    toasty.show({
      type: 'error',
      title: i18n.t('PAGE.ERROR'),
      message: i18n.t('PAGE.MESSAGE_LINK_FAILED'),
    });
  } finally {
    yield put(pageConnectionActions.onZaloPageConnectCompleted());
  }
}

export default function* pageConnectionSaga() {
  yield all([
    takeLatest(pageConnectionActions.connectFacebookPage, connectFacebookPage),
    takeLatest(pageConnectionActions.connectZaloPage, connectZaloPage),
  ]);
}
