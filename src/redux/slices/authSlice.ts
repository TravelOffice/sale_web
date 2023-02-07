/* eslint-disable no-unused-vars */
import { Page } from '@domain/entities/chat/Page';
import { User, RoleEnum } from '@domain/entities/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

type AuthStatus = 'checking' | 'notLoggedIn' | 'fetchingUserInfo' | 'loggedIn';

export type AuthPayload = { status: AuthStatus, idToken?: string };

interface AuthState {
  session?: CognitoUserSession,
  currentUser?: User,
  idToken?: string,
  linkedPages: Page[],
  initialized: boolean,
  isAdmin: boolean,
  authStatus: AuthStatus,
}

const initialState: AuthState = {
  session: undefined,
  currentUser: undefined,
  linkedPages: [],
  initialized: false,
  isAdmin: false,
  authStatus: 'checking',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeAuthStatus: (state, action: PayloadAction<AuthPayload>) => {
      const { status, idToken } = action.payload;
      state.authStatus = status;
      state.idToken = idToken;
    },
    attachSession: (state, action: PayloadAction<string>) => {
      state.idToken = action.payload;
    },
    detachSession: (state) => {
      state.session = undefined;
      state.currentUser = undefined;
      state.idToken = undefined;
    },
    refreshSession: (state, action) => {
      state.idToken = action.payload.idToken.jwtToken;
      state.session = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAdmin = state.currentUser.roles.includes(RoleEnum.ADMIN)
                      || state.currentUser.roles.includes(RoleEnum.ROOT);
    },
    setLinkedPages: (state, action: PayloadAction<Array<Page>>) => {
      state.linkedPages = action.payload;
    },
    getLinkedPages: (_state) => { },
    onInitialCompleted: (state) => {
      state.initialized = true;
      state.authStatus = 'loggedIn';
    },
  },
});

// Actions
export const authActions = authSlice.actions;

// Reducers
export const authReducers = authSlice.reducer;
