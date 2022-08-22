// ** React Imports
import Table from '@components/Table/Table';
import i18n from '@config/i18n';
// ** Store & Actions
import { RootState } from '@redux/store';
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// ** Third Party Components
// ** Reactstrap Imports
import { Role } from '@domain/entities/RolePermission';
import { User } from '@domain/entities/User';
import { userActions } from '@redux/slices/userSlice';
import { userColumns } from './RoleUserColumns';

interface UserTableProps {
  users: Array<User>
  roles: Array<Role>
}

const UserTable = (props: UserTableProps) => {
  const { users, roles } = props;
  // ** Store Vars
  const [usersFiltered, setUsersFiltered] = useState<User[]>([]);
  const dispatch = useDispatch();
  // ** States
  const [currentRole, setCurrentRole] = useState('');
  const fetchUsersState = useSelector(
    (state: RootState) => state.user.fetchAllUsersState,
  );

  const { getAllUsers } = userActions;

  // ** User filter options
  const roleOptions = [
    { value: '', label: i18n.t('COMMON.SELECT') },
  ].concat(roles.map((role) => ({
    label: role.name,
    value: role.name,
  })));

  const handlerFilterUsers = (listUsers: User[], role?: string) => {
    let filteredUsers = listUsers;
    if (role) {
      filteredUsers = filteredUsers.filter(
        (user) => user.roles.includes(role.toUpperCase()),
      );
    }
    return filteredUsers;
  };

  const onRefresh = useCallback(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    const filteredUsers = handlerFilterUsers(users, currentRole);
    setUsersFiltered(filteredUsers);
  }, [currentRole, users]);

  useEffect(() => {
    dispatch(userActions.resetSidebar());
    dispatch(getAllUsers());
  }, []);

  return (
    <>
      <Table<User>
        data={usersFiltered}
        fetchDataState={fetchUsersState}
        columns={userColumns}
        searchableColumns={['email', 'username', 'phoneNumber']}
        sortColumnDefault="createdAt"
        onRowClicked={() => {}}
        onPageChange={() => {}}
        onRefresh={onRefresh}
        handleSelectChange={(value) => { setCurrentRole(value); }}
        selectOptions={roleOptions}
      />
    </>
  );
};

export default UserTable;
