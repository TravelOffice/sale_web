import { Page } from '@domain/entities/Page';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FacebookPage } from '@domain/entities/FacebookPage';
import { ZaloPage } from '@domain/entities/ZaloPage';

interface PageConnectionState {
  facebookPage?: Page,
  zaloPage?: Page,
  connectingFacebookPage: boolean,
  connectingZaloPage: boolean,
}

const initialState : PageConnectionState = {
  connectingFacebookPage: false,
  connectingZaloPage: false,
};

const pageConnectionSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    connectFacebookPage: (
      state,
      _action: PayloadAction<ConnectFacebookPageRequest>,
    ) => {
      state.connectingFacebookPage = true;
    },
    onFacebookPageConnected: (state, action: PayloadAction<FacebookPage>) => {
      state.facebookPage = action.payload;
    },
    onFacebookPageConnectCompleted: (state) => {
      state.connectingFacebookPage = false;
    },
    connectZaloPage: (state, _action: PayloadAction<ConnectZaloPageRequest>) => {
      state.connectingZaloPage = true;
    },
    onZaloPageConnected: (state, action: PayloadAction<ZaloPage>) => {
      const page = action.payload;
      state.zaloPage = {
        id: page.id,
        name: page.name,
        picture: page.avatar,
      };
    },
    onZaloPageConnectCompleted: (state) => {
      state.connectingZaloPage = false;
    },
  },
});

export type ConnectFacebookPageRequest = { userAccessToken: string, page: FacebookPage };
export type ConnectZaloPageRequest = { pageId: string, authorizationCode: string, state: string };

// Actions
export const pageConnectionActions = pageConnectionSlice.actions;

// Reducers
export const pageConnectionReducers = pageConnectionSlice.reducer;
