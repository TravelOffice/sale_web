import { accountConnectionPresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';
import i18n from '@config/i18n';
import { Page } from '@domain/entities/chat/Page';
import { authActions } from '@redux/slices/authSlice';
import {
  ConnectPage, ConnectPageRequest,
  pageConnectionActions,
} from '@redux/slices/pageConnectionSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  all, call, put, takeEvery, takeLatest,
} from 'redux-saga/effects';

function* connectFacebook(payload: ConnectPage<'facebook'>) {
  try {
    const { data } = payload;
    const { userAccessToken, page } = data;
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
    yield put(pageConnectionActions.onPageConnected('facebook'));
    // Refresh linked pages
    const linkedPages: Page[] = yield call(accountConnectionPresenter.getLinkedPages, true);
    yield put(authActions.setLinkedPages(linkedPages));
  }
}

function* connectZalo(payload: ConnectPage<'zalo'>) {
  try {
    const { data } = payload;
    const { pageId, state, authorizationCode } = data;
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
    yield put(pageConnectionActions.onPageConnected('zalo'));
    // Refresh linked pages
    const linkedPages: Page[] = yield call(accountConnectionPresenter.getLinkedPages, true);
    yield put(authActions.setLinkedPages(linkedPages));
  }
}

function* connectTelegram(payload: ConnectPage<'telegram'>) {
  try {
    const { botToken } = payload.data;
    yield call(accountConnectionPresenter.connectTelegramPage, botToken);
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
    yield put(pageConnectionActions.onPageConnected('telegram'));
    // Refresh linked pages
    const linkedPages: Page[] = yield call(accountConnectionPresenter.getLinkedPages, true);
    yield put(authActions.setLinkedPages(linkedPages));
  }
}

function* connectPage(action: PayloadAction<ConnectPageRequest>) {
  const { payload } = action;
  if (payload.platform === 'facebook') {
    yield connectFacebook(payload);
  } else if (payload.platform === 'telegram') {
    yield connectTelegram(payload);
  } else if (payload.platform === 'zalo') {
    yield connectZalo(payload);
  }
}

function* unlinkPage({ payload }: PayloadAction<Page>) {
  const { platform, id } = payload;
  try {
    yield call(
      accountConnectionPresenter.unlinkPage,
      platform,
      id,
    );
    toasty.show({
      type: 'success',
      title: i18n.t('PAGE.SUCCESS'),
      message: i18n.t('PAGE.MESSAGE_UNLINK_SUCCESSFULLY', { platform }),
    });
  } catch {
    toasty.show({
      type: 'error',
      title: i18n.t('PAGE.ERROR'),
      message: i18n.t('PAGE.MESSAGE_UNLINK_FAILED', { platform }),
    });
  } finally {
    // Refresh linked pages
    const linkedPages: Page[] = yield call(accountConnectionPresenter.getLinkedPages, true);
    yield put(authActions.setLinkedPages(linkedPages));
  }
}

export default function* pageConnectionSaga() {
  yield all([
    takeLatest(pageConnectionActions.unlinkPage, unlinkPage),
    takeEvery(pageConnectionActions.connectPage, connectPage),
  ]);
}
