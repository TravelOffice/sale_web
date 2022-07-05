import { Page } from '@domain/entities/Page';
import User from '@domain/entities/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

interface AuthState {
  session?: CognitoUserSession,
  currentUser?: User,
  idToken?: string,
  facebookPage?: Page,
  zaloPage?: Page
}

const initialState: AuthState = {
  session: undefined,
  currentUser: undefined,
  facebookPage: undefined,
  zaloPage: undefined,
};

export interface LoginPayload {
  username: string,
  password: string,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    attachSession: (state, action: PayloadAction<any>) => {
      state.idToken = action.payload.idToken.jwtToken;
      state.session = action.payload;
    },
    detachSession: (state) => {
      state.session = undefined;
      state.currentUser = undefined;
      state.idToken = undefined;
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    setLinkedPages: (state, action: PayloadAction<Array<Page>>) => {
      const linkedPages = action.payload;
      state.facebookPage = linkedPages.find((page) => page.platform === 'facebook');
      state.zaloPage = linkedPages.find((page) => page.platform === 'zalo');
    },
  },
});

// Actions
export const authActions = authSlice.actions;

// Reducers
export const authReducers = authSlice.reducer;

export default { authActions, authReducers };
