import { rolePermissionPresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';
import i18n from '@config/i18n';
import { GroupPermission, Role, RoleCreateUpdatePayload } from '@domain/entities/RolePermission';
import { rolePermissionActions } from '@redux/slices/rolePermissionSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

function* getAllRoles() {
  try {
    const roles: Role[] = yield call(
      rolePermissionPresenter.getAllRoles,
    );
    yield put(rolePermissionActions.setAllRoles(roles));
  } catch (error: any) {
    toasty.show({
      title: i18n.t('COMMON.ERROR'),
      type: 'error',
      message: `${error.message}`,
    });
    yield put(rolePermissionActions.setFetchAllRolesError());
  }
}

function* getAllPermissions() {
  try {
    const permissions: GroupPermission[] = yield call(
      rolePermissionPresenter.getAllPermissions,
    );
    yield put(rolePermissionActions.setAllPermissions(permissions));
  } catch (error: any) {
    toasty.show({
      title: i18n.t('COMMON.ERROR'),
      type: 'error',
      message: `${error.message}`,
    });
    yield put(rolePermissionActions.setFetchAllPermissionsError());
  }
}

function* addRole(action: PayloadAction<RoleCreateUpdatePayload>) {
  try {
    const role = action.payload;
    const addedRole: Role = yield call(rolePermissionPresenter.addRole, role);
    yield put(rolePermissionActions.onRoleAdded(role));
    toasty.show({
      title: i18n.t('COMMON.SUCCESS'),
      type: 'success',
      message: i18n.t('ROLE-PERMISSION.ADD_ROLE_SUCCESSFULLY', { roleName: addedRole.name }),
    });
    // Re-fetch all roles
    const roles: Role[] = yield call(rolePermissionPresenter.getAllRoles);
    yield put(rolePermissionActions.setAllRoles(roles));
  } catch (error: any) {
    toasty.show({
      title: i18n.t('COMMON.ERROR'),
      type: 'error',
      message: `${error.message}`,
    });
    yield put(rolePermissionActions.onRoleAddedError());
  }
}

function* updateRole(action: PayloadAction<RoleCreateUpdatePayload>) {
  try {
    const role = action.payload;
    const updatedRole: Role = yield call(rolePermissionPresenter.updateRole, role);
    yield put(rolePermissionActions.onRoleUpdated(role));
    toasty.show({
      title: i18n.t('COMMON.SUCCESS'),
      type: 'success',
      message: i18n.t('ROLE-PERMISSION.UPDATE_ROLE_SUCCESSFULLY', { roleName: updatedRole.name }),
    });
    // Re-fetch all roles
    const roles: Role[] = yield call(rolePermissionPresenter.getAllRoles);
    yield put(rolePermissionActions.setAllRoles(roles));
  } catch (error: any) {
    toasty.show({
      title: i18n.t('COMMON.ERROR'),
      type: 'error',
      message: `${error.message}`,
    });
    yield put(rolePermissionActions.onRoleUpdatedError());
  }
}

export default function* rolePermissionSaga() {
  yield all([
    takeLatest(rolePermissionActions.getAllRoles, getAllRoles),
    takeLatest(rolePermissionActions.getAllPermissions, getAllPermissions),
    takeLatest(rolePermissionActions.addRole, addRole),
    takeLatest(rolePermissionActions.updateRole, updateRole),
  ]);
}
