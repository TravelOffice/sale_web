// ** React Imports
import Table from '@components/Table/Table';
import i18n from '@config/i18n';
// ** Store & Actions
import { leadActions } from '@redux/slices/leadSlice';
import { RootState } from '@redux/store';
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// ** Third Party Components
import Select from 'react-select';
// ** Reactstrap Imports
import {
  Card, CardBody, CardHeader, CardTitle, Col, Label, Row,
} from 'reactstrap';
import LeadSidebar from './CreateUpdateLeadSidebar';
import { columns } from './LeadColumns';

const LeadTable = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const allLeads = useSelector((state: RootState) => state.lead.allLeads);

  // ** States
  const [addLeadSidebarOpen, setAddLeadSidebarOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState({ value: '', label: i18n.t('COMMON.SELECT'), number: 0 });
  const selectedLead = useSelector((state: RootState) => state.lead.selectedLead);
  const fetchLeadsState = useSelector((state: RootState) => state.lead.fetchAllLeadsState);
  const fetchLeadsError = useSelector((state: RootState) => state.lead.fetchAllLeadsError?.errorMsg || '');

  // ** Function to toggle sidebar
  const toggleAddLeadSidebar = () => setAddLeadSidebarOpen(!addLeadSidebarOpen);
  const toggleUpdateLeadSidebar = () => dispatch(leadActions.unSelectLead());

  const { getAllLeads } = leadActions;

  // ** User filter options
  const statusOptions = [
    { value: '', label: i18n.t('COMMON.SELECT'), number: 0 },
    { value: 'NEW', label: i18n.t('LEAD.NEW'), number: 1 },
    { value: 'QUALIFYING', label: i18n.t('LEAD.QUALIFYING'), number: 2 },
    { value: 'QUALIFIED', label: i18n.t('LEAD.QUALIFIED'), number: 3 },
    { value: 'TAKING_CARE', label: i18n.t('LEAD.TAKING_CARE'), number: 4 },
  ];

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
        data={allLeads}
        fetchDataState={fetchLeadsState}
        fetchDataError={fetchLeadsError}
        columns={columns}
        searchableColumns={['name', 'primaryPhoneNumber']}
        toggleAddDataSidebar={toggleAddLeadSidebar}
        sortColumnDefault="createdAt"
        filterColumns={[{
          key: 'status',
          value: currentStatus.value,
        }]}
        getDataAction={getAllLeads}
      />
      <LeadSidebar.SidebarNewLead open={addLeadSidebarOpen} toggleSidebar={toggleAddLeadSidebar} />
      <LeadSidebar.SidebarUpdateLead
        open={!!selectedLead}
        toggleSidebar={toggleUpdateLeadSidebar}
      />
    </>
  );
};

export default LeadTable;
