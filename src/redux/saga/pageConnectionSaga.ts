import { accountConnectionPresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';
import i18n from '@config/i18n';
import { Page } from '@domain/entities/Page';
import { authActions } from '@redux/slices/authSlice';
import {
  ConnectFacebookPageRequest,
  ConnectZaloPageRequest,
  pageConnectionActions,
} from '@redux/slices/pageConnectionSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

function* connectFacebookPage({ payload }: PayloadAction<ConnectFacebookPageRequest>) {
  try {
    const { userAccessToken, page } = payload;
    yield call(accountConnectionPresenter.connectFacebookPage, userAccessToken, page);
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
    // Refresh linked pages
    const linkedPages: Page[] = yield call(accountConnectionPresenter.getLinkedPages);
    yield put(authActions.setLinkedPages(linkedPages));
  }
}

function* connectZaloPage({ payload }: PayloadAction<ConnectZaloPageRequest>) {
  try {
    const { pageId, state, authorizationCode } = payload;
    yield call(
      accountConnectionPresenter.connectZaloPage,
      pageId,
      state,
      authorizationCode,
    );
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
    // Refresh linked pages
    const linkedPages: Page[] = yield call(accountConnectionPresenter.getLinkedPages);
    yield put(authActions.setLinkedPages(linkedPages));
  }
}

export default function* pageConnectionSaga() {
  yield all([
    takeLatest(pageConnectionActions.connectFacebookPage, connectFacebookPage),
    takeLatest(pageConnectionActions.connectZaloPage, connectZaloPage),
  ]);
}
