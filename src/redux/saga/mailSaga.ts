import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import { mailActions } from '@redux/slices/mailSlice';
import { mailPresenter } from '@adapter/presenters';
import { MailAccount } from '@domain/entities/mail/MailAccount';
import toasty from '@components/Toasty/Toasty';
import i18n from '@config/i18n';

function* linkMail(action: PayloadAction<LinkEmailFormData>) {
  let success = true;
  try {
    const account: MailAccount = yield call(mailPresenter.linkMail, action.payload);
    yield put(mailActions.onMailAccountLinked(account));
    toasty.show({
      title: i18n.t('COMMON.SUCCESS'),
      type: 'success',
      message: i18n.t('MAIL.LINK_MAIL_SUCCESSFULLY', { mailAddress: account.email }),
    });
    success = true;
  } catch (error: any) {
    toasty.show({
      title: i18n.t('COMMON.ERROR'),
      type: 'error',
      message: `${error.message}`,
    });
    success = false;
  } finally {
    yield put(mailActions.onLinkMailAccountCompleted(success));
  }
}

export default function* mailSaga() {
  yield all([
    takeLatest(mailActions.linkMail, linkMail),
  ]);
}
