import React from 'react';
import i18n from '@config/i18n';
import { TableColumn } from 'react-data-table-component';
import { Quote, Supplier } from '@domain/entities/supplier';
import { Link } from 'react-router-dom';
import {
  generateEditableUrlForSupplier,
} from '@utils/SupplierUtils';
import {
  DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';
import { Archive, MoreVertical, Trash2 } from 'react-feather';

const supplierColumns: TableColumn<Supplier>[] = [
  {
    name: i18n.t('COMMON.INDEX'),
    width: '130px',
    sortable: true,
    sortField: 'code',
    cell: (supplier: Supplier) => (
      <Link to={generateEditableUrlForSupplier(supplier)} className="user_name text-truncate text-body">
        <span className="fw-bolder">{supplier.code}</span>
      </Link>
    ),
  },
  {
    name: i18n.t('SUPPLIER.NAME'),
    minWidth: '250px',
    sortable: true,
    sortField: 'name',
    cell: (supplier: Supplier) => supplier.name,
  },
  {
    name: i18n.t('SUPPLIER.QUOTE_LINK'),
    minWidth: '200px',
    sortable: true,
    sortField: 'type',
    cell: (supplier: Supplier) => (
      supplier.quotes.map((item: Quote) => (
        <a href={item.link} target="_blank" rel="noreferrer">
          {item.link}
        </a>
      ))
    ),
  },
  {
    name: i18n.t('SUPPLIER.ADDRESS'),
    minWidth: '200px',
    cell: (supplier: Supplier) => `${supplier.address}`,
  },
  {
    name: i18n.t('COMMON.ACTIONS'),
    width: '150px',
    cell: (supplier: Supplier) => (
      <div className="column-action">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu container="body">
            <DropdownItem tag={Link} className="w-100" to={generateEditableUrlForSupplier(supplier)}>
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

export default supplierColumns;
