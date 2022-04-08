import React from 'react';

// ** React Imports
import { Link } from 'react-router-dom';

// ** Custom Components
import Avatar, { AvatarColor } from '@components/Avatar/Avatar';

// ** Store & Actions
import { leadActions } from '@redux/slices/leadSlice';

// ** Icons Imports
import {
  Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive,
} from 'react-feather';

// ** Reactstrap Imports
import {
  Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import { Lead } from '@domain/entities/Lead';
import { TableColumn } from 'react-data-table-component';
import { useDispatch } from 'react-redux';
// import { useDispatch } from 'react-redux';

const { getLead, deleteLead } = leadActions;

// interface Row {
//   billing: any
//   role: 'subscriber' | 'maintainer' | 'editor' | 'author' | 'admin',
//   fullName: string,
//   status: 'pending' | 'active' | 'inactive',
//   id: string,
//   email: string,
//   currentPlan: string,
//   avatar: string
// }

// ** Store Vars
// const dispatch = useDispatch();

// ** Renders Client Columns
const renderClient = (row: Lead) => {
  const stateNum = Math.floor(Math.random() * 6);
  const states : AvatarColor[] = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'];
  const color : AvatarColor = states[stateNum];

  // if (row.avatar) {
  //   return <Avatar className="me-1" img={row.avatar} imgWidth="32" imgHeight="32" />;
  // }
  return <Avatar color={color || 'primary'} className="me-1" content={row.name || 'John Doe'} />;
};

const statusObj = {
  NEW: 'light-warning',
  QUALIFYING: 'light-success',
  QUALIFIED: 'light-secondary',
  TAKING_CARE: 'light-secondary',
  TRADING: 'light-secondary',
  TRADED: 'light-secondary',
};

// eslint-disable-next-line import/prefer-default-export
export const columns : TableColumn<Lead>[] = [
  {
    name: 'User',
    sortable: true,
    minWidth: '300px',
    sortField: 'fullName',
    selector: (row: Lead) => row.name,
    cell: (row: Lead) => (
      <div className="d-flex justify-content-left align-items-center">
        {renderClient(row)}
        <div className="d-flex flex-column">
          <Link
            to={`/apps/user/view/${row.otherPhoneNumbers[0]}`}
            className="user_name text-truncate text-body"
            // onClick={() => dispatch(getLead(row.id))}
          >
            <span className="fw-bolder">{row.name}</span>
          </Link>
          <small className="text-truncate text-muted mb-0">{row.email}</small>
        </div>
      </div>
    ),
  },
  {
    name: 'address',
    minWidth: '138px',
    sortable: true,
    sortField: 'address',
    selector: (row: Lead) => row.address || '',
    cell: (row: Lead) => <span className="text-capitalize">{row.address}</span>,
  },
  {
    name: 'Email',
    minWidth: '230px',
    sortable: true,
    sortField: 'email',
    selector: (row: Lead) => row.email || '',
    cell: (row: Lead) => <span className="text-capitalize">{row.email}</span>,
  },
  {
    name: 'Status',
    minWidth: '138px',
    sortable: true,
    sortField: 'status',
    selector: (row: Lead) => row.status,
    cell: (row: Lead) => (
      <Badge className="text-capitalize" color={statusObj[row.status]} pill>
        {row.status}
      </Badge>
    ),
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: (row: Lead) => {
      const dispatch = useDispatch();
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
                <span className="align-middle">Details</span>
              </DropdownItem>
              <DropdownItem tag="a" href="/" className="w-100" onClick={(e) => { e.preventDefault(); dispatch(leadActions.selectLead(row)); }}>
                <Archive size={14} className="me-50" />
                <span className="align-middle">Edit</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                // dispatch(deleteLead(row.id));
                }}
              >
                <Trash2 size={14} className="me-50" />
                <span className="align-middle">Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      );
    },
  },
];
