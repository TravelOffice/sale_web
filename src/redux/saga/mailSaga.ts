import {
  all, call, cancel, delay, fork, put, select, take, takeEvery, takeLatest,
} from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import { mailActions, MailState } from '@redux/slices/mailSlice';
import { mailPresenter } from '@adapter/presenters';
import { MailAccount } from '@domain/entities/mail/MailAccount';
import toasty from '@components/Toasty/Toasty';
import i18n from '@config/i18n';
import { Mailbox } from '@domain/entities/mail/Mailbox';
import { MailMessageList } from '@domain/entities/mail/MailMessageList';
import { RootState } from '@redux/store';
import { SendMailFormData } from '@domain/entities/mail/SendMailFormData';
import { MailAttachment } from '@domain/entities/mail/MailAttachment';
import { authActions } from '@redux/slices/authSlice';
import { Task } from 'redux-saga';
import { getDefaultSyncMailInterval } from '@utils/MailUtils';
import { DeleteMailRequest } from '@domain/entities/mail/DeleteMailRequest';
import { MailMessage } from '@domain/entities/mail/MailMessage';

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
  } catch (error) {
    console.log(error);
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
  try {
    const { mailAccount, mailboxId } = action.payload;
    const mailMessages: MailMessageList = yield call(
      mailPresenter.getMailMessages,
      mailAccount.email,
      mailboxId,
    );
    yield put(mailActions.onGetMailsSuccessfully(mailMessages));
  } catch {
    yield put(mailActions.onGetMailsFailed());
  }
}

function* loadMore() {
  try {
    const mailState: MailState = yield select((state: RootState) => state.mail);
    const {
      nextToken, selectedMailAccount, selectedMailboxId,
      isFetchingMails, isFetchingMailboxes, loadableMore,
    } = mailState;
    if (!loadableMore || !selectedMailAccount || isFetchingMailboxes || isFetchingMails) {
      // Do not load more if fetching mail account mail messages
      yield put(mailActions.onLoadMoreMessageCompleted());
      return;
    }
    const mailMessages: MailMessageList = yield call(
      mailPresenter.getMailMessages,
      selectedMailAccount.email,
      selectedMailboxId,
      nextToken,
    );
    yield put(mailActions.onMoreMessagedLoaded(mailMessages));
  } catch {
    // Do nothing
  }
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

function* bgSync() {
  while (true) {
    const mailAccounts: MailAccount[] = yield select((state: RootState) => state.mail.mailAccounts);
    if (mailAccounts.length > 0) {
      yield call(mailPresenter.syncMail, mailAccounts);
      const syncMailInterval = getDefaultSyncMailInterval();
      yield delay(syncMailInterval);
    } else {
      // No email accounts has been link
      // Wait for linking new email account successfully
      yield take([mailActions.onLinkMailAccountCompleted]);
    }
  }
}

function* syncFlow() {
  while (true) {
    yield take(authActions.onInitialCompleted);
    yield getMailAccounts();
    const bgTask: Task = yield fork(bgSync);
    yield take(authActions.detachSession);
    yield cancel(bgTask);
  }
}

function* draftMail(action: PayloadAction<SendMailFormData>) {
  try {
    yield call(mailPresenter.draftMail, action.payload);
    toasty.show({
      title: i18n.t('COMMON.SUCCESS'),
      type: 'success',
      message: i18n.t('MAIL.DRAFT_MAIL_SUCCESSFULLY'),
    });
  } catch (error: any) {
    toasty.show({
      title: i18n.t('COMMON.ERROR'),
      type: 'error',
      message: `${error.message}`,
    });
  }
}

function* deleteMail(action: PayloadAction<DeleteMailRequest>) {
  try {
    yield call(mailPresenter.deleteMail, action.payload);
    toasty.show({
      title: i18n.t('COMMON.SUCCESS'),
      type: 'success',
      message: i18n.t('MAIL.DELETE_MAIL_SUCCESSFULLY'),
    });
  } catch (error: any) {
    toasty.show({
      title: i18n.t('COMMON.ERROR'),
      type: 'error',
      message: `${error.message}`,
    });
  }
}

function* refreshMailAccountList() {
  try {
    const mailAccounts: MailAccount[] = yield call(mailPresenter.getMailAccounts);
    yield put(mailActions.onMailAccountsFetched(mailAccounts));
  } catch {
    // Do nothing
  }
}

/**
 * Effect which should be used to move a mail message from a folder to another
 */
function* changeMailbox(action: PayloadAction<{ mailbox: string, mails: MailMessage[] }>) {
  try {
    const { mailbox, mails } = action.payload;
    const mailState: MailState = yield select((state: RootState) => state.mail);
    const { selectedMailboxId, selectedMailAccount } = mailState;
    yield call(mailPresenter.changeMailbox, {
      from: selectedMailboxId,
      to: mailbox,
      mail: selectedMailAccount?.email!,
      messages: mails.map((mail) => mail.messageId),
    });
    toasty.show({
      title: i18n.t('COMMON.SUCCESS'),
      type: 'success',
      message: i18n.t('MAIL.CHANGE_MAILBOX_SUCCESSFULLY', {
        count: mails.length,
        folder: i18n.t(`MAIL.${mailbox.toUpperCase()}`),
      }),
    });
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
    syncFlow(),
    takeLatest(mailActions.linkMail, linkMail),
    takeLatest(mailActions.getMailAccounts, getMailAccounts),
    takeLatest(mailActions.getMailboxes, getMailboxes),
    takeLatest(mailActions.getMails, getMails),
    takeLatest(mailActions.loadMore, loadMore),
    takeLatest(mailActions.sendMail, sendMail),
    takeLatest(mailActions.draftMail, draftMail),
    takeLatest(mailActions.deleteMail, deleteMail),
    takeEvery(mailActions.uploadAttachment, uploadAttachment),
    takeLatest(mailActions.refreshMailAccountList, refreshMailAccountList),
    takeLatest(mailActions.changeMailbox, changeMailbox),
  ]);
}
