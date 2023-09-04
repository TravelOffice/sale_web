import React, { MouseEventHandler } from 'react';
import i18n from '@config/i18n';
import { TableColumn } from 'react-data-table-component';
import {
  Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';
import {
  Archive, Calendar, MoreVertical, Trash2, User,
} from 'react-feather';
import { Receipt, ReceiptStatus } from '@domain/entities/receipt/Receipt';
import moment from 'moment';
import { formatVND } from '@utils/CommonUtils';
import { useDispatch } from 'react-redux';
import { receiptActions } from '@redux/slices/receiptSlice';
import { Link } from 'react-router-dom';

const receiptTypesColors: Record<ReceiptStatus, string> = {
  OPEN: 'light-primary',
  CLOSED: 'light-success',
};

const receiptColumns: TableColumn<Receipt>[] = [
  {
    name: i18n.t('RECEIPT.CODE'),
    width: '150px',
    sortable: true,
    sortField: 'code',
    cell: (receipt: Receipt) => receipt.code,
  },
  {
    name: i18n.t('RECEIPT.STATUS'),
    minWidth: '100px',
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
    name: i18n.t('RECEIPT.CREATED_DATE'),
    minWidth: '250px',
    sortable: true,
    sortField: 'createdAt',
    cell: (receipt: Receipt) => (
      <div>
        <User size={14} />
        {' '}
        <Link to={`/apps/user/view/${receipt.creatorId}`} className="user_name text-truncate text-body">
          <span className="fw-bolder text-primary">{receipt.creatorName}</span>
        </Link>
        <br />
        <span>
          <Calendar size={14} />
          {' '}
          {moment(receipt.createdAt).format('hh:mm:ss DD/MM/YYYY')}
        </span>
      </div>
    ),
  },
  {
    name: i18n.t('RECEIPT.AMOUNT'),
    minWidth: '200px',
    sortable: true,
    sortField: 'amount',
    cell: (receipt: Receipt) => formatVND(receipt.amount || 0),
  },
  {
    name: i18n.t('RECEIPT.PAYMENT_METHOD'),
    minWidth: '200px',
    sortable: true,
    sortField: 'paymentMethod',
    cell: (receipt: Receipt) => receipt.paymentMethod,
  },
  {
    name: i18n.t('COMMON.ACTIONS'),
    width: '110px',
    cell: (receipt: Receipt) => {
      const dispatch = useDispatch();
      const onEditReceipt: MouseEventHandler = (e) => {
        e.preventDefault();
        dispatch(receiptActions.selectReceipt(receipt));
        dispatch(receiptActions.setOpenSidebar(true));
      };
      const onDeleteReceipt: MouseEventHandler = (e) => {
        e.preventDefault();
        dispatch(receiptActions.selectReceipt(receipt));
        dispatch(receiptActions.setOpenDeleteDialog(true));
      };
      return (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu container="body">
              <DropdownItem className="w-100" onClick={onEditReceipt}>
                <Archive size={14} className="me-50" />
                <span className="align-middle">{i18n.t('COMMON.EDIT')}</span>
              </DropdownItem>
              <DropdownItem className="w-100">
                <Trash2 size={14} className="me-50" />
                <span className="align-middle" onClick={onDeleteReceipt}>{i18n.t('COMMON.DELETE')}</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      );
    },
  },
];

export default receiptColumns;
