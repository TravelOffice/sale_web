import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FacebookPage } from '@domain/entities/FacebookPage';

interface PageConnectionState {
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
    onFacebookPageConnectCompleted: (state) => {
      state.connectingFacebookPage = false;
    },
    connectZaloPage: (state, _action: PayloadAction<ConnectZaloPageRequest>) => {
      state.connectingZaloPage = true;
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
