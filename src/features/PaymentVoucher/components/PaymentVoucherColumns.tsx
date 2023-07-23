import React, { MouseEventHandler } from 'react';
import i18n from '@config/i18n';
import { TableColumn } from 'react-data-table-component';
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import { Archive, MoreVertical, Trash2 } from 'react-feather';
import { PaymentVoucher, PaymentVoucherStatus } from '@domain/entities/paymentVoucher/PaymentVoucher';
import moment from 'moment';
import { formatVND } from '@utils/CommonUtils';

const paymentVoucherTypesColors: Record<PaymentVoucherStatus, string> = {
  APPROVED: 'light-success',
  SIGNED: 'light-primary',
  TRANSFERRED: 'light-success',
  WAIT_FOR_APPROVAL: 'light-warning',
  WAIT_FOR_SIGN: 'light-warning',
  WAIT_FOR_TRANSFER: 'light-warning',
};

const formatDate = (date: number | string) => moment(date).format('hh:mm DD/MM/YYYY');

const ActionsCell = ({ paymentVoucher }: { paymentVoucher: PaymentVoucher }) => {
  const onEditPaymentVoucher: MouseEventHandler = (e) => {
    e.preventDefault();
    console.log('Edit paymentVoucher', paymentVoucher);
  };

  const onDeletePaymentVoucher: MouseEventHandler = (e) => {
    e.preventDefault();
    console.log('Delete paymentVoucher', paymentVoucher);
  };

  return (
    <div className="column-action">
      <UncontrolledDropdown>
        <DropdownToggle tag="div" className="btn btn-sm">
          <MoreVertical size={14} className="cursor-pointer" />
        </DropdownToggle>
        <DropdownMenu container="body">
          <DropdownItem className="w-100" onClick={onEditPaymentVoucher}>
            <Archive size={14} className="me-50" />
            <span className="align-middle">{i18n.t('COMMON.EDIT')}</span>
          </DropdownItem>
          <DropdownItem className="w-100">
            <Trash2 size={14} className="me-50" />
            <span className="align-middle" onClick={onDeletePaymentVoucher}>
              {i18n.t('COMMON.DELETE')}
            </span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

const paymentVoucherColumns: TableColumn<PaymentVoucher>[] = [
  {
    name: i18n.t('PAYMENT_VOUCHER.CODE'),
    width: '150px',
    sortable: true,
    sortField: 'code',
    cell: (paymentVoucher: PaymentVoucher) => paymentVoucher.code,
  },
  {
    name: i18n.t('PAYMENT_VOUCHER.STATUS'),
    minWidth: '100px',
    sortable: true,
    sortField: 'status',
    cell: (paymentVoucher: PaymentVoucher) => (
      <Badge className="text-capitalize" color={paymentVoucherTypesColors[paymentVoucher.status]} pill>
        {i18n.t(`PAYMENT_VOUCHER.${paymentVoucher.status}`)}
      </Badge>
    ),
  },
  {
    name: i18n.t('PAYMENT_VOUCHER.CREATED_DATE'),
    minWidth: '250px',
    sortable: true,
    sortField: 'createdAt',
    cell: (paymentVoucher: PaymentVoucher) => (
      <div>
        <span>
          {`${i18n.t('PAYMENT_VOUCHER.CREATED_DATE')}: `}
          {formatDate(paymentVoucher.createdAt)}
        </span>
        <br />
        { paymentVoucher.deadline && (
        <span>
          {`${i18n.t('PAYMENT_VOUCHER.DEADLINE')}: `}
          {formatDate(paymentVoucher.deadline)}
        </span>
        )}
      </div>
    ),
  },
  {
    name: i18n.t('PAYMENT_VOUCHER.AMOUNT'),
    minWidth: '200px',
    sortable: true,
    sortField: 'amount',
    cell: (paymentVoucher: PaymentVoucher) => formatVND(paymentVoucher.amount || 0),
  },
  {
    name: i18n.t('PAYMENT_VOUCHER.RECEIVER'),
    minWidth: '200px',
    sortable: true,
    sortField: 'receiver',
    cell: (paymentVoucher: PaymentVoucher) => paymentVoucher.receiver,
  },
  {
    name: i18n.t('COMMON.ACTIONS'),
    width: '110px',
    cell: (paymentVoucher: PaymentVoucher) => <ActionsCell paymentVoucher={paymentVoucher} />,
  },
];

export default paymentVoucherColumns;
