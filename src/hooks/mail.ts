import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { useEffect } from 'react';
import { mailActions } from '@redux/slices/mailSlice';

/**
 * Hook to get selected mail account
 */
export const useSelectedMailAccount = () => useSelector((
  state: RootState,
) => state.mail.selectedMailAccount);

/**
 * Hook to get selected mailbox
 */
export const useSelectedMailbox = () => useSelector((
  state: RootState,
) => state.mail.selectedMailboxId);

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
  useEffect(() => {
    if (selectedMailAccount && selectedMailboxId) {
      // Fetch mail messages whenever either mail account of mailbox changed
      dispatch((mailActions.getMails({
        mailAccount: selectedMailAccount,
        mailboxId: selectedMailboxId,
      })));
    }
  }, [selectedMailAccount, selectedMailboxId, dispatch]);
  return mails;
};
