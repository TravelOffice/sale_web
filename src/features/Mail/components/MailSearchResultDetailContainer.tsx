import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { useQuery } from '@tanstack/react-query';
import { mailPresenter } from '@adapter/presenters';
import { useSelectedMailAccount } from '@hooks/mail';
import MailDetail from '@features/Mail/components/MailDetail';
import { mailActions } from '@redux/slices/mailSlice';

export default function MailSearchResultDetailContainer() {
  const mailAccount = useSelectedMailAccount();
  const result = useSelector((state: RootState) => state.mail.selectedMailSearchResult);
  const dispatch = useDispatch();
  const { data: mailThread, isLoading } = useQuery(
    ['mailResultDetail', result?.messageId],
    () => mailPresenter.getMailThread(mailAccount!.email, result!.box, result!.messageId),
    { enabled: !!mailAccount && !!result },
  );
  const mail = useMemo(
    () => mailThread?.find((mailMessage) => mailMessage.messageId === result?.messageId),
    [result, mailThread],
  );

  const handleGoBack = useCallback(() => {
    dispatch(mailActions.selectMailResult(undefined));
  }, []);

  return (
    <MailDetail
      mail={mail}
      mailThread={mailThread || []}
      onBack={handleGoBack}
      isFetching={isLoading}
    />
  );
}
