import {
  all, call, put, takeEvery, takeLatest,
} from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import { mailActions } from '@redux/slices/mailSlice';
import { mailPresenter } from '@adapter/presenters';
import { MailAccount } from '@domain/entities/mail/MailAccount';
import toasty from '@components/Toasty/Toasty';
import i18n from '@config/i18n';
import { Mailbox } from '@domain/entities/mail/Mailbox';
import { MailMessageList } from '@domain/entities/mail/MailMessageList';
import { SendMailFormData } from '@domain/entities/mail/SendMailFormData';
import { MailAttachment } from '@domain/entities/mail/MailAttachment';

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

function* getMailAccounts() {
  try {
    const mailAccounts: MailAccount[] = yield call(mailPresenter.getMailAccounts);
    yield put(mailActions.onMailAccountsFetched(mailAccounts));
  } catch {
    toasty.show({
      title: i18n.t('COMMON.ERROR'),
      message: i18n.t('MAIL.ERROR_GET_MAIL_ACCOUNTS'),
      type: 'error',
    });
  }
}

function* getMailboxes(action: PayloadAction<MailAccount>) {
  try {
    const account = action.payload;
    const mailboxes: Mailbox[] = yield call(mailPresenter.getMailboxes, account.email);
    yield put(mailActions.onMailboxesFetched(mailboxes));
  } catch {
    toasty.show({
      title: i18n.t('COMMON.ERROR'),
      message: i18n.t('MAIL.ERROR_GET_MAILBOXES'),
      type: 'error',
    });
  }
}

function* getMails(action: PayloadAction<{ mailAccount: MailAccount, mailboxId: string }>) {
  const { mailAccount, mailboxId } = action.payload;
  const mailMessages: MailMessageList = yield call(
    mailPresenter.getMailMessages,
    mailAccount.email,
    mailboxId,
  );
  yield put(mailActions.onGetMailsSuccessfully(mailMessages));
}

function* sendMail(action: PayloadAction<SendMailFormData>) {
  let result = true;
  try {
    yield call(mailPresenter.sendMail, action.payload);
    toasty.show({
      title: i18n.t('COMMON.SUCCESS'),
      type: 'success',
      message: i18n.t('MAIL.SEND_MAIL_SUCCESSFULLY'),
    });
  } catch (error: any) {
    result = false;
    toasty.show({
      title: i18n.t('COMMON.ERROR'),
      type: 'error',
      message: `${error.message}`,
    });
  }
  yield put(mailActions.onSendMailCompleted(result));
}

function* uploadAttachment(action: PayloadAction<File>) {
  try {
    const attachment: MailAttachment = yield call(
      mailPresenter.uploadMailAttachment,
      action.payload,
    );
    yield put(mailActions.onUploadAttachmentSuccessfully(attachment));
  } catch (error: any) {
    toasty.show({
      title: i18n.t('COMMON.ERROR'),
      type: 'error',
      message: `${error.message}`,
    });
  }
}

export default function* mailSaga() {
  yield all([
    takeLatest(mailActions.linkMail, linkMail),
    takeLatest(mailActions.getMailAccounts, getMailAccounts),
    takeLatest(mailActions.getMailboxes, getMailboxes),
    takeLatest(mailActions.getMails, getMails),
    takeLatest(mailActions.sendMail, sendMail),
    takeEvery(mailActions.uploadAttachment, uploadAttachment),
  ]);
}
