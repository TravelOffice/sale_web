// ** React Imports
import React, { useEffect } from 'react';
// ** Styles
import '@styles/react/apps/app-table.scss';

// ** Roles Components
import i18n from '@config/i18n';
import { rolePermissionActions } from '@redux/slices/rolePermissionSlice';
import { userActions } from '@redux/slices/userSlice';
import { RootState } from '@redux/store';
import {
  useDispatch, useSelector,
} from 'react-redux';
import RoleCards from './RoleCards';
import RoleUserTable from './RoleUserTable';

const Roles = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state: RootState) => state.user.allUsers);
  const groupPermissions = useSelector((state: RootState) => state.rolePermission.groupPermissions);
  const allRoles = useSelector((state: RootState) => state.rolePermission.allRoles);

  useEffect(() => {
    dispatch(userActions.getAllUsers());
    dispatch(rolePermissionActions.getAllRoles());
    dispatch(rolePermissionActions.getAllPermissions());
  }, []);

  return (
    <>
      <h3>{i18n.t('ROLE-PERMISSION.ROLE_LIST_TITLE')}</h3>
      <RoleCards
        users={allUsers}
        roles={allRoles}
        permissions={groupPermissions}
      />
      <h3 className="mt-50">{i18n.t('ROLE-PERMISSION.ROLE_CARD_TITLE')}</h3>
      <div className="to-table-container">
        <RoleUserTable
          users={allUsers}
          roles={allRoles}
        />
      </div>
    </>
  );
};

export default Roles;
