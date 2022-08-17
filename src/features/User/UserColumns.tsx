// ** Custom Components
import Avatar, { AvatarColor } from '@components/Avatar/Avatar';
// ** i18n import
import i18n from '@config/i18n';
import { User } from '@domain/entities/User';
import Images from '@themes/Images';
import React, { MouseEventHandler } from 'react';
import { TableColumn } from 'react-data-table-component';
// ** Icons Imports
import {
  AlertTriangle,
  Archive, FileText, MoreVertical, Trash2,
} from 'react-feather';
// ** React Imports
import { Link } from 'react-router-dom';
// ** Reactstrap Imports
import {
  Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';

const statusObj = {
  away: 'light-primary',
  busy: 'light-warning',
  online: 'light-success',
  offline: 'light-secondary',
  inactive: 'light-secondary',
};

// ** Renders Client Columns
const renderClient = (row: User) => {
  const states : { [key: string] : AvatarColor } = {
    away: 'light-primary',
    busy: 'light-warning',
    online: 'light-success',
    offline: 'light-secondary',
    inactive: 'light-secondary',
  };
  const color : AvatarColor = states[row.status];

  if (row.avatar && row.avatar.length) {
    return <Avatar img={row.avatar || Images.defaultAvatar} className="me-1" imgHeight="32" imgWidth="32" status="online" />;
  }
  return <Avatar color={color || 'primary'} className="me-1" content={row.username || 'John Doe'} />;
};

// eslint-disable-next-line import/prefer-default-export
export const userColumns: TableColumn<User>[] = [
  {
    name: i18n.t('USER.NAME'),
    sortable: true,
    minWidth: '300px',
    sortField: 'fullName',
    selector: (row) => row.username,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {renderClient(row)}
        <div className="d-flex flex-column">
          <Link
            to={`/apps/user/view/${row.username}`}
            className="user_name text-truncate text-body"
          >
            <span className="fw-bolder">{ (row.firstName && row.lastName) ? `${row.firstName} ${row.lastName}` : `${row.username}` }</span>
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
    selector: (row: User) => row.roles.join(',') || '',
    cell: (row: User) => <span className="text-capitalize">{row.roles.join(',')}</span>,
  },
  {
    name: i18n.t('USER.PHONE'),
    minWidth: '150px',
    sortable: true,
    sortField: 'phone',
    selector: (row: User) => row.phoneNumber || '',
    cell: (row: User) => <span className="text-capitalize">{row.phoneNumber}</span>,
  },
  {
    name: i18n.t('USER.EMAIL'),
    minWidth: '150px',
    sortable: true,
    sortField: 'birthday',
    selector: (row: User) => row.email || '',
    cell: (row: User) => <span className="text-capitalize">{row.email}</span>,
  },
  {
    name: i18n.t('COMMON.STATUS'),
    minWidth: '150px',
    sortable: true,
    sortField: 'status',
    selector: (row: User) => row.status || '',
    cell: (row: User) => (
      <Badge className="text-capitalize" color={statusObj[row.status]} pill>
        {row.status && i18n.t(`USER.${row.status.toUpperCase()}`)}
      </Badge>
    ),
  },
  {
    name: i18n.t('COMMON.ACTIONS'),
    minWidth: '50px',
    cell: (row: User) => {
      // const dispatch = useDispatch();
      const selectRow: MouseEventHandler = (e) => {
        e.preventDefault();
        // dispatch(userActions.selectUser(row));
      };
      return (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu container="body">
              <DropdownItem
                tag={Link}
                className="w-100"
                to={`/apps/user/view/${row.username}`}
              >
                <FileText size={14} className="me-50" />
                <span className="align-middle">{i18n.t('COMMON.DETAILS')}</span>
              </DropdownItem>
              <DropdownItem tag="a" href="/" className="w-100" onClick={selectRow}>
                <Archive size={14} className="me-50" />
                <span className="align-middle">{i18n.t('COMMON.EDIT')}</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <Trash2 size={14} className="me-50" />
                <span className="align-middle">{i18n.t('COMMON.DELETE')}</span>
              </DropdownItem>
              { row.status !== 'inactive'
              && (
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <AlertTriangle size={14} className="me-50" />
                <span className="align-middle">{i18n.t('COMMON.DISABLE')}</span>
              </DropdownItem>
              )}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      );
    },
  },
];
