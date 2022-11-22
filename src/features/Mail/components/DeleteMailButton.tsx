import React, { useCallback } from 'react';
import { useSelectedMailAccount, useSelectedMailbox } from '@hooks/mail';
import { Trash } from 'react-feather';
import { MailSearchResult } from '@domain/entities/mail/MailSearchResult';
import { useDispatch } from 'react-redux';
import { mailActions } from '@redux/slices/mailSlice';
import { MailMessage } from '@domain/entities/mail/MailMessage';

export interface DeleteMailProps {
  mails: MailSearchResult[] | MailMessage[],
}

export default function DeleteMailButton(props: DeleteMailProps) {
  const { mails } = props;
  const dispatch = useDispatch();
  const currentMailAccount = useSelectedMailAccount();
  const selectedMailbox = useSelectedMailbox();

  // Delete selected messages
  const deleteMails = useCallback(() => {
    if (currentMailAccount && mails.length > 0) {
      dispatch(mailActions.deleteMail({
        email: currentMailAccount?.email,
        mailbox: selectedMailbox,
        messagesId: mails.map((mail: MailMessage | MailSearchResult) => mail.messageId),
      }));
    }
  }, [mails]);

  // Render results
  return (
    <>
      <span className="action-icon" onClick={deleteMails}>
        <Trash size={18} />
      </span>
    </>
  );
}
