import React from 'react';
import i18n from '@config/i18n';
import { TableColumn } from 'react-data-table-component';
import { Link } from 'react-router-dom';
import {
  Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';
import {
  Archive, Calendar, MoreVertical, Phone, User,
} from 'react-feather';
import moment from 'moment';
import { Customer, CustomerLevel } from '@domain/entities/customer/Customer';
import { generateEditableUrlForCustomer, generateI18nForCustomer } from '@utils/CustomerUtils';
import { formatCurrency } from '@utils/Utils';

const customerLevelColors: Record<CustomerLevel, string> = {
  STANDARD: 'light-success',
  VIP: 'light-warning',
  VVIP: 'light-danger',
};

const customerColumns: TableColumn<Customer>[] = [
  {
    name: i18n.t('CUSTOMER.CODE'),
    width: '80px',
    cell: (customer: Customer) => (
      <div>
        <Link to={generateEditableUrlForCustomer(customer)} className="text-truncate text-body text-center">
          <span className="fw-bolder">{customer.code}</span>
        </Link>
      </div>
    ),
  },
  {
    name: i18n.t('CUSTOMER.LEVEL'),
    width: '120px',
    cell: (customer: Customer) => (
      <div>
        <Badge className="text-capitalize" color={customerLevelColors[customer.level]}>
          {generateI18nForCustomer(customer.level)}
        </Badge>
      </div>
    ),
  },
  {
    name: i18n.t('CUSTOMER.NAME'),
    minWidth: '200px',
    cell: (customer: Customer) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <span className="fw-bolder text-primary pb-0">
            <User size={14} className="text-secondary" />
            <small className="text-truncate text-muted">
              {' '}
              {customer.honorific ? `(${generateI18nForCustomer(customer.honorific)})` : ''}
            </small>
            {' '}
            {customer.name}
          </span>
          <span>
            <Phone size={14} className="text-secondary" />
            {' '}
            {customer.primaryPhoneNumber}
          </span>
        </div>
      </div>
    ),
  },
  {
    name: i18n.t('CUSTOMER.CREATOR'),
    minWidth: '200px',
    cell: (customer: Customer) => (
      <div>
        <User size={14} />
        {' '}
        <Link to={`/apps/users/${customer.creatorId}`} className="user_name text-truncate text-body">
          <span className="fw-bolder text-primary">{customer.creatorName}</span>
        </Link>
        <br />
        <span>
          <Calendar size={14} />
          {' '}
          {moment(customer.createdAt).format('hh:mm:ss DD/MM/YYYY')}
        </span>
      </div>
    ),
  },
  {
    name: i18n.t('CUSTOMER.SOURCE'),
    minWidth: '200px',
    cell: (customer: Customer) => (
      <div>
        <Badge className="text-uppercase" color="light-secondary">
          {customer.source}
        </Badge>

      </div>
    ),
  },
  {
    name: i18n.t('CUSTOMER.REVENUE'),
    width: '200px',
    cell: (customer: Customer) => (
      <div className="my-1">
        <span className="fw-bolder">
          {formatCurrency(customer.revenue ?? 9846413156)}
        </span>
      </div>
    ),
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
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];

export default customerColumns;
