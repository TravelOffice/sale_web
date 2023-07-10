import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { receiptPresenter } from '@adapter/presenters';
import {
  ButtonProps,
  Card, CardBody, CardHeader, CardTitle,
} from 'reactstrap';
import i18n from '@config/i18n';
import Table from '@components/Table/Table';
import { HandleDataState } from '@redux/slices/others/HandleDataState';
import { Receipt } from '@domain/entities/receipt/Receipt';
import receiptColumns from '@features/Receipt/components/ReceiptColumns';
import moment from 'moment';
import ReceiptFilter, { ReceiptFilterParams } from './components/ReceiptFilter';

export default function ReceiptListPage() {
  const dateFormat = 'YYYY-MM-DD';
  const [filterParams, setFilterParams] = useState<ReceiptFilterParams>();
  const {
    data: allReceipts, isFetching, isFetched, isError, refetch,
  } = useQuery(
    ['tour-templates'], async () => receiptPresenter.getAllReceipts(),
  );
  const fetchTourTemplatesState: HandleDataState = useMemo(() => {
    if (isFetching) return 'loading';
    if (isFetched) return 'finished';
    if (isError) return 'error';
    return 'init';
  }, [isFetching, isFetched, isError]);

  /**
   * Filters an array of receipts based on the provided filter parameters.
   *
   * @param receipts
   * @param params - The filter parameters used to determine which receipts to include.
   * @returns An array of filtered receipts.
   */
  const filterReceipts = (
    receipts: Receipt[],
    params: ReceiptFilterParams,
  ) => {
    const {
      code, receiptStatus, dateRange, description, paymentMethod,
    } = params;

    return receipts.filter(
      (item: Receipt) => {
        if (code && !item.code.toLowerCase().includes(code.toLowerCase())) {
          return false;
        }

        if (receiptStatus && !item.status.includes(receiptStatus)) {
          return false;
        }

        if (dateRange && dateRange.length === 2) {
          const startDate = moment(dateRange[0]);
          const endDate = moment(dateRange[1]);
          const actualDate = moment(item.createdAt).format(dateFormat);
          const startDateWithoutTime = startDate.format(dateFormat);
          const endDateWithoutTime = endDate.format(dateFormat);
          return startDateWithoutTime <= actualDate && actualDate <= endDateWithoutTime;
        }

        if (description
            && item.description
            && !item.description.toLowerCase().includes(description.toLowerCase())) {
          return false;
        }

        return !(paymentMethod
            && !item.paymentMethod.toLowerCase().includes(paymentMethod.toLowerCase()));
      },
    );
  };

  const receipts = useMemo(() => {
    if (!allReceipts) return [];
    if (!filterParams) return allReceipts;
    return filterReceipts(allReceipts, filterParams);
  }, [allReceipts, filterParams]);

  const receiptBtnArr:Array<ButtonProps> = [
    {
      name: i18n.t('COMMON.ADD'),
      handleOnClick: () => {},
    },
  ];

  return (
    <div className="to-table-container">
      <Card>
        <CardHeader>
          <CardTitle tag="h4">{i18n.t('COMMON.FILTER')}</CardTitle>
        </CardHeader>
        <CardBody>
          <ReceiptFilter onFilter={(params) => setFilterParams(params)} />
        </CardBody>
      </Card>
      <Table<Receipt>
        data={receipts}
        fetchDataState={fetchTourTemplatesState}
        columns={receiptColumns}
        searchableColumns={['code', 'createdAt', 'receiptStatus', 'amount', 'description']}
        sortColumnDefault="code"
        onPageChange={() => {}}
        onRefresh={() => { refetch(); }}
        extraButtons={receiptBtnArr}
      />
    </div>
  );
}
