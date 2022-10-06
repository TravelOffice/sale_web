/* eslint-disable no-unused-vars */
import {
  User, FetchAllUsersResponse, UserStatusType,
} from '@domain/entities/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HandleDataState } from './others/HandleDataState';

interface UserState {
  createOrUpdateUserLoading: any;
  allUsers: User[],
  selectedUser?: User,
  fetchAllUsersError?: FetchAllUsersResponse,
  fetchAllUsersState: HandleDataState,
  openSidebar: boolean,
}

const initialState : UserState = {
  allUsers: [],
  fetchAllUsersError: undefined,
  fetchAllUsersState: 'init',
  openSidebar: false,
  createOrUpdateUserLoading: false,
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
    getUser: (state, _action: PayloadAction<string>) => {
    },
    addUser: (state, _action: PayloadAction<Partial<User>>) => {
      state.createOrUpdateUserLoading = true;
    },
    onUserAdded: (state, _action: PayloadAction<User>) => {
      state.createOrUpdateUserLoading = false;
      state.openSidebar = false;
    },
    onUserAddedError: (state) => {
      state.createOrUpdateUserLoading = false;
    },
    updateUser: (state, _action: PayloadAction<Partial<User>>) => {
      state.createOrUpdateUserLoading = true;
    },
    onUserUpdated: (state, _action: PayloadAction<User>) => {
      state.createOrUpdateUserLoading = false;
      state.openSidebar = false;
    },
    onUserUpdatedError: (state) => {
      state.createOrUpdateUserLoading = false;
    },
    deleteUser: (state, _action: PayloadAction<User>) => {},
    selectUser: (state, action: PayloadAction<User | undefined>) => {
      state.selectedUser = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
    unSelectUser: (state) => {
      state.selectedUser = undefined;
      state.openSidebar = false;
    },
    setOpenSidebar: (state, action: PayloadAction<boolean>) => {
      state.openSidebar = action.payload;
    },
    resetSidebar: (state) => {
      state.openSidebar = false;
      state.createOrUpdateUserLoading = false;
      state.selectedUser = undefined;
    },
  },
});

// Actions
export const userActions = userSlice.actions;

// Reducers
export const userReducers = userSlice.reducer;

export default { userActions, userReducers };
