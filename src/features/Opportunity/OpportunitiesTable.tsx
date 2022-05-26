import i18n from '@config/i18n';
import { opportunityActions } from '@redux/slices/opportunitySlice';
import { RootState } from '@redux/store';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import {
  Card, CardBody, CardHeader,
  CardTitle, Col, Label, Row,
} from 'reactstrap';
import Table from '@components/Table/Table';
import OpportunitySidebar from '@features/Opportunity/OpportunitySidebar';
import useQueryParams from '@hooks/useQueryParams';
import { FilterAttributesOpportunity, OpportunityStatus } from '@domain/entities/opportunity/Opportunity';
import { useLeadAndCustomers } from '@hooks/customer';
import { Customer, Lead } from '@domain/entities/Lead';
import { opportunityColumns } from './OpportunityColumns';

const statusOptions = [
  { value: '', label: i18n.t('COMMON.SELECT'), number: 0 },
  { value: 'INITIALIZED', label: i18n.t('OPP.INITIALIZED'), number: 1 },
  { value: 'ADVISORY', label: i18n.t('OPP.ADVISORY'), number: 2 },
  { value: 'PRICE_QUOTE', label: i18n.t('OPP.PRICE_QUOTE'), number: 3 },
  { value: 'CLOSED_WON', label: i18n.t('OPP.CLOSED_WON'), number: 4 },
  { value: 'CLOSED_LOST', label: i18n.t('OPP.CLOSED_LOST'), number: 5 },
];

function getLeadLabel(leads: Array<Lead | Customer>, leadId?: string | null) {
  const selectedLead = leads.find((lead) => lead.primaryPhoneNumber === leadId);
  return selectedLead ? selectedLead.name : i18n.t('COMMON.SELECT');
}

const OpportunitiesTable = () => {
  const dispatch = useDispatch();

  // ** Store Vars
  const allOpportunities = useSelector((state: RootState) => state.opportunity.allOpportunities);

  // ** States
  const actionState = useSelector((state: RootState) => state.opportunity.actionState);
  const actionErrorMessage = useSelector(
    (state: RootState) => state.opportunity.actionErrorMessage,
  );
  const openSidebar = useSelector((state: RootState) => state.opportunity.openSidebar);
  const setOpenSidebar = useCallback((open: boolean) => {
    dispatch(opportunityActions.setOpenSidebar(open));
  }, [openSidebar]);
  const params = useQueryParams();

  const [currentStatus, setCurrentStatus] = useState({ value: '', label: i18n.t('COMMON.SELECT'), number: 0 });

  const leadsAndCustomers = useLeadAndCustomers();
  const leadsAndCustomersOptions = useMemo(() => {
    const options = [{
      label: i18n.t('COMMON.SELECT'),
      value: '',
    }];
    return [...options, ...leadsAndCustomers.map((item) => ({
      label: `${item.name} - ${item.primaryPhoneNumber}`,
      value: item.primaryPhoneNumber,
    }))];
  }, [leadsAndCustomers]);
  const [currentLeadId, setCurrentLeadId] = useState<string | null>(params.get('leadId'));

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  // Get all the opportunities based on path parameters
  const getOpportunities = () => {
    if (currentLeadId) {
      const filterAttributes: FilterAttributesOpportunity = {
        leadId: currentLeadId,
        status: currentStatus.value as OpportunityStatus,
      };
      dispatch(
        opportunityActions.getOpportunitiesByLead(filterAttributes),
      );
    } else {
      const filterAttributes: FilterAttributesOpportunity = {
        status: currentStatus.value as OpportunityStatus,
      };
      dispatch(opportunityActions.getAllOpportunities(filterAttributes));
    }
  };

  // On refresh the table values, opportunities will be reloaded from server
  const onRefresh = useCallback(() => {
    getOpportunities();
  }, [dispatch, params]);

  useEffect(() => {
    getOpportunities();
  }, [params, currentStatus, currentLeadId]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">{i18n.t('COMMON.FILTERS')}</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="status-select">{i18n.t('OPP.CUSTOMER')}</Label>
              <Select
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={leadsAndCustomersOptions}
                value={{
                  label: getLeadLabel(leadsAndCustomers, currentLeadId),
                  value: currentLeadId,
                }}
                onChange={(data) => {
                  setCurrentLeadId(data?.value!);
                }}
              />
            </Col>
            <Col md="4">
              <Label for="status-select">{i18n.t('COMMON.STATUS')}</Label>
              <Select
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                value={currentStatus}
                onChange={(data) => {
                  setCurrentStatus(data!);
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Table
        data={allOpportunities}
        fetchDataState={actionState}
        fetchDataError={actionErrorMessage}
        columns={opportunityColumns}
        searchableColumns={['name', 'status']}
        toggleAddDataSidebar={toggleSidebar}
        sortColumnDefault="name"
        onPageChange={() => { }}
        onRefresh={onRefresh}
      />
      <OpportunitySidebar
        open={openSidebar}
        toggleSidebar={toggleSidebar}
        onClosed={() => { }}
      />
    </>
  );
};

export default OpportunitiesTable;
