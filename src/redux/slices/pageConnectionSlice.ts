import { Page } from '@domain/entities/Page';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FacebookPage } from '@domain/entities/FacebookPage';

interface PageConnectionState {
  facebookPage?: Page,
  zaloPage?: Page,
  connectingFacebookPage: boolean,
}

const initialState : PageConnectionState = {
  connectingFacebookPage: false,
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
  },
});

export type ConnectFacebookPageRequest = { userAccessToken: string, page: FacebookPage };

// Actions
export const pageConnectionActions = pageConnectionSlice.actions;

// Reducers
export const pageConnectionReducers = pageConnectionSlice.reducer;
