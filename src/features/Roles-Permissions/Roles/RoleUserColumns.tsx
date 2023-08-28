import React from 'react';
// ** Custom Components
import Avatar, { AvatarColor } from '@components/Avatar/Avatar';
// ** i18n import
import i18n from '@config/i18n';
import { User } from '@domain/entities/User';
import Images from '@themes/Images';
import { TableColumn } from 'react-data-table-component';
// ** Icons Imports
import { Eye } from 'react-feather';
// ** React Imports
import { Link } from 'react-router-dom';
// ** Reactstrap Imports
import { Badge } from 'reactstrap';
import { generateUserDisplayName } from '@utils/UserUtils';

const statusObj = {
  away: 'light-primary',
  busy: 'light-warning',
  online: 'light-success',
  offline: 'light-secondary',
  inactive: 'light-secondary',
};

// ** Renders Client Columns
const renderClient = (row: User) => {
  const states: { [key: string]: AvatarColor } = {
    away: 'light-primary',
    busy: 'light-warning',
    online: 'light-success',
    offline: 'light-secondary',
    inactive: 'light-secondary',
  };
  const color: AvatarColor = states[row.status || 'offline'];

  if (row.avatar && row.avatar.length) {
    return (
      <Avatar
        img={row.avatar || Images.defaultAvatar}
        className="me-1"
        imgHeight="32"
        imgWidth="32"
        status={row.status}
      />
    );
  }
  return <Avatar color={color} className="me-1" content={row.username} />;
};

// eslint-disable-next-line import/prefer-default-export
export const userColumns: TableColumn<User>[] = [
  {
    name: i18n.t('USER.NAME'),
    sortable: true,
    minWidth: '300px',
    sortField: 'fullName',
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {renderClient(row)}
        <div className="d-flex flex-column">
          <Link
            to={`/apps/user/view/${row.username}`}
            className="user_name text-truncate text-body"
          >
            <span
              className="fw-bolder"
            >
              {generateUserDisplayName(row)}
            </span>
          </Link>
          <small className="text-truncate text-muted mb-0">{row.email}</small>
        </div>
      </div>
    ),
  },
  {
    name: i18n.t('USER.ROLE'),
    minWidth: '150px',
    sortable: true,
    sortField: 'role',
    cell: (row: User) => <span className="text-capitalize">{row.roles.join(',')}</span>,
  },
  {
    name: i18n.t('USER.PHONE'),
    minWidth: '150px',
    sortable: true,
    sortField: 'phone',
    cell: (row: User) => <span className="text-capitalize">{row.phoneNumber}</span>,
  },
  {
    name: i18n.t('USER.EMAIL'),
    minWidth: '150px',
    sortable: true,
    sortField: 'birthday',
    cell: (row: User) => <span>{row.email}</span>,
  },
  {
    name: i18n.t('COMMON.STATUS'),
    minWidth: '150px',
    sortable: true,
    sortField: 'status',
    cell: (row: User) => (
      <Badge className="text-capitalize" color={statusObj[row.status || 'offline']} pill>
        {row.status && i18n.t(`USER.${row.status.toUpperCase()}`)}
      </Badge>
    ),
  },
  {
    name: i18n.t('COMMON.ACTIONS'),
    minWidth: '50px',
    cell: (row: User) => (
      <Link to={`/apps/user/view/${row.username}`}>
        <Eye className="font-medium-3 text-body" />
      </Link>
    ),
  },
];
