import React, { useMemo, useState } from 'react';
import LeadStats from '@features/Lead/components/LeadStats';
import { useQuery } from '@tanstack/react-query';
import { leadPresenter } from '@adapter/presenters';
import { LeadStatus } from '@domain/entities/Lead';
import {
  Card, CardBody, CardHeader, CardTitle,
} from 'reactstrap';
import i18n from '@config/i18n';
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';
import leadColumns from '@features/Lead/components/LeadColumns';
import LeadFilter, { LeadFilterParams } from '@features/Lead/components/LeadFilter';
import { filterLeads } from '@utils/LeadUtils';

export default function LeadListPage() {
  const [filterParams, setFilterParams] = useState<LeadFilterParams>();
  const { data: allLeads, isFetching } = useQuery(['leads'], async () => leadPresenter.getAllLeads());
  const leads = useMemo(() => {
    if (!allLeads) return [];
    if (!filterParams) return allLeads;
    return filterLeads(allLeads, filterParams);
  }, [allLeads, filterParams]);
  return (
    <div className="to-table-container">
      <LeadStats
        total={leads.length}
        countNew={leads.filter((lead) => lead.leadStatus === LeadStatus.NEW).length}
        countProcessing={leads.filter((lead) => lead.leadStatus === LeadStatus.PROCESSING).length}
        countClosed={leads.filter((lead) => lead.leadStatus === LeadStatus.CLOSED).length}
        countCancelled={leads.filter((lead) => lead.leadStatus === LeadStatus.CANCEL).length}
      />
      <Card>
        <CardHeader>
          <CardTitle tag="h4">{i18n.t('COMMON.FILTER')}</CardTitle>
        </CardHeader>
        <CardBody>
          <LeadFilter onFilter={(params) => setFilterParams(params)} />
        </CardBody>
      </Card>
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
              customStyles={{
                cells: {
                  style: {
                    height: 'auto !important',
                    fontSize: '1rem',
                    lineHeight: '1.6rem',
                  },
                },
              }}
              data={leads}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
