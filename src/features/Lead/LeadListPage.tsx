import React, { useMemo, useState } from 'react';
import LeadStats from '@features/Lead/components/LeadStats';
import { useQuery } from '@tanstack/react-query';
import { leadPresenter } from '@adapter/presenters';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from 'reactstrap';
import i18n from '@config/i18n';
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';
import leadColumns from '@features/Lead/components/LeadColumns';
import LeadFilter, { LeadFilterParams } from '@features/Lead/components/LeadFilter';
import { countLeadData, filterLeads } from '@utils/LeadUtils';
import { useAccessControl } from '@hooks/auth';
import LeadDataTableHeader from '@features/Lead/components/LeadDataTableHeader';

export default function LeadListPage() {
  const [filterParams, setFilterParams] = useState<LeadFilterParams>();
  const { can } = useAccessControl();
  const { data: allLeads = [], isFetching, refetch } = useQuery(['leads'], async () => {
    if (can('get_leads')) {
      return leadPresenter.getAllLeads();
    }
    return leadPresenter.getMyLeads();
  });
  const leads = useMemo(() => {
    if (!allLeads) return [];
    if (!filterParams) return allLeads;
    return filterLeads(allLeads, filterParams);
  }, [allLeads, filterParams]);

  const countData = useMemo(() => countLeadData(allLeads), [allLeads]);
  return (
    <div className="to-table-container">
      <LeadStats
        total={countData.total}
        countNew={countData.countNew}
        countProcessing={countData.countProcessing}
        countClosed={countData.countClosed}
        countCancelled={countData.countCancelled}
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
              subHeader
              subHeaderComponent={(
                <LeadDataTableHeader loading={isFetching} onRefresh={() => refetch()} />
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
              data={leads}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
