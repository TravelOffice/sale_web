/* eslint-disable no-unused-vars */
import { Page } from '@domain/entities/chat/Page';
import User from '@domain/entities/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

interface AuthState {
  session?: CognitoUserSession,
  currentUser?: User,
  idToken?: string,
  linkedPages: Page[],
  initialized: boolean,
}

const initialState: AuthState = {
  session: undefined,
  currentUser: undefined,
  linkedPages: [],
  initialized: false,
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
      state.linkedPages = action.payload;
    },
    getLinkedPages: (state) => { },
    onInitialCompleted: (state) => {
      state.initialized = true;
    },
  },
});

// Actions
export const authActions = authSlice.actions;

// Reducers
export const authReducers = authSlice.reducer;

export default { authActions, authReducers };
