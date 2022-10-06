import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { useCallback, useEffect, useState } from 'react';
import { mailActions } from '@redux/slices/mailSlice';
import { MailMessage } from '@domain/entities/mail/MailMessage';
import { mailPresenter } from '@adapter/presenters';

/**
 * Hook to get selected mail account
 */
export const useSelectedMailAccount = () => useSelector((
  state: RootState,
) => state.mail.selectedMailAccount);

export const useUploadedAttachments = () => useSelector((
  state: RootState,
) => state.mail.uploadedAttachments);

/**
 * Hook to get selected mailbox
 */
export const useSelectedMailbox = () => useSelector((
  state: RootState,
) => state.mail.selectedMailboxId);

/**
 * Hook to get selected mail message
 */
export const useSelectedMail = () => useSelector((
  state: RootState,
) => state.mail.selectedMail);

/**
 * Hook to get all mail accounts
 */
export const useMailAccounts = () => {
  const dispatch = useDispatch();
  const mailAccounts = useSelector((state: RootState) => state.mail.mailAccounts);
  useEffect(() => {
    dispatch(mailActions.getMailAccounts());
  }, []);
  return mailAccounts;
};

/**
 * Hook to get all mailboxes of selected mail account
 */
export const useMailboxes = () => {
  const dispatch = useDispatch();
  const selectedMailAccount = useSelectedMailAccount();
  const mailboxes = useSelector((state: RootState) => state.mail.mailboxes);
  useEffect(() => {
    if (selectedMailAccount) {
      // Fetch mailboxes whenever changing mail account
      dispatch(mailActions.getMailboxes(selectedMailAccount));
    }
  }, [selectedMailAccount]);
  return mailboxes;
};

/**
 * Hook to get all mail messages under selected mailbox of the selected mail account
 */
export const useMails = () => {
  const dispatch = useDispatch();
  const selectedMailAccount = useSelectedMailAccount();
  const selectedMailboxId = useSelectedMailbox();
  const mails = useSelector((state: RootState) => state.mail.mails);
  const loadMailMessages = useCallback(() => {
    if (selectedMailAccount && selectedMailboxId) {
      // Fetch mail messages whenever either mail account of mailbox changed
      dispatch((mailActions.getMails({
        mailAccount: selectedMailAccount,
        mailboxId: selectedMailboxId,
      })));
    }
  }, [selectedMailAccount, selectedMailboxId, dispatch]);
  useEffect(() => {
    loadMailMessages();
  }, [selectedMailAccount, selectedMailboxId, dispatch]);
  return { mails, loadMailMessages };
};

/**
 * Hook to get mail thread of given mail message
 */
export const useMailThread = (mailAccount?: string, mailbox?: string, mailId?: string) => {
  const [mailThread, setMailThread] = useState<MailMessage[]>([]);
  const [isFetchingMailThread, setIsFetchingMailThread] = useState(false);
  useEffect(() => {
    if (mailAccount && mailbox && mailId) {
      setIsFetchingMailThread(true);
      mailPresenter.getMailThread(mailAccount, mailbox, mailId)
        .then((data) => setMailThread(data))
        .finally(() => setIsFetchingMailThread(false));
    } else {
      setMailThread([]);
    }
  }, [mailAccount, mailbox, mailId]);
  return { mailThread, isFetchingMailThread };
};
