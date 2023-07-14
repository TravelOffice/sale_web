import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supplierPresenter } from '@adapter/presenters';
import {
  ButtonProps,
  Card, CardBody, CardHeader, CardTitle,
} from 'reactstrap';
import i18n from '@config/i18n';
import Table from '@components/Table/Table';
import { filterSuppliers } from '@utils/SupplierUtils';
import { Supplier } from '@domain/entities/supplier';
import { HandleDataState } from '@redux/slices/others/HandleDataState';
import { useHistory } from 'react-router-dom';
import SupplierExpandableRow from '@features/Supplier/components/SupplierExpandableRow';
import supplierColumns from './components/SupplierColumns';
import SupplierFilter, { SupplierFilterParams } from './components/SupplierFilter';

export default function SupplierListPage() {
  const [filterParams, setFilterParams] = useState<SupplierFilterParams>();
  const {
    data: allSuppliers, isFetching, isFetched, isError, refetch,
  } = useQuery(
    ['suppliers'], async () => supplierPresenter.getAllSuppliers(),
  );

  const fetchSuppliersState: HandleDataState = useMemo(() => {
    if (isFetching) return 'loading';
    if (isFetched) return 'finished';
    if (isError) return 'error';
    return 'init';
  }, [isFetching, isFetched, isError]);

  const suppliers = useMemo(() => {
    if (!allSuppliers) return [];
    const supplierList: Array<Supplier> = allSuppliers?.map((item:Supplier) => (item) as Supplier);
    if (!filterParams) return supplierList;
    return filterSuppliers(supplierList, filterParams);
  }, [allSuppliers, filterParams]);

  const history = useHistory();
  const supplierBtnArr:Array<ButtonProps> = [
    {
      name: i18n.t('COMMON.ADD'),
      handleOnClick: () => { history.push('/apps/suppliers/create'); },
    },
  ];

  return (
    <div className="to-table-container">
      <Card>
        <CardHeader>
          <CardTitle tag="h4">{i18n.t('COMMON.FILTER')}</CardTitle>
        </CardHeader>
        <CardBody>
          <SupplierFilter onFilter={(params) => setFilterParams(params)} />
        </CardBody>
      </Card>
      <Table<Supplier>
        data={suppliers}
        fetchDataState={fetchSuppliersState}
        columns={supplierColumns}
        searchableColumns={['name', 'city', 'district', 'address', 'taxId']}
        sortColumnDefault="code"
        onPageChange={() => {}}
        onRefresh={() => { refetch(); }}
        expandableRows
        expandableRowsComponent={SupplierExpandableRow}
        extraButtons={supplierBtnArr}
      />
    </div>
  );
}
