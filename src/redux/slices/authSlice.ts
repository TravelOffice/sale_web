import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AdminUser from '@domain/entities/AdminUser';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { toAdminUser } from '@utils/CommonUtils';

interface AuthState {
  session?: CognitoUserSession,
  currentUser?: AdminUser,
  idToken?: string,
}

const initialState : AuthState = {
  session: undefined,
  currentUser: undefined,
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
