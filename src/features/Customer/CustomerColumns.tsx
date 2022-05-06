// ** Custom Components
import Avatar, { AvatarColor } from '@components/Avatar/Avatar';
// ** i18n import
import i18n from '@config/i18n';
import { Customer } from '@domain/entities/Lead';
import { customerActions } from '@redux/slices/customerSlice';
import React, { MouseEventHandler } from 'react';
import { TableColumn } from 'react-data-table-component';
// ** Icons Imports
import {
  Archive, FileText, MoreVertical, Trash2,
} from 'react-feather';
import { useDispatch } from 'react-redux';
// ** React Imports
import { Link } from 'react-router-dom';
// ** Reactstrap Imports
import {
  Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';

// ** Renders Client Columns
const renderClient = (row: Customer) => {
  const states : { [key: string] : AvatarColor } = {
    NEW: 'light-primary',
    QUALIFYING: 'light-warning',
    QUALIFIED: 'light-success',
    TAKING_CARE: 'light-info',
  };
  const color : AvatarColor = states[row.status];

  return <Avatar color={color || 'primary'} className="me-1" content={row.name} />;
};

const statusObj = {
  NEW: 'light-primary',
  QUALIFYING: 'light-warning',
  QUALIFIED: 'light-success',
  TAKING_CARE: 'light-info',
  TRADING: 'light-danger',
  TRADED: 'light-secondary',
};

// eslint-disable-next-line import/prefer-default-export
export const customerColumns : TableColumn<Customer>[] = [
  {
    name: i18n.t('LEAD.NAME'),
    sortable: true,
    minWidth: '250px',
    sortField: 'name',
    selector: (row: Customer) => row.name,
    cell: (row: Customer) => (
      <div className="d-flex justify-content-left align-items-center">
        {renderClient(row)}
        <div className="d-flex flex-column">
          <Link
            to={`/apps/user/view/${row.primaryPhoneNumber}`}
            className="user_name text-truncate text-body"
          >
            <span className="fw-bolder">{row.name}</span>
          </Link>
          <small className="text-truncate text-muted mb-0">{i18n.t(`LEAD.${row.vocative}`)}</small>
        </div>
      </div>
    ),
  },
  {
    name: i18n.t('LEAD.PHONE'),
    minWidth: '150px',
    sortable: true,
    sortField: 'phone',
    selector: (row: Customer) => row.primaryPhoneNumber || '',
    cell: (row: Customer) => <span className="text-capitalize">{row.primaryPhoneNumber}</span>,
  },
  {
    name: i18n.t('LEAD.BIRTHDAY'),
    minWidth: '150px',
    sortable: true,
    sortField: 'birthday',
    selector: (row: Customer) => row.birthday || '',
    cell: (row: Customer) => <span className="text-capitalize">{row.birthday}</span>,
  },
  {
    name: i18n.t('COMMON.STATUS'),
    minWidth: '150px',
    sortable: true,
    sortField: 'status',
    selector: (row: Customer) => row.status,
    cell: (row: Customer) => (
      <Badge className="text-capitalize" color={statusObj[row.status]} pill>
        {i18n.t(`LEAD.${row.status}`)}
      </Badge>
    ),
  },
  {
    name: i18n.t('COMMON.ACTIONS'),
    minWidth: '50px',
    cell: (row: Customer) => {
      const dispatch = useDispatch();
      const selectRow: MouseEventHandler = (e) => {
        e.preventDefault();
        dispatch(customerActions.selectCustomer(row));
      };
      return (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                tag={Link}
                className="w-100"
                to={`/apps/user/view/${row.primaryPhoneNumber}`}
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
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      );
    },
  },
];
