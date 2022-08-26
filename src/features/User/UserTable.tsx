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
import Select from 'react-select';
// ** Reactstrap Imports
import {
  Card, CardBody, CardHeader, CardTitle, Col, Label, Row,
} from 'reactstrap';
import { userActions } from '@redux/slices/userSlice';
import { User, UserStatusOption, userStatusTypes } from '@domain/entities/User';
import { rolePermissionActions } from '@redux/slices/rolePermissionSlice';
import { RoleOption } from '@domain/entities/RolePermission';
import { userColumns } from './UserColumns';
import UserSidebar from './UserSidebar';

const UserTable = () => {
  // ** Store Vars
  const allUsers = useSelector((state: RootState) => state.user.allUsers);
  const allRoles = useSelector((state: RootState) => state.rolePermission.allRoles);
  const selectedUser = useSelector((state: RootState) => state.user.selectedUser);
  const [usersFiltered, setUsersFiltered] = useState<User[]>([]);
  const dispatch = useDispatch();
  // ** States
  const openSidebar = useSelector((state: RootState) => state.user.openSidebar);
  const [currentStatus, setCurrentStatus] = useState({ value: '', label: i18n.t('COMMON.SELECT'), number: 0 });
  const [currentRole, setCurrentRole] = useState({ value: '', label: i18n.t('COMMON.SELECT'), number: 0 });
  const fetchUsersState = useSelector(
    (state: RootState) => state.user.fetchAllUsersState,
  );

  const { getAllUsers, setOpenSidebar: setOpenSidebarAction } = userActions;

  // ** Function to toggle sidebar
  const setOpenSidebar = (open: boolean) => dispatch(setOpenSidebarAction(open));
  const toggleUserSidebar = () => setOpenSidebar(!openSidebar);

  // ** User filter options
  const statusOptions: Array<UserStatusOption> = userStatusTypes.map((status, index) => ({
    label: status,
    value: status,
    number: index,
  }));

  const defaultOption = [{ value: '', label: i18n.t('COMMON.SELECT'), number: -1 }];

  // ** User filter options
  const roleOptions: Array<RoleOption> = allRoles.map((role, index) => ({
    label: role.name,
    value: role.name,
    number: index,
  }));

  const handlerFilterUsers = (users: User[], role?: string, status?: string) => {
    let filteredUsers = users;
    if (role) {
      filteredUsers = filteredUsers.filter(
        (user) => user.roles.includes(role.toUpperCase()),
      );
    }
    if (status) {
      filteredUsers = filteredUsers.filter((user) => user.status === status);
    }
    return filteredUsers;
  };

  const onRefresh = useCallback(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    const users = handlerFilterUsers(allUsers, currentRole.value, currentStatus.value);
    setUsersFiltered(users);
  }, [currentStatus, currentRole, allUsers]);

  useEffect(() => {
    dispatch(userActions.resetSidebar());
    dispatch(getAllUsers());
    dispatch(rolePermissionActions.getAllRoles());
  }, []);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">{i18n.t('COMMON.FILTERS')}</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="status-select">{i18n.t('COMMON.STATUS')}</Label>
              <Select
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={defaultOption.concat(statusOptions)}
                value={currentStatus}
                onChange={(data) => {
                  setCurrentStatus(data!);
                }}
              />
            </Col>
            <Col md="4">
              <Label for="status-select">{i18n.t('USER.ROLE')}</Label>
              <Select
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={defaultOption.concat(roleOptions)}
                value={currentRole}
                onChange={(data) => {
                  setCurrentRole(data!);
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Table<User>
        data={usersFiltered}
        fetchDataState={fetchUsersState}
        columns={userColumns}
        searchableColumns={['email', 'phoneNumber']}
        toggleAddDataSidebar={toggleUserSidebar}
        sortColumnDefault="createdAt"
        onPageChange={() => {}}
        onRefresh={onRefresh}
      />
      <UserSidebar
        open={openSidebar}
        setOpenSidebar={setOpenSidebar}
        toggleSidebar={toggleUserSidebar}
        user={selectedUser}
        onClosed={() => dispatch(userActions.unSelectUser())}
        roleOptions={roleOptions}
      />
    </>

  );
};

export default UserTable;
