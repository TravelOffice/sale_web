import { MailAccount } from '@domain/entities/mail/MailAccount';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import { MailMessage } from '@domain/entities/mail/MailMessage';
import { Mailbox } from '@domain/entities/mail/Mailbox';
import { MailMessageList } from '@domain/entities/mail/MailMessageList';
import { MAIL_PAGE_SIZE, mailFlags } from '@utils/MailUtils';
import { SendMailFormData } from '@domain/entities/mail/SendMailFormData';
import { MailAttachment } from '@domain/entities/mail/MailAttachment';
import { ComposeProps } from '@features/Mail/components/ComposeModal';
import { MailSearchResult } from '@domain/entities/mail/MailSearchResult';

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
  fetchingMailsFailed: boolean,
  selectedMail?: MailMessage,
  isLoadingMoreMessages: boolean,
  loadableMore: boolean,
  composeModalOpen: boolean,
  composeModalData: ComposeProps,
  composeType: 'new' | 'reply' | 'replyAll' | 'forward';
  isSendingMail: boolean,
  uploadedAttachments: Record<string, MailAttachment>,
  selectedMailSearchResult?: MailSearchResult,
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
  fetchingMailsFailed: false,
  isLoadingMoreMessages: false,
  loadableMore: false,
  composeModalOpen: false,
  composeModalData: {} as ComposeProps,
  composeType: 'new',
  isSendingMail: false,
  uploadedAttachments: {},
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
      state.selectedMail = undefined;
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
      state.loadableMore = mails.length === MAIL_PAGE_SIZE;
      state.fetchingMailsFailed = false;
    },
    onGetMailsFailed: (state) => {
      state.mails = [];
      state.isFetchingMails = false;
      state.loadableMore = false;
      state.fetchingMailsFailed = true;
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
    loadMore: (state) => {
      state.isLoadingMoreMessages = true;
    },
    onMoreMessagedLoaded: (state, action: PayloadAction<MailMessageList>) => {
      const { mails, token } = action.payload;
      state.mails = state.mails.concat(mails);
      state.nextToken = token;
      state.loadableMore = mails.length === MAIL_PAGE_SIZE;
    },
    onLoadMoreMessageCompleted: (state) => {
      state.isLoadingMoreMessages = false;
    },
    openComposeModal: (state, action: PayloadAction<ComposeProps>) => {
      state.composeModalOpen = true;
      state.composeModalData = action.payload;
    },
    toggleComposeModal: (state) => {
      state.composeModalOpen = !state.composeModalOpen;
    },
    sendMail: (state, _actionPayload: PayloadAction<SendMailFormData>) => {
      state.isSendingMail = true;
    },
    onSendMailCompleted: (state, action: PayloadAction<boolean>) => {
      state.isSendingMail = false;
      state.composeModalOpen = !action.payload;
    },
    uploadAttachment: (state, action: PayloadAction<File>) => {
      const file = action.payload;
      state.uploadedAttachments[file.name] = {
        name: file.name,
        mimeType: file.type,
        size: file.size,
        uploading: true,
      } as MailAttachment;
    },
    onUploadAttachmentSuccessfully: (state, action: PayloadAction<MailAttachment>) => {
      const attachment = action.payload;
      state.uploadedAttachments[attachment.name] = attachment;
    },
    setUploadAttachments: (state, action: PayloadAction<MailAttachment[]>) => {
      action.payload.forEach((attachment) => {
        state.uploadedAttachments[attachment.name] = attachment;
      });
    },
    removeAttachment: (state, action: PayloadAction<string>) => {
      const fileName = action.payload;
      delete state.uploadedAttachments[fileName];
    },
    resetComposeModal: (state) => {
      state.uploadedAttachments = {};
      state.isSendingMail = false;
      state.composeModalOpen = false;
      state.composeModalData = {} as ComposeProps;
    },
    selectMailResult: (state, action: PayloadAction<MailSearchResult | undefined>) => {
      state.selectedMailSearchResult = action.payload;
    },
    onNewMailMessages: (state, action: PayloadAction<MailMessage[]>) => {
      state.mails = state.mails.concat(action.payload);
    },
    draftMail: (_state, _actionPayload: PayloadAction<SendMailFormData>) => {},
  },
});

// Actions
export const mailActions = mailSlice.actions;

// Reducers
export const mailReducers = mailSlice.reducer;
