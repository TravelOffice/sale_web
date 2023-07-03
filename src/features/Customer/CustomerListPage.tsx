import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Card, CardBody, CardHeader, CardTitle,
} from 'reactstrap';
import i18n from '@config/i18n';
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';
import CustomerStats from '@features/Customer/components/CustomerStats';
import { Customer, CustomerLevel } from '@domain/entities/Customer';
import { customerPresenter } from '@adapter/presenters';
import { filterCustomers } from '@utils/CustomerUtils';
import CustomerFilter, { CustomerFilterParams } from '@features/Customer/components/CustomerFilter';
import customerColumns from '@features/Customer/components/CustomerColumns';

export default function CustomerListPage() {
  const [filterParams, setFilterParams] = useState<CustomerFilterParams>();
  const { data: allCustomers, isFetching } = useQuery(['customers'], async () => customerPresenter.getAllCustomers());
  const customers = useMemo(() => {
    if (!allCustomers) return [];
    if (!filterParams) return allCustomers;
    return filterCustomers(allCustomers, filterParams);
  }, [allCustomers, filterParams]);
  return (
    <div className="to-table-container">
      <CustomerStats
        total={customers.length}
        countStandard={
          customers.filter((customer: Customer) => customer.level === CustomerLevel.STANDARD).length
        }
        countVip={
          customers.filter((customer: Customer) => customer.level === CustomerLevel.VIP).length
        }
        countVVip={
          customers.filter((customer: Customer) => customer.level === CustomerLevel.VVIP).length
        }
      />
      <Card>
        <CardHeader>
          <CardTitle tag="h4">{i18n.t('COMMON.FILTER')}</CardTitle>
        </CardHeader>
        <CardBody>
          <CustomerFilter onFilter={(params) => setFilterParams(params)} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">{i18n.t('CUSTOMER.LIST')}</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="react-dataTable">
            <DataTable
              noHeader
              selectableRows={false}
              striped
              dense
              responsive
              progressPending={isFetching}
              paginationServer
              className="react-dataTable"
              columns={customerColumns}
              sortIcon={<ChevronDown />}
              customStyles={{
                cells: {
                  style: {
                    height: 'auto !important',
                    fontSize: '1rem',
                    lineHeight: '1.6rem',
                  },
                },
              }}
              data={customers}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
