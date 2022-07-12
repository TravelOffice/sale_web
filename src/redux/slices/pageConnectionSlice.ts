import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FacebookPageProfile } from '@domain/entities/chat/facebook/FacebookPageProfile';
import { Page } from '@domain/entities/chat/Page';
import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';

interface PageConnectionState {
  connecting: Record<ChatPlatform, boolean>
}

const initialState: PageConnectionState = {
  connecting: {
    facebook: false,
    zalo: false,
    telegram: false,
  },
};

const pageConnectionSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    connectPage: (state, action: PayloadAction<ConnectPageRequest>) => {
      const { platform } = action.payload;
      state.connecting[platform] = true;
    },
    onPageConnected: (state, action: PayloadAction<ChatPlatform>) => {
      const platform = action.payload;
      state.connecting[platform] = false;
    },
    unlinkPage: (_state, _action: PayloadAction<Page>) => {
    },
  },
});

export type ConnectFacebookPageRequest = { userAccessToken: string, page: FacebookPageProfile };
export type ConnectZaloPageRequest = { pageId: string, authorizationCode: string, state: string };
export type ConnectTelegramPageRequest = { botToken: string };

export type ConnectPage<P extends ChatPlatform> = {
  platform: P,
  data: P extends 'facebook' ? ConnectFacebookPageRequest
    : P extends 'zalo' ? ConnectZaloPageRequest
      : P extends 'telegram' ? ConnectTelegramPageRequest
        : any
};

export type ConnectPageRequest = { [K in ChatPlatform]: ConnectPage<K> }[ChatPlatform];

// Actions
export const pageConnectionActions = pageConnectionSlice.actions;

// Reducers
export const pageConnectionReducers = pageConnectionSlice.reducer;
