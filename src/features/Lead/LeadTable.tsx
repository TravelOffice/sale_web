// ** React Imports
import Table from '@components/Table/Table';
import i18n from '@config/i18n';
// ** Store & Actions
import { RootState } from '@redux/store';
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// ** Third Party Components
import Select from 'react-select';
// ** Reactstrap Imports
import {
  Card, CardBody, CardHeader, CardTitle, Col, Label, Row,
} from 'reactstrap';
import { leadActions } from '@redux/slices/leadSlice';
import { Lead, LeadStatusType } from '@domain/entities/Lead';
import { leadColumns } from './LeadColumns';

import LeadSidebar from './LeadSidebar';

const LeadTable = () => {
  // ** Store Vars
  const allLeads = useSelector((state: RootState) => state.lead.allLeads);
  const selectedLead = useSelector((state: RootState) => state.lead.selectedLead);
  const dispatch = useDispatch();
  // ** States
  const openSidebar = useSelector((state: RootState) => state.lead.openSidebar);
  const [currentStatus, setCurrentStatus] = useState({ value: '', label: i18n.t('COMMON.SELECT'), number: 0 });
  const fetchLeadsState = useSelector(
    (state: RootState) => state.lead.fetchAllLeadsState,
  );

  const { getAllLeads, setOpenLeadSidebar: setOpenSidebarAction } = leadActions;

  // ** Function to toggle sidebar
  const setOpenSidebar = (open: boolean) => dispatch(setOpenSidebarAction(open));
  const toggleLeadSidebar = () => setOpenSidebar(!openSidebar);

  // ** User filter options

  const statusOptions = [
    { value: '', label: i18n.t('COMMON.SELECT'), number: 0 },
    { value: 'NEW', label: i18n.t('LEAD.NEW'), number: 1 },
    { value: 'QUALIFYING', label: i18n.t('LEAD.QUALIFYING'), number: 2 },
    { value: 'QUALIFIED', label: i18n.t('LEAD.QUALIFIED'), number: 3 },
    { value: 'TAKING_CARE', label: i18n.t('LEAD.TAKING_CARE'), number: 4 },
  ];

  const onRefresh = useCallback(() => {
    dispatch(getAllLeads(currentStatus.value as LeadStatusType));
  }, []);

  useEffect(() => {
    dispatch(getAllLeads(currentStatus.value as LeadStatusType));
  }, [currentStatus]);

  useEffect(() => () => {
    dispatch(leadActions.resetSidebar());
  }, []);

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
      <Table<Lead>
        selectableRows
        data={allLeads}
        fetchDataState={fetchLeadsState}
        columns={leadColumns}
        searchableColumns={['name', 'primaryPhoneNumber']}
        toggleAddDataSidebar={toggleLeadSidebar}
        sortColumnDefault="createdAt"
        onRowClicked={(lead) => {
          setOpenSidebar(true);
          dispatch(leadActions.selectLead(lead));
        }}
        onPageChange={() => {}}
        onRefresh={onRefresh}
      />
      <LeadSidebar
        open={openSidebar}
        setOpenSidebar={setOpenSidebar}
        toggleSidebar={toggleLeadSidebar}
        lead={selectedLead}
        onClosed={() => dispatch(leadActions.unSelectLead())}
      />
    </>

  );
};

export default LeadTable;
