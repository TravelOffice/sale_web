import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AdminUser from '@domain/entities/AdminUser';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { toAdminUser } from '@utils/CommonUtils';
import { Page } from '@domain/entities/Page';

interface AuthState {
  session?: CognitoUserSession,
  currentUser?: AdminUser,
  idToken?: string,
  facebookPage?: Page,
  zaloPage?: Page
}

const initialState : AuthState = {
  session: undefined,
  currentUser: undefined,
  facebookPage: { id: '100945222539258', name: 'ABAT Travel Company' },
  zaloPage: { id: '652598983976304792', name: 'PYS Travel' },
};

export interface LoginPayload {
  username: string,
  password: string,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    attachSession: (state, action : PayloadAction<any>) => {
      state.idToken = action.payload.idToken.jwtToken;
      state.session = action.payload;
      state.currentUser = toAdminUser(action.payload.idToken.payload);
    },
    detachSession: (state) => {
      state.session = undefined;
      state.currentUser = undefined;
      state.idToken = undefined;
    },
  },
});

// Actions
export const authActions = authSlice.actions;

// Reducers
export const authReducers = authSlice.reducer;

export default { authActions, authReducers };
