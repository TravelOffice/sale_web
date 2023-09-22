import React, { MouseEventHandler } from 'react';
import i18n from '@config/i18n';
import { TableColumn } from 'react-data-table-component';
import {
  Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';
import { Edit, MoreVertical } from 'react-feather';
import { PaymentVoucher, PaymentVoucherStatus } from '@domain/entities/paymentVoucher/PaymentVoucher';
import moment from 'moment';
import { formatVND } from '@utils/CommonUtils';
import { Link } from 'react-router-dom';
import { paymentVoucherActions } from '@redux/slices/paymentVoucherSlice';
import { useDispatch } from 'react-redux';
import PERMISSIONS from '@utils/PermissionUtils';
import { useAccessControl } from '@hooks/auth';

export const paymentVoucherTypesColors: Record<PaymentVoucherStatus, string> = {
  APPROVED: 'light-success',
  SIGNED: 'light-primary',
  TRANSFERRED: 'light-success',
  WAIT_FOR_APPROVAL: 'light-warning',
  WAIT_FOR_SIGN: 'light-warning',
  WAIT_FOR_TRANSFER: 'light-warning',
};
const formatDate = (date: number | string) => moment(date).format('hh:mm DD/MM/YYYY');

const ActionsCell = ({ paymentVoucher }: {
  paymentVoucher: PaymentVoucher
}) => {
  const dispatch = useDispatch();
  const { can } = useAccessControl();
  const onEditPaymentVoucher: MouseEventHandler = () => {
    dispatch(paymentVoucherActions.setOpenUpdateModal(true));
    dispatch(paymentVoucherActions.setSelectedPaymentVoucher(paymentVoucher));
  };

  const onApprovePaymentVoucher: MouseEventHandler = () => {
    dispatch(paymentVoucherActions.setOpenApproveModal(true));
    dispatch(paymentVoucherActions.setSelectedPaymentVoucher(paymentVoucher));
  };

  return (
    <>
      <div className="column-action">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu container="body">
            <DropdownItem className="w-100">
              <Edit size={14} className="me-50" />
              <span className="align-middle" onClick={onEditPaymentVoucher}>
                {i18n.t('COMMON.EDIT')}
              </span>
            </DropdownItem>
            {
              can(PERMISSIONS.approve_payment_voucher)
              && (
                <DropdownItem className="w-100">
                  <Edit size={14} className="me-50" />
                  <span className="align-middle" onClick={onApprovePaymentVoucher}>
                    {i18n.t('PAYMENT_VOUCHER.APPROVE')}
                  </span>
                </DropdownItem>
              )
            }
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </>
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
        {paymentVoucher.deadline && (
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
    cell: (paymentVoucher: PaymentVoucher) => (
      <Link to={`/apps/suppliers/${paymentVoucher.receiverId}/edit`} className="text-truncate text-body">
        <span className="fw-bolder text-primary">{paymentVoucher.receiverName}</span>
      </Link>
    ),
  },
  {
    name: i18n.t('COMMON.ACTIONS'),
    width: '150px',
    cell: (paymentVoucher: PaymentVoucher) => <ActionsCell paymentVoucher={paymentVoucher} />,
  },
];

export default paymentVoucherColumns;
