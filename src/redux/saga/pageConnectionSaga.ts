import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';
import { ConnectFacebookPageRequest, pageConnectionActions } from '@redux/slices/pageConnectionSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { accountConnectionPresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';
import i18n from '@config/i18n';

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

export default function* pageConnectionSaga() {
  yield all([
    takeLatest(pageConnectionActions.connectFacebookPage, connectFacebookPage),
  ]);
}
