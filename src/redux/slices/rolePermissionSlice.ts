import {
  FetchAllPermissionsResponse,
  FetchAllRolesResponse,
  GroupPermission,
  Role,
  RoleCreateUpdatePayload,
} from '@domain/entities/RolePermission';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HandleDataState } from './others/HandleDataState';

interface RoleState {
  allRoles: Role[],
  fetchAllRolesError?: FetchAllRolesResponse,
  fetchAllRolesState: HandleDataState,
  groupPermissions: GroupPermission[],
  fetchAllPermissionsError?: FetchAllPermissionsResponse,
  fetchAllPermissionsState: HandleDataState,
  createOrUpdateRoleLoading: boolean;
  openModal: boolean,
}

const initialState: RoleState = {
  allRoles: [],
  fetchAllRolesError: undefined,
  fetchAllRolesState: 'init',
  groupPermissions: [],
  fetchAllPermissionsError: undefined,
  fetchAllPermissionsState: 'init',
  createOrUpdateRoleLoading: false,
  openModal: false,
};

const rolePermissionSlice = createSlice({
  name: 'Role',
  initialState,
  reducers: {
    // Get all Roles and related actions
    getAllRoles: (state) => {
      state.fetchAllRolesState = 'loading';
      state.fetchAllRolesError = undefined;
    },
    setAllRoles: (state, action: PayloadAction<Role[]>) => {
      state.fetchAllRolesState = 'finished';
      state.allRoles = action.payload;
    },
    setFetchAllRolesError: (state) => {
      state.fetchAllRolesState = 'error';
    },
    getAllPermissions: (state) => {
      state.fetchAllPermissionsState = 'loading';
      state.fetchAllPermissionsError = undefined;
    },
    setAllPermissions: (state, action: PayloadAction<GroupPermission[]>) => {
      state.fetchAllPermissionsState = 'finished';
      state.groupPermissions = action.payload;
    },
    setFetchAllPermissionsError: (state) => {
      state.fetchAllPermissionsState = 'error';
    },
    addRole: (state, _action: PayloadAction<RoleCreateUpdatePayload>) => {
      state.createOrUpdateRoleLoading = true;
    },
    onRoleAdded: (state, _action: PayloadAction<RoleCreateUpdatePayload>) => {
      state.createOrUpdateRoleLoading = false;
      state.openModal = false;
    },
    onRoleAddedError: (state) => {
      state.createOrUpdateRoleLoading = false;
    },
    updateRole: (state, _action: PayloadAction<RoleCreateUpdatePayload>) => {
      state.createOrUpdateRoleLoading = true;
    },
    onRoleUpdated: (state, _action: PayloadAction<RoleCreateUpdatePayload>) => {
      state.createOrUpdateRoleLoading = false;
      state.openModal = false;
    },
    onRoleUpdatedError: (state) => {
      state.createOrUpdateRoleLoading = false;
    },
    setOpenModal: (state, action: PayloadAction<boolean>) => {
      state.openModal = action.payload;
    },
  },
});

// Actions
export const rolePermissionActions = rolePermissionSlice.actions;

// Reducers
export const rolePermissionReducers = rolePermissionSlice.reducer;

export default { rolePermissionActions, rolePermissionReducers };
