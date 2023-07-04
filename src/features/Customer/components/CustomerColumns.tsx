import React from 'react';
import i18n from '@config/i18n';
import { TableColumn } from 'react-data-table-component';
import { Link } from 'react-router-dom';
import {
  Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';
import { Archive, MoreVertical, Trash2 } from 'react-feather';
import moment from 'moment';
import { generateEditableUrlForCustomer, generateI18nForCustomer } from '@utils/CustomerUtils';
import { Customer, CustomerLevel } from '@domain/entities/Customer';

const customerLevelColors: Record<CustomerLevel, string> = {
  STANDARD: 'light-success',
  VIP: 'light-warning',
  VVIP: 'light-danger',
};

const customerColumns: TableColumn<Customer>[] = [
  {
    name: i18n.t('CUSTOMER.CODE'),
    maxWidth: '100px',
    cell: (customer: Customer) => (
      <Link to={generateEditableUrlForCustomer(customer)} className="user_name text-truncate text-body">
        <span className="fw-bolder">{customer.code}</span>
      </Link>
    ),
  },
  {
    name: i18n.t('CUSTOMER.LEVEL'),
    width: '150px',
    cell: (customer: Customer) => (
      <Badge
        className="text-capitalize"
        color={customerLevelColors[customer.level ?? CustomerLevel.STANDARD]}
        pill
      >
        {generateI18nForCustomer(customer.level ?? CustomerLevel.STANDARD)}
      </Badge>
    ),
  },
  {
    name: i18n.t('CUSTOMER.NAME'),
    minWidth: '150px',
    maxWidth: '180px',
    cell: (customer: Customer) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <span className="fw-bolder text-primary">
            <small
              className="text-truncate text-muted"
            >
              {customer.honorific ? generateI18nForCustomer(customer.honorific) : ''}
            </small>
            {customer.name}
          </span>
          <span>{customer.primaryPhoneNumber}</span>
        </div>
      </div>
    ),
  },
  {
    name: i18n.t('CUSTOMER.ASSIGNEE'),
    cell: (customer: Customer) => (
      <div className="my-1">
        <span>
          <strong>{i18n.t('CUSTOMER.ASSIGNEE')}</strong>
          {': '}
          {
            customer.assigneeId ? (
              <Link to={`/apps/users/${customer.assigneeId}`} className="user_name text-truncate text-body">
                <span className="fw-bolder text-primary">{`${customer.assigneeName} - ${customer.assigneeId}`}</span>
              </Link>
            ) : (
              i18n.t('CUSTOMER.EMPTY')
            )
          }
        </span>
        <br />
        <span>
          <strong>{i18n.t('CUSTOMER.CREATOR')}</strong>
          {': '}
          <Link to={`/apps/users/${customer.creatorId}`} className="user_name text-truncate text-body">
            <span className="fw-bolder text-primary">{`${customer.creatorName} - ${customer.creatorId}`}</span>
          </Link>
        </span>
        <br />
        <span>
          <strong>{i18n.t('COMMON.CREATED_AT')}</strong>
          {': '}
          {moment(customer.createdAt).format('hh:mm:ss DD/MM/YYYY')}
        </span>
      </div>
    ),
  },
  {
    name: i18n.t('CUSTOMER.REVENUE'),
    width: '200px',
    cell: (customer: Customer) => (
      <span className="fw-bolder">
        {new Intl.NumberFormat('en-US').format(customer.revenue ?? 9846413156)}
      </span>
    ),
  },
  {
    name: i18n.t('COMMON.NOTE'),
    maxWidth: '200px',
    selector: (customer) => {
      if (customer.notes && customer.notes.length > 0) {
        return customer.notes[customer.notes.length - 1].description;
      }
      return i18n.t('CUSTOMER.NO_NOTE').toString();
    },
  },
  {
    name: i18n.t('COMMON.ACTIONS'),
    maxWidth: '120px',
    cell: (customer: Customer) => (
      <div className="column-action">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu container="body">
            <DropdownItem tag={Link} className="w-100" to={generateEditableUrlForCustomer(customer)}>
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
    ),
  },
];

export default customerColumns;
