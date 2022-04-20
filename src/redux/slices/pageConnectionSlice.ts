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
      _action: PayloadAction<{ userAccessToken: string, page: FacebookPage }>,
    ) => {
      state.connectingFacebookPage = true;
    },
    onFacebookPageConnected: (state, action: PayloadAction<FacebookPage>) => {
      const { payload } = action;
      state.facebookPage = payload;
      state.connectingFacebookPage = false;
    },
  },
});

// Actions
export const pageConnectionActions = pageConnectionSlice.actions;

// Reducers
export const pageConnectionReducers = pageConnectionSlice.reducer;
