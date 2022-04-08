// ** React Imports
import React, { Fragment, useState, useEffect } from 'react';

// ** Invoice List Sidebar

// ** Table Columns

// ** Store & Actions
import { leadActions } from '@redux/slices/leadSlice';
import { useDispatch, useSelector } from 'react-redux';

// ** Third Party Components
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Label,
  CardBody,
  CardTitle,
  CardHeader,
} from 'reactstrap';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { RootState } from '@redux/store';
import LeadSideBar from './CreateUpdateLeadSidebar';
import CustomHeader from './CustomHeader';
import { columns } from './columns';
import LeadExpandable from './LeadExpandable';

const UsersList = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.lead);

  // ** States
  const [sort, setSort] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('id');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [addLeadSidebarOpen, setAddLeadSidebarOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({ value: '', label: 'Select Role' });
  const [currentPlan, setCurrentPlan] = useState({ value: '', label: 'Select Plan' });
  const [currentStatus, setCurrentStatus] = useState({ value: '', label: 'Select Status', number: 0 });
  const selectedLead = useSelector((state: RootState) => state.lead.selectedLead);

  // ** Function to toggle sidebar
  const toggleAddLeadSidebar = () => setAddLeadSidebarOpen(!addLeadSidebarOpen);
  const toggleUpdateLeadSidebar = () => dispatch(leadActions.unSelectLead());

  const { getAllLeads, getLead } = leadActions;

  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllLeads());
    dispatch(
      getLead({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value,
      }),
    );
  }, [dispatch, store.data.length, sort, sortColumn, currentPage]);

  // ** User filter options
  const roleOptions = [
    { value: '', label: 'Select Role' },
    { value: 'admin', label: 'Admin' },
    { value: 'author', label: 'Author' },
    { value: 'editor', label: 'Editor' },
    { value: 'maintainer', label: 'Maintainer' },
    { value: 'subscriber', label: 'Subscriber' },
  ];

  const planOptions = [
    { value: '', label: 'Select Plan' },
    { value: 'basic', label: 'Basic' },
    { value: 'company', label: 'Company' },
    { value: 'enterprise', label: 'Enterprise' },
    { value: 'team', label: 'Team' },
  ];

  const statusOptions = [
    { value: '', label: 'Select Status', number: 0 },
    { value: 'pending', label: 'Pending', number: 1 },
    { value: 'active', label: 'Active', number: 2 },
    { value: 'inactive', label: 'Inactive', number: 3 },
  ];

  // ** Function in get data on page change
  const handlePagination = (page: any) => {
    dispatch(
      getLead({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1,
        role: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value,
      }),
    );
    setCurrentPage(page.selected + 1);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e: any) => {
    const radix: number = 2;
    const value = parseInt(e.currentTarget.value, radix);
    dispatch(
      getLead({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: value,
        page: currentPage,
        role: currentRole.value,
        currentPlan: currentPlan.value,
        status: currentStatus.value,
      }),
    );
    setRowsPerPage(value);
  };

  // ** Function in get data on search query change
  const handleFilter = (val: string) => {
    setSearchTerm(val);
    dispatch(
      getLead({
        sort,
        q: val,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value,
      }),
    );
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage));

    return (
      <ReactPaginate
        previousLabel=""
        nextLabel=""
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
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

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      role: currentRole.value,
      currentPlan: currentPlan.value,
      status: currentStatus.value,
      q: searchTerm,
    };

    const isFiltered = Object.entries(filters).some((item) => item[1].length > 0);

    if (store.data.length > 0) {
      return store.data;
    } if (store.data.length === 0 && isFiltered) {
      return [];
    }
    return store.allLeads.slice(0, rowsPerPage);
  };

  const handleSort = (column: any, sortDirection: string) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
    dispatch(
      getLead({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value,
      }),
    );
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Filters</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="role-select">Role</Label>
              <Select
                isClearable={false}
                value={currentRole}
                options={roleOptions}
                className="react-select"
                classNamePrefix="select"
                onChange={(data) => {
                  setCurrentRole(data!);
                  dispatch(
                    getLead({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      role: data!.value,
                      page: currentPage,
                      perPage: rowsPerPage,
                      status: currentStatus.value,
                      currentPlan: currentPlan.value,
                    }),
                  );
                }}
              />
            </Col>
            <Col className="my-md-0 my-1" md="4">
              <Label for="plan-select">Plan</Label>
              <Select
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={planOptions}
                value={currentPlan}
                onChange={(data) => {
                  setCurrentPlan(data!);
                  dispatch(
                    getLead({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      page: currentPage,
                      perPage: rowsPerPage,
                      role: currentRole.value,
                      currentPlan: data!.value,
                      status: currentStatus.value,
                    }),
                  );
                }}
              />
            </Col>
            <Col md="4">
              <Label for="status-select">Status</Label>
              <Select
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                value={currentStatus}
                onChange={(data) => {
                  setCurrentStatus(data!);
                  dispatch(
                    getLead({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      page: currentPage,
                      status: data!.value,
                      perPage: rowsPerPage,
                      role: currentRole.value,
                      currentPlan: currentPlan.value,
                    }),
                  );
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
            expandableRows
            expandableRowsComponent={LeadExpandable}
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
            data={dataToRender()}
            subHeaderComponent={(
              <CustomHeader
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleAddLeadSidebar}
              />
            )}
          />
        </div>
      </Card>

      <LeadSideBar.SidebarNewLead open={addLeadSidebarOpen} toggleSidebar={toggleAddLeadSidebar} />
      <LeadSideBar.SidebarUpdateLead
        open={!!selectedLead}
        toggleSidebar={toggleUpdateLeadSidebar}
      />
    </>
  );
};

export default UsersList;
