import i18n from '@config/i18n';
import { opportunityActions } from '@redux/slices/opportunitySlice';
import { RootState } from '@redux/store';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import {
  Card, CardBody, CardHeader, CardTitle, Col, Label, Row,
} from 'reactstrap';
import Table from '@components/Table/Table';
import OpportunitySidebar from '@features/Opportunity/OpportunitySidebar';
import useQueryParams from '@hooks/useQueryParams';
import { FilterAttributesOpportunity, OpportunityStatus } from '@domain/entities/opportunity/Opportunity';
import { opportunityColumns } from './OpportunityColumns';

const statusOptions = [
  { value: '', label: i18n.t('COMMON.SELECT'), number: 0 },
  { value: 'INITIALIZED', label: i18n.t('OPP.INITIALIZED'), number: 1 },
  { value: 'ADVISORY', label: i18n.t('OPP.ADVISORY'), number: 2 },
  { value: 'PRICE_QUOTE', label: i18n.t('OPP.PRICE_QUOTE'), number: 3 },
  { value: 'CLOSED_WON', label: i18n.t('OPP.CLOSED_WON'), number: 4 },
  { value: 'CLOSED_LOST', label: i18n.t('OPP.CLOSED_LOST'), number: 5 },
];

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

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const getOpportunities = () => {
    const leadId = params.get('leadId');
    if (leadId) {
      const filterAttributes: FilterAttributesOpportunity = {
        leadId,
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

  const onRefresh = useCallback(() => {
    getOpportunities();
  }, [dispatch, params]);

  useEffect(() => {
    getOpportunities();
  }, [params, currentStatus]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">{i18n.t('COMMON.FILTERS')}</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
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
