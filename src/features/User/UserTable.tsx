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
import { User } from '@domain/entities/User';
import { userColumns } from './UserColumns';
import UserSidebar from './UserSidebar';

const UserTable = () => {
  // ** Store Vars
  const allUsers = useSelector((state: RootState) => state.user.allUsers);
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
  const statusOptions = [
    { value: '', label: i18n.t('COMMON.SELECT'), number: 0 },
    { value: 'online', label: i18n.t('USER.ONLINE'), number: 1 },
    { value: 'busy', label: i18n.t('USER.BUSY'), number: 2 },
    { value: 'away', label: i18n.t('USER.AWAY'), number: 3 },
    { value: 'offline', label: i18n.t('USER.OFFLINE'), number: 4 },
    { value: 'inactive', label: i18n.t('USER.INACTIVE'), number: 5 },
  ];

  // ** User filter options
  const roleOptions = [
    { value: '', label: i18n.t('COMMON.SELECT'), number: 0 },
    { value: 'admin', label: 'Admin', number: 1 },
    { value: 'sale', label: 'Sale', number: 2 },
    { value: 'employee', label: 'Employee', number: 3 },
    { value: 'root', label: 'Root', number: 4 },
  ];

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
                options={statusOptions}
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
                options={roleOptions}
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
        onRowClicked={(user) => {
          setOpenSidebar(true);
          dispatch(userActions.selectUser(user));
        }}
        onPageChange={() => {}}
        onRefresh={onRefresh}
      />
      <UserSidebar
        open={openSidebar}
        setOpenSidebar={setOpenSidebar}
        toggleSidebar={toggleUserSidebar}
        user={selectedUser}
        onClosed={() => dispatch(userActions.unSelectUser())}
      />
    </>

  );
};

export default UserTable;
