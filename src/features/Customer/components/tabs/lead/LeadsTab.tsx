import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { leadPresenter } from '@adapter/presenters';
import {
  Button, Card, CardBody, CardHeader, CardTitle,
} from 'reactstrap';
import i18n from '@config/i18n';
import DataTable from 'react-data-table-component';
import { ChevronDown, Plus } from 'react-feather';
import { Link, useParams } from 'react-router-dom';
import { EditCustomerTabParams } from '@features/Customer/components/tabs/information/CustomerDetailTab';
import leadColumns from '@features/Customer/components/tabs/lead/leadColumns';

export default function LeadsTab() {
  const { customerId } = useParams<EditCustomerTabParams>();
  const {
    data: allLeads = [],
    isFetching,
  } = useQuery(['leads_of_customer', customerId], async () => leadPresenter.getLeadsByCustomer(customerId));
  return (
    <div className="to-table-container">
      <Card>
        <CardHeader>
          <CardTitle tag="h4">{i18n.t('LEAD.LIST')}</CardTitle>
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
              columns={leadColumns}
              sortIcon={<ChevronDown />}
              subHeader
              subHeaderComponent={(
                <Link to={`/apps/customers/${customerId}/leads/create`}>
                  <Button color="primary">
                    <Plus size={14} />
                    <span className="align-middle ms-25">{i18n.t('COMMON.ADD')}</span>
                  </Button>
                </Link>
              )}
              customStyles={{
                cells: {
                  style: {
                    height: 'auto !important',
                    fontSize: '1rem',
                    lineHeight: '1.6rem',
                  },
                },
              }}
              data={allLeads}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
