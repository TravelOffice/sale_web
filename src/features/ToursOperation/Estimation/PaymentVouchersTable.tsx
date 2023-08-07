import React from 'react';
import {
  Badge, Card, CardBody, CardHeader, CardTitle, Table,
} from 'reactstrap';
import i18n from '@config/i18n';
import { Link } from 'react-router-dom';
import renderSkeleton from '@components/Skeleton/Skeleton';
import { PaymentVoucher } from '@domain/entities/paymentVoucher/PaymentVoucher';
import { paymentVoucherTypesColors } from '@features/PaymentVoucher/components/PaymentVoucherColumns';
import { formatCurrency } from '@utils/Utils';
import { generateEditableUrlForSupplier } from '@utils/SupplierUtils';
import moment from 'moment/moment';

export interface PaymentVouchersTableProg {
  isLoading: boolean,
  allPaymentVouchers: PaymentVoucher[],
}

export default function PaymentVouchersTable(props: PaymentVouchersTableProg) {
  const { allPaymentVouchers, isLoading } = props;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            {i18n.t('TOURS_OPERATION.ESTIMATION.PAYMENT_VOUCHER_LIST')}
          </CardTitle>
        </CardHeader>
        <CardBody>
          <div className="to-table-container">
            {
              isLoading ? (
                renderSkeleton()
              ) : (
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th style={{ minWidth: 50 }}>{i18n.t('COMMON.INDEX')}</th>
                      <th style={{ minWidth: 50 }}>{i18n.t('PAYMENT_VOUCHER.CODE')}</th>
                      <th style={{ minWidth: 200 }}>{i18n.t('PAYMENT_VOUCHER.DESCRIPTION')}</th>
                      <th style={{ minWidth: 50 }}>{i18n.t('PAYMENT_VOUCHER.CREATED_DATE_RANGE')}</th>
                      <th style={{ minWidth: 100 }}>{i18n.t('PAYMENT_VOUCHER.RECEIVER')}</th>
                      <th style={{ minWidth: 100 }}>{i18n.t('PAYMENT_VOUCHER.AMOUNT')}</th>
                      <th style={{ minWidth: 50 }}>{i18n.t('PAYMENT_VOUCHER.STATUS')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                    allPaymentVouchers?.map((paymentVoucher, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <Link
                            to="/"
                            className="text-truncate text-body text-center"
                          >
                            <span
                              className="fw-bolder text-primary"
                            >
                              {paymentVoucher.code}
                            </span>
                          </Link>
                        </td>
                        <td>{paymentVoucher.description}</td>
                        <td>
                          {moment(paymentVoucher.createdAt).format('DD/MM/YYYY')}
                        </td>
                        <td>
                          <Link
                            to={generateEditableUrlForSupplier(paymentVoucher.receiverId)}
                            className="text-truncate text-body text-center"
                          >
                            <span
                              className="fw-bolder text-primary"
                            >
                              {paymentVoucher.receiverName}
                            </span>
                          </Link>
                        </td>
                        <td>
                          <span className="text-danger">
                            {formatCurrency(paymentVoucher.amount)}
                          </span>
                        </td>
                        <td>
                          <Badge
                            className="text-capitalize"
                            color={paymentVoucherTypesColors[paymentVoucher.status]}
                            pill
                          >
                            {i18n.t(`PAYMENT_VOUCHER.${paymentVoucher.status}`)}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  }
                  </tbody>
                </Table>
              )
            }
          </div>
        </CardBody>
      </Card>
    </>
  );
}
