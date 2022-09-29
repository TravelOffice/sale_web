import { MailAccount } from '@domain/entities/mail/MailAccount';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import { MailMessage } from '@domain/entities/mail/MailMessage';
import { Mailbox } from '@domain/entities/mail/Mailbox';
import { MailMessageList } from '@domain/entities/mail/MailMessageList';
import { mailFlags } from '@utils/MailUtils';

export interface MailState {
  linkModalStatus: 'closed' | 'open' | 'linking' | 'finished',
  mailAccounts: MailAccount[],
  isFetchingMailAccounts: boolean,
  selectedMailAccount?: MailAccount,
  mailboxes: Mailbox[],
  isFetchingMailboxes: boolean,
  selectedMailboxId: string,
  mails: MailMessage[],
  nextToken?: string,
  isFetchingMails: boolean,
  selectedMail?: MailMessage,
}

const defaultMailboxId = 'INBOX';

const initialState : MailState = {
  linkModalStatus: 'closed',
  mailAccounts: [],
  isFetchingMailAccounts: false,
  mailboxes: [],
  isFetchingMailboxes: false,
  selectedMailboxId: defaultMailboxId,
  mails: [],
  isFetchingMails: false,
};

const mailSlice = createSlice({
  name: 'mail',
  initialState,
  reducers: {
    openLinkModal: (state) => {
      state.linkModalStatus = 'open';
    },
    closeLinkModal: (state) => {
      if (state.linkModalStatus === 'linking') {
        // Disable dismissing whenever an email is linking
        return;
      }
      state.linkModalStatus = 'closed';
    },
    linkMail: (state, _action: PayloadAction<LinkEmailFormData>) => {
      state.linkModalStatus = 'linking';
    },
    onMailAccountLinked: (state, action: PayloadAction<MailAccount>) => {
      state.mailAccounts.push(action.payload);
    },
    onLinkMailAccountCompleted: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        // Only updating status if linking email successfully
        state.linkModalStatus = 'finished';
      } else {
        // Back to previous state which allows the user edit configuration
        state.linkModalStatus = 'open';
      }
    },
    getMailAccounts: (state) => {
      state.isFetchingMailAccounts = true;
    },
    onMailAccountsFetched: (state, action: PayloadAction<MailAccount[]>) => {
      const accounts = action.payload;
      const [firstAccount] = accounts;
      state.isFetchingMailAccounts = false;
      state.mailAccounts = accounts;
      state.selectedMailAccount = firstAccount;
    },
    selectAccount: (state, action: PayloadAction<MailAccount>) => {
      state.selectedMailAccount = action.payload;
      state.selectedMailboxId = defaultMailboxId;
    },
    getMailboxes: (state, _action: PayloadAction<MailAccount>) => {
      state.isFetchingMailboxes = true;
    },
    onMailboxesFetched: (state, action: PayloadAction<Mailbox[]>) => {
      state.mailboxes = action.payload;
      state.isFetchingMailboxes = false;
    },
    selectMailbox: (state, action: PayloadAction<string>) => {
      state.selectedMailboxId = action.payload;
      state.selectedMail = undefined;
    },
    getMails: (state, _action: PayloadAction<{ mailAccount: MailAccount, mailboxId: string }>) => {
      state.isFetchingMails = true;
    },
    onGetMailsSuccessfully: (state, action: PayloadAction<MailMessageList>) => {
      const { mails, token } = action.payload;
      state.mails = mails;
      state.nextToken = token;
      state.isFetchingMails = false;
    },
    selectMail: (state, action: PayloadAction<MailMessage>) => {
      const mail = action.payload;
      state.selectedMail = mail;

      // Update unread
      // TODO: Replace by fetching from server
      if (mail.flags === mailFlags.recent) {
        const selectedMailbox = state.mailboxes.find((
          mailbox,
        ) => mailbox.name === state.selectedMailboxId);
        if (selectedMailbox) {
          selectedMailbox.unread -= 1;
        }
      }
    },
    unselectMail: (state) => {
      state.selectedMail = undefined;
    },
  },
});

// Actions
export const mailActions = mailSlice.actions;

// Reducers
export const mailReducers = mailSlice.reducer;
