import React, { useCallback } from 'react';
import {
  useMailThread, useSelectedMail, useSelectedMailAccount, useSelectedMailbox,
} from '@hooks/mail';
import { useDispatch } from 'react-redux';
import { mailActions } from '@redux/slices/mailSlice';
import MailDetail from '@features/Mail/components/MailDetail';

export default function MailDetailContainer() {
  const mail = useSelectedMail();
  const mailAccount = useSelectedMailAccount();
  const mailboxId = useSelectedMailbox();
  const {
    mailThread,
    isFetchingMailThread,
  } = useMailThread(mailAccount?.email, mailboxId, mail?.messageId!);
  const dispatch = useDispatch();
  const handleGoBack = useCallback(() => {
    dispatch(mailActions.unselectMail());
  }, []);
  return (
    <MailDetail
      mail={mail}
      mailThread={mailThread}
      onBack={handleGoBack}
      isFetching={isFetchingMailThread}
    />
  );
}
