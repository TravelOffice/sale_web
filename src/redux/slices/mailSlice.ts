import { MailAccount } from '@domain/entities/mail/MailAccount';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';

export interface MailState {
  mailAccounts: MailAccount[],
  linkModalStatus: 'closed' | 'open' | 'linking' | 'finished',
}

const initialState: MailState = {
  mailAccounts: [],
  linkModalStatus: 'closed',
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
  },
});

export const mailActions = mailSlice.actions;

export const mailReducers = mailSlice.reducer;
