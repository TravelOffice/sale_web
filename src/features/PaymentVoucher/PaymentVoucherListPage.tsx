import React, { useMemo, useState } from 'react';
import {
  ButtonProps, Card, CardBody, CardHeader, CardTitle, Col, Row,
} from 'reactstrap';
import i18n from '@config/i18n';
import Table from '@components/Table/Table';
import { HandleDataState } from '@redux/slices/others/HandleDataState';
import paymentVoucherColumns from '@features/PaymentVoucher/components/PaymentVoucherColumns';
import { ExpanderComponentProps } from 'react-data-table-component';
import { PaymentVoucher } from '@domain/entities/paymentVoucher/PaymentVoucher';
import PaymentVoucherFilter, {
  PaymentVoucherFilterParams,
} from '@features/PaymentVoucher/components/PaymentVoucherFilter';
import filterPaymentVouchers from '@utils/PaymentVoucherUtils';
import { usePaymentVouchers } from '@hooks/paymentVoucher';
import PaymentVoucherCreatePage from '@features/PaymentVoucher/components/CreatePaymentVoucher';

export default function PaymentVoucherListPage() {
  const [filterParams, setFilterParams] = useState<PaymentVoucherFilterParams>();
  const {
    data: allPaymentVouchers, isFetching, isFetched, isError, refetch,
  } = usePaymentVouchers();
  const [createFormModal, setCreateFormModal] = useState(false);

  const toggleCreateFormModal = () => {
    setCreateFormModal(!createFormModal);
  };

  const fetchPaymentVouchersState: HandleDataState = useMemo(() => {
    if (isFetching) return 'loading';
    if (isFetched) return 'finished';
    if (isError) return 'error';
    return 'init';
  }, [isFetching, isFetched, isError]);

  const paymentVoucherBtnArr: Array<ButtonProps> = [
    {
      name: i18n.t('COMMON.ADD'),
      handleOnClick: () => toggleCreateFormModal(),
    },
  ];

  const paymentVouchers = useMemo(() => {
    if (!allPaymentVouchers) return [];
    if (!filterParams) return allPaymentVouchers;
    return filterPaymentVouchers(allPaymentVouchers, filterParams);
  }, [allPaymentVouchers, filterParams]);

  const PaymentVoucherExpandableRowComponent: React.FC<ExpanderComponentProps<PaymentVoucher>> = (
    { data }: ExpanderComponentProps<PaymentVoucher>,
  ) => (
    <div className="container py-xxl-1">
      <Row>
        <Col xl="6">
          <ul>
            <li>
              {i18n.t('PAYMENT_VOUCHER.DESCRIPTION')}
              :
              {' '}
              <span className="fw-bolder text-primary">{data.description}</span>
            </li>
            {data.note && (
              <li>
                {i18n.t('PAYMENT_VOUCHER.NOTE')}
                :
                {' '}
                <span className="fw-bolder text-primary">{data.note}</span>
              </li>
            )}
            <li>
              {i18n.t('PAYMENT_VOUCHER.CREATOR')}
              :
              {' '}
              <span className="fw-bolder text-primary">{data.creatorName}</span>
            </li>
            {
              data.attachment && (
              <li>
                {i18n.t('PAYMENT_VOUCHER.ATTACHMENT')}
                :
                {' '}
                <a href={data.attachment} className="user_name text-truncate text-body" target="_blank" rel="noopener noreferrer">
                  <span className="fw-bolder text-primary">
                    {
                    decodeURIComponent(
                      new URL(data.attachment).pathname.split('/').pop() || data.attachment,
                    )
                  }
                  </span>
                </a>
              </li>
              )
            }
          </ul>
        </Col>
      </Row>
    </div>
  );

  return (
    <div className="to-table-container">
      <Card>
        <CardHeader>
          <CardTitle tag="h4">{i18n.t('COMMON.FILTER')}</CardTitle>
        </CardHeader>
        <CardBody>
          <PaymentVoucherFilter onFilter={setFilterParams} />
        </CardBody>
      </Card>
      <Table<PaymentVoucher>
        data={paymentVouchers}
        fetchDataState={fetchPaymentVouchersState}
        columns={paymentVoucherColumns}
        searchableColumns={['code', 'note', 'amount', 'description', 'receiver']}
        sortColumnDefault="createdAt"
        onPageChange={() => {}}
        onRefresh={refetch}
        extraButtons={paymentVoucherBtnArr}
        expandableRows
        expandableRowsComponent={PaymentVoucherExpandableRowComponent}
      />
      <PaymentVoucherCreatePage
        createFormModal={createFormModal}
        toggleCreateFormModal={toggleCreateFormModal}
      />
    </div>
  );
}
