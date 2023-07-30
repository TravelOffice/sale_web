import React, { useMemo, useState } from 'react';
import LeadStats from '@features/Lead/components/LeadStats';
import { useQuery } from '@tanstack/react-query';
import { leadPresenter } from '@adapter/presenters';
import {
  ButtonProps, Card, CardBody, CardHeader, CardTitle,
} from 'reactstrap';
import Table from '@components/Table/Table';
import i18n from '@config/i18n';
import leadColumns from '@features/Lead/components/LeadColumns';
import LeadFilter, { LeadFilterParams } from '@features/Lead/components/LeadFilter';
import { countLeadData, filterLeads } from '@utils/LeadUtils';
import { useAccessControl } from '@hooks/auth';
import { Lead } from '@domain/entities/lead/Lead';
import { HandleDataState } from '@redux/slices/others/HandleDataState';
import { useHistory } from 'react-router-dom';
import leadExpandableRow from '@features/Lead/components/LeadExpandableRow';

export default function LeadListPage() {
  const history = useHistory();
  const [filterParams, setFilterParams] = useState<LeadFilterParams>();
  const { can } = useAccessControl();
  const {
    data: allLeads = [], isFetching, isFetched, isError, refetch,
  } = useQuery(['leads'], async () => {
    if (can('get_leads')) {
      return leadPresenter.getAllLeads();
    }
    return leadPresenter.getMyLeads();
  });

  const fetchTourTemplatesState: HandleDataState = useMemo(() => {
    if (isFetching) return 'loading';
    if (isFetched) return 'finished';
    if (isError) return 'error';
    return 'init';
  }, [isFetching, isFetched, isError]);

  const leads = useMemo(() => {
    if (!allLeads) return [];
    if (!filterParams) return allLeads;
    return filterLeads(allLeads, filterParams);
  }, [allLeads, filterParams]);

  const leadBtnArr: Array<ButtonProps> = [
    {
      name: i18n.t('COMMON.ADD'),
      handleOnClick: () => {
        history.push('/apps/leads/create');
      },
    },
  ];

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
          <Table<Lead>
            data={leads}
            fetchDataState={fetchTourTemplatesState}
            columns={leadColumns}
            searchableColumns={['code', 'name', 'email', 'phoneNumber', 'tourTemplateName']}
            sortColumnDefault="createdAt"
            onPageChange={() => {}}
            onRefresh={refetch}
            extraButtons={leadBtnArr}
            expandableRows
            expandableRowsComponent={leadExpandableRow}
          />
        </CardBody>
      </Card>
    </div>
  );
}
