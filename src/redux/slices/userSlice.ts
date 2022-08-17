/* eslint-disable no-unused-vars */
import {
  User, FetchAllUsersResponse, UserStatusType,
} from '@domain/entities/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HandleDataState } from './others/HandleDataState';

interface UserState {
  allUsers: User[],
  fetchAllUsersError?: FetchAllUsersResponse,
  fetchAllUsersState: HandleDataState,
  openSidebar: boolean,
}

const initialState : UserState = {
  allUsers: [],
  fetchAllUsersError: undefined,
  fetchAllUsersState: 'init',
  openSidebar: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Get all Users and related actions
    getAllUsers: (state) => {
      state.fetchAllUsersState = 'loading';
      state.fetchAllUsersError = undefined;
    },
    setAllUsers: (state, action: PayloadAction<User[]>) => {
      state.fetchAllUsersState = 'finished';
      state.allUsers = action.payload;
    },
    setFetchAllUserError: (state) => {
      state.fetchAllUsersState = 'error';
    },
    setOpenSidebar: (state, action: PayloadAction<boolean>) => {
      state.openSidebar = action.payload;
    },
    resetSidebar: (state) => {
      state.openSidebar = false;
    },
  },
});

// Actions
export const userActions = userSlice.actions;

// Reducers
export const userReducers = userSlice.reducer;

export default { userActions, userReducers };
