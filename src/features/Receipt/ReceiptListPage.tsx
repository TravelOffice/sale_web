import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { receiptPresenter } from '@adapter/presenters';
import {
  ButtonProps,
  Card, CardBody, CardHeader, CardTitle, Col, Row,
} from 'reactstrap';
import i18n from '@config/i18n';
import Table from '@components/Table/Table';
import { HandleDataState } from '@redux/slices/others/HandleDataState';
import { Receipt } from '@domain/entities/receipt/Receipt';
import receiptColumns from '@features/Receipt/components/ReceiptColumns';
import moment from 'moment';
import ReceiptSidebar from '@features/Receipt/components/ReceiptSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { receiptActions } from '@redux/slices/receiptSlice';
import DeleteReceiptModal from '@features/Receipt/components/DeleteReceiptModal';
import { ExpanderComponentProps } from 'react-data-table-component';
import ReceiptFilter, { ReceiptFilterParams } from './components/ReceiptFilter';

export default function ReceiptListPage() {
  const dispatch = useDispatch();
  const dateFormat = 'YYYY-MM-DD';
  const [filterParams, setFilterParams] = useState<ReceiptFilterParams>();
  const {
    data: allReceipts, isFetching, isFetched, isError, refetch,
  } = useQuery(
    ['receipts'], async () => receiptPresenter.getAllReceipts(),
  );
  const fetchReceiptsState: HandleDataState = useMemo(() => {
    if (isFetching) return 'loading';
    if (isFetched) return 'finished';
    if (isError) return 'error';
    return 'init';
  }, [isFetching, isFetched, isError]);

  const openSidebar = useSelector((state: RootState) => state.receipt.openSidebar);
  const openDeletionWarning = useSelector((state: RootState) => state.receipt.openDeleteDialog);
  const selectedReceipt = useSelector((state: RootState) => state.receipt.selectedReceipt);
  const {
    unSelectReceipt,
    setOpenSidebar: setOpenSidebarAction,
    setOpenDeleteDialog,
  } = receiptActions;
  const setOpenSidebar = (open: boolean) => dispatch(setOpenSidebarAction(open));
  const toggleReceiptSidebar = () => setOpenSidebar(!openSidebar);
  const setOpenDeletionWarning = (open: boolean) => dispatch(setOpenDeleteDialog(open));
  const toggleDeletionWarningDialog = () => setOpenSidebar(!openDeletionWarning);

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
      code, status, dateRange, description, paymentMethod,
    } = params;

    return receipts.filter(
      (item: Receipt) => {
        if (code && !item.code?.toLowerCase().includes(code.toLowerCase())) {
          return false;
        }

        if (status && !item.status.includes(status)) {
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
      handleOnClick: () => {
        dispatch(unSelectReceipt());
        toggleReceiptSidebar();
      },
    },
  ];

  const onCreateOrUpdateSuccess = () => {
    dispatch(unSelectReceipt());
    refetch();
  };

  const onDeleteSuccess = () => {
    dispatch(unSelectReceipt());
    refetch();
  };

  const ReceiptExpandableRowComponent: React.FC<ExpanderComponentProps<Receipt>> = (
    { data }: ExpanderComponentProps<Receipt>,
  ) => (
    <div className="container py-xxl-1">
      <Row>
        <Col xl="6">
          <ul>
            <li>
              {i18n.t('RECEIPT.DESCRIPTION')}
              :
              {' '}
              <span className="fw-bolder text-primary">{data.description}</span>
            </li>
            <li>
              {i18n.t('RECEIPT.NOTE')}
              :
              {' '}
              <span className="fw-bolder text-primary">{data.note}</span>
            </li>
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
          <ReceiptFilter onFilter={(params) => setFilterParams(params)} />
        </CardBody>
      </Card>
      <Table<Receipt>
        data={receipts}
        fetchDataState={fetchReceiptsState}
        columns={receiptColumns}
        searchableColumns={['code', 'createdAt', 'receiptStatus', 'amount', 'description']}
        sortColumnDefault="createdAt"
        onPageChange={() => {}}
        onRefresh={refetch}
        extraButtons={receiptBtnArr}
        expandableRows
        expandableRowsComponent={ReceiptExpandableRowComponent}
      />
      <ReceiptSidebar
        open={openSidebar}
        setOpenSidebar={setOpenSidebar}
        toggleSidebar={toggleReceiptSidebar}
        receipt={selectedReceipt}
        onClosed={() => dispatch(unSelectReceipt())}
        callback={onCreateOrUpdateSuccess}
      />
      <DeleteReceiptModal
        receipt={selectedReceipt}
        openDeletionWarning={openDeletionWarning}
        setOpenDeletionWarning={setOpenDeletionWarning}
        toggleDeletionWarningDialog={toggleDeletionWarningDialog}
        callback={onDeleteSuccess}
      />
    </div>
  );
}
