import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AdminUser from '@domain/entities/AdminUser';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

interface AuthState {
  session?: CognitoUserSession,
  currentUser?: AdminUser,
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
    attachSession: (state, action : PayloadAction<CognitoUserSession>) => {
      state.session = action.payload;
    },
    detachSession: (state) => {
      state.session = undefined;
      state.currentUser = undefined;
    },
  },
});

// Actions
export const authActions = authSlice.actions;

// Reducers
export const authReducers = authSlice.reducer;

export default { authActions, authReducers };
