// ** React Imports
import toasty from '@components/Toasty/Toasty';
import i18n from '@config/i18n';
import { Lead } from '@domain/entities/Lead';
// ** Store & Actions
import { leadActions } from '@redux/slices/leadSlice';
import { RootState } from '@redux/store';
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import React, {
  ChangeEvent, useEffect, useMemo, useState,
} from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
// ** Third Party Components
import Select from 'react-select';
// ** Reactstrap Imports
import {
  Card, CardBody, CardHeader, CardTitle, Col, Label, Row,
} from 'reactstrap';
import { columns } from './columns';
import CustomHeader from './CustomHeader';
import LeadSidebar from './CreateUpdateLeadSidebar';

const LeadsList = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.lead);

  // ** States
  const [sort, setSort] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('createdAt');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [addLeadSidebarOpen, setAddLeadSidebarOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState({ value: '', label: 'Select Status', number: 0 });
  const selectedLead = useSelector((state: RootState) => state.lead.selectedLead);
  const fetchLeadsState = useSelector((state: RootState) => state.lead.fetchAllLeadsState);
  const fetchLeadsError = useSelector((state: RootState) => state.lead.fetchAllLeadsError);

  // ** Function to toggle sidebar
  const toggleAddLeadSidebar = () => setAddLeadSidebarOpen(!addLeadSidebarOpen);
  const toggleUpdateLeadSidebar = () => dispatch(leadActions.unSelectLead());

  const { getAllLeads } = leadActions;

  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllLeads());
  }, [dispatch]);

  useEffect(() => {
    if (fetchLeadsState === 'error') {
      toasty.show({ title: i18n.t('COMMON.ERROR'), type: 'error', message: `${fetchLeadsError?.errorMsg}` });
    }
  }, [fetchLeadsState]);

  // ** User filter options

  const statusOptions = [
    { value: '', label: i18n.t('COMMON.SELECT'), number: 0 },
    { value: 'NEW', label: i18n.t('LEAD.NEW'), number: 1 },
    { value: 'QUALIFYING', label: i18n.t('LEAD.QUALIFYING'), number: 2 },
    { value: 'QUALIFIED', label: i18n.t('LEAD.QUALIFIED'), number: 3 },
    { value: 'TAKING_CARE', label: i18n.t('LEAD.TAKING_CARE'), number: 4 },
  ];

  // ** Function in get data on page change
  const handlePagination = (selectedPage: number) => {
    setCurrentPage(selectedPage + 1);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    //  The base of the number is decimal
    const radix: number = 10;
    const value = parseInt(e.currentTarget.value, radix);
    setRowsPerPage(value);
  };

  // ** Function in get data on search query change
  const handleFilter = (val: string) => {
    setSearchTerm(val);
  };

  // ** Function to re-fetching data
  const handleRefresh = () => {
    dispatch(getAllLeads());
    setCurrentPage(1);
  };

  // ** Table data to render
  const { filteredLeads, totalRows } = useMemo(() => {
    let leads = [...store.allLeads];
    // Filter leads by status
    if (currentStatus.value) {
      leads = leads.filter((lead: Lead) => lead.status === currentStatus.value);
    }
    // Filter leads by search key
    if (searchTerm) {
      leads = leads.filter(
        (lead: Lead) => lead.name.includes(searchTerm)
        || lead.primaryPhoneNumber.includes(searchTerm),
      );
    }
    // Sort leads by name or phone number columns
    leads = leads.sort(
      (a: any, b: any) => (a[sortColumn] > b[sortColumn] ? 1 : -1) * (sort === 'asc' ? 1 : -1),
    );
    const total = leads.length;
    // Get leads of current page
    leads = leads.slice((currentPage - 1) * rowsPerPage, rowsPerPage * currentPage);
    return { filteredLeads: leads, totalRows: total };
  }, [store.allLeads, currentStatus, searchTerm, sortColumn, sort, rowsPerPage, currentPage]);

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(totalRows / rowsPerPage));
    return (
      <ReactPaginate
        previousLabel=""
        nextLabel=""
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page.selected)}
        pageClassName="page-item"
        nextLinkClassName="page-link"
        nextClassName="page-item next"
        previousClassName="page-item prev"
        previousLinkClassName="page-link"
        pageLinkClassName="page-link"
        containerClassName="pagination react-paginate justify-content-end my-2 pe-1"
      />
    );
  };

  const handleSort = (column: any, sortDirection: string) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

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

      <Card className="overflow-hidden">
        <div className="react-dataTable">
          <DataTable
            noHeader
            selectableRows
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={filteredLeads}
            subHeaderComponent={(
              <CustomHeader
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                loading={fetchLeadsState === 'loading'}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleAddLeadSidebar}
                handleRefresh={handleRefresh}
              />
            )}
          />
        </div>
      </Card>

      <LeadSidebar.SidebarNewLead open={addLeadSidebarOpen} toggleSidebar={toggleAddLeadSidebar} />
      <LeadSidebar.SidebarUpdateLead
        open={!!selectedLead}
        toggleSidebar={toggleUpdateLeadSidebar}
      />
    </>
  );
};

export default LeadsList;
