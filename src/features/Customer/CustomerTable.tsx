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
import { customerActions } from '@redux/slices/customerSlice';
import { Customer, CustomerStatusType } from '@domain/entities/Lead';
import { customerColumns } from './CustomerColumns';

import CustomerSidebar from './CustomerSidebar';

const CustomerTable = () => {
  // ** Store Vars
  const allCustomers = useSelector((state: RootState) => state.customer.allCustomers);
  const selectedCustomer = useSelector((state: RootState) => state.customer.selectedCustomer);
  const dispatch = useDispatch();
  // ** States
  const openSidebar = useSelector((state: RootState) => state.customer.openSidebar);
  const [currentStatus, setCurrentStatus] = useState({ value: '', label: i18n.t('COMMON.SELECT'), number: 0 });
  const fetchCustomersState = useSelector(
    (state: RootState) => state.customer.fetchAllCustomersState,
  );

  const { getAllCustomers, setOpenSidebar: setOpenSidebarAction } = customerActions;

  // ** Function to toggle sidebar
  const setOpenSidebar = (open: boolean) => dispatch(setOpenSidebarAction(open));
  const toggleCustomerLeadSidebar = () => setOpenSidebar(!openSidebar);

  // ** User filter options

  const statusOptions = [
    { value: '', label: i18n.t('COMMON.SELECT'), number: 0 },
    { value: 'NEW', label: i18n.t('CUSTOMER.NEW'), number: 1 },
    { value: 'TRADING', label: i18n.t('CUSTOMER.TRADING'), number: 2 },
    { value: 'TRADED', label: i18n.t('CUSTOMER.TRADED'), number: 3 },
  ];

  const onRefresh = useCallback(() => {
    dispatch(getAllCustomers(currentStatus.value as CustomerStatusType));
  }, []);

  useEffect(() => {
    dispatch(getAllCustomers(currentStatus.value as CustomerStatusType));
  }, [currentStatus]);

  useEffect(() => () => {
    dispatch(customerActions.resetSidebar());
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
      <Table<Customer>
        data={allCustomers}
        fetchDataState={fetchCustomersState}
        columns={customerColumns}
        searchableColumns={['name', 'primaryPhoneNumber']}
        toggleAddDataSidebar={toggleCustomerLeadSidebar}
        sortColumnDefault="createdAt"
        onRowClicked={(customer) => {
          setOpenSidebar(true);
          dispatch(customerActions.selectCustomer(customer));
        }}
        onPageChange={() => {}}
        onRefresh={onRefresh}
      />
      <CustomerSidebar
        open={openSidebar}
        toggleSidebar={toggleCustomerLeadSidebar}
        customer={selectedCustomer}
        onClosed={() => dispatch(customerActions.unSelectCustomer())}
      />
    </>

  );
};

export default CustomerTable;
