import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AdminUser from '@domain/entities/AdminUser';

export enum AuthStateType {
  Unauthorized, // The user hasn't logged in
  LoggedIn, // The user has been logged in
}

interface AuthState {
  authStateType: AuthStateType,
  isLoggingIn: boolean, // to determine the user is in login progress
  currentUser?: AdminUser,
}

const initialState : AuthState = {
  authStateType: AuthStateType.Unauthorized,
  isLoggingIn: false,
};

export interface LoginPayload {
  username: string,
  password: string,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initialized: (state, action: PayloadAction<AdminUser>) => {
      const { payload: currentUser } = action;
      if (currentUser) {
        state.authStateType = AuthStateType.LoggedIn;
        state.currentUser = currentUser;
      } else {
        state.authStateType = AuthStateType.Unauthorized;
        state.currentUser = undefined;
      }
    },
    signIn: (state, action: PayloadAction<LoginPayload>) => {
      state.isLoggingIn = true;
    },
    signInSuccessfully: (state, action: PayloadAction<AdminUser>) => {
      state.authStateType = AuthStateType.LoggedIn;
      state.currentUser = action.payload;
      state.isLoggingIn = false;
    },
    signInFailed: (state) => {
      state.authStateType = AuthStateType.Unauthorized;
      state.isLoggingIn = false;
    },
    signOut: (state) => {
      state.authStateType = AuthStateType.Unauthorized;
      state.currentUser = undefined;
    },
  },
});

// Actions
export const authActions = authSlice.actions;

// Reducers
export const authReducers = authSlice.reducer;

export default { authActions, authReducers };
