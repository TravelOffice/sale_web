import React from 'react';
// ** Styles
import '@styles/react/apps/app-table.scss';
import StatsHorizontal from '@components/Widgets/Stats/StatsHorizontal';
import {
  User, UserCheck, Users, UserX,
} from 'react-feather';
import { Col, Row } from 'reactstrap';
import i18n from '@config/i18n';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { UserStatusEnum } from '@domain/entities/User';
import UserTable from './UserTable';

const UserList = () => {
  const allUsers = useSelector((state: RootState) => state.user.allUsers);
  return (
    <div className="to-table-container">
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle={i18n.t('USER.TOTAL_USERS')}
            icon={<Users size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{allUsers.length}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle={i18n.t('USER.ONLINE')}
            icon={<User size={20} />}
            renderStats={(
              <h3 className="fw-bolder mb-75">{allUsers.filter((user) => user.status === UserStatusEnum.online).length}</h3>)}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle={i18n.t('USER.OFFLINE')}
            icon={<UserCheck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{allUsers.filter((user) => user.status === UserStatusEnum.offline).length}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle={i18n.t('USER.INACTIVE')}
            icon={<UserX size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{allUsers.filter((user) => user.status === UserStatusEnum.inactive).length}</h3>}
          />
        </Col>
      </Row>
      <UserTable />
    </div>
  );
};
export default UserList;
