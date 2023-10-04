// ** React Imports
import React, { useMemo } from 'react';

// ** Third Party Components
// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import i18n from 'i18next';
import Table from '@components/Table/Table';
import { Lead, LeadStatus } from '@domain/entities/lead/Lead';
import leadExpandableRow from '@features/Lead/components/LeadExpandableRow';
import { useAccessControl } from '@hooks/auth';
import { useQuery } from '@tanstack/react-query';
import { leadPresenter } from '@adapter/presenters';
import { HandleDataState } from '@redux/slices/others/HandleDataState';
import { filterLeads } from '@utils/LeadUtils';
import LeadColumns from '@features/Dashboard/ManagerDashboard/components/LeadColumns';

const CardMarketplaceLeads = () => {
  const rangeFilter = [
    i18n.t('DASHBOARD.LAST_7_DAYS_RANGE'),
    i18n.t('DASHBOARD.LAST_MONTH_RANGE'),
    i18n.t('DASHBOARD.LAST_YEAR_RANGE'),
  ];

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
    return filterLeads(allLeads, { status: LeadStatus.NEW });
  }, [allLeads]);

  return (
    <>
      <Card>
        <CardHeader className="align-items-end">
          <CardTitle tag="h4">{i18n.t('DASHBOARD.LIST_OF_LEADS_CAN_BE_SOLD_ON_TRAVEL_CONNECT')}</CardTitle>
          <UncontrolledDropdown className="chart-dropdown">
            <DropdownToggle color="" className="bg-transparent btn-sm border-0 p-50">
              {i18n.t('DASHBOARD.LAST_7_DAYS_RANGE')}
            </DropdownToggle>
            <DropdownMenu end>
              {rangeFilter.map((item) => (
                <DropdownItem className="w-100" key={item}>
                  {item}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </CardHeader>
        <CardBody>
          <Table<Lead>
            data={leads}
            fetchDataState={fetchTourTemplatesState}
            columns={LeadColumns}
            searchableColumns={['code', 'name', 'email', 'phoneNumber', 'tourTemplateName']}
            sortColumnDefault="createdAt"
            onPageChange={() => {}}
            onRefresh={refetch}
            expandableRows
            expandableRowsComponent={leadExpandableRow}
          />
        </CardBody>
      </Card>
    </>
  );
};
export default CardMarketplaceLeads;
