import React from 'react';
import i18n from '@config/i18n';
import { TableColumn } from 'react-data-table-component';
import { Link } from 'react-router-dom';
import {
  Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';
import { Archive, MoreVertical, Trash2 } from 'react-feather';
import { Receipt, ReceiptStatus } from '@domain/entities/receipt/Receipt';
import moment from 'moment';
import { formatVND } from '@utils/CommonUtils';

const receiptTypesColors: Record<ReceiptStatus, string> = {
  OPEN: 'light-primary',
  CLOSED: 'light-success',
};

const receiptColumns: TableColumn<Receipt>[] = [
  {
    name: i18n.t('RECEIPT.CODE'),
    width: '200px',
    sortable: true,
    sortField: 'code',
    cell: (receipt: Receipt) => receipt.code,
  },
  {
    name: i18n.t('RECEIPT.CREATED_DATE'),
    minWidth: '250px',
    sortable: true,
    sortField: 'createdAt',
    cell: (receipt: Receipt) => {
      const date = moment(receipt.createdAt);
      const formattedDate = date.format('DD/MM/YYYY HH:mm');
      return (formattedDate);
    },
  },
  {
    name: i18n.t('RECEIPT.AMOUNT'),
    minWidth: '200px',
    sortable: true,
    sortField: 'amount',
    cell: (receipt: Receipt) => formatVND(receipt.amount || 0),
  },
  {
    name: i18n.t('RECEIPT.DESCRIPTION'),
    minWidth: '200px',
    sortable: true,
    sortField: 'description',
    cell: (receipt: Receipt) => receipt.description,
  },
  {
    name: i18n.t('RECEIPT.PAYMENT_METHOD'),
    minWidth: '200px',
    sortable: true,
    sortField: 'paymentMethod',
    cell: (receipt: Receipt) => receipt.paymentMethod,
  },
  {
    name: i18n.t('RECEIPT.STATUS'),
    minWidth: '200px',
    sortable: true,
    sortField: 'status',
    cell: (receipt: Receipt) => (
      <Badge className="text-capitalize" color={receiptTypesColors[receipt.status]} pill>
        {i18n.t(
          `RECEIPT.${receipt.status}`,
        )}
      </Badge>
    ),
  },
  {
    name: i18n.t('COMMON.ACTIONS'),
    width: '110px',
    cell: (receipt: Receipt) => (
      <div className="column-action">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu container="body">
            <DropdownItem tag={Link} className="w-100" to={receipt.code}>
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

export default receiptColumns;
