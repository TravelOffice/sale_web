// ** React Imports
import React, { ReactNode, useMemo, useState } from 'react';
import {
  Button, Card, CardBody, CardHeader, TabContent, TabPane,
} from 'reactstrap';
import i18n from '@config/i18n';
import { CSVLink } from 'react-csv';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { tourPresenter } from '@adapter/presenters';
import { generateI18nForTourOperation } from '@utils/TousOperationUtils';
import { useAccessControl } from '@hooks/auth';
import { RequirePermissions } from '@domain/entities/RequirePermissions';
import ToursOperationDetailTabs from '@features/ToursOperation/components/ToursOperationDetailTabs';
import { List } from 'react-feather';
import CommingSoon from '@components/CommingSoon/CommingSoon';
import ToursOperationGeneralPane from '@features/ToursOperation/components/ToursOperationGeneralPane';
import EstimationListPage from '@features/ToursOperation/Estimation/EstimationListPage';
import ToursOperationCustomerListPane from '@features/ToursOperation/components/ToursOperationCustomerListPane';
import { CustomerWithBookingData } from '@domain/entities/customer/Customer';
import { Booking } from '@domain/entities/booking/Booking';
import { generateI18nForCustomer } from '@utils/CustomerUtils';
import ToursOperationBookingPane from './components/ToursOperationBookingPane';

export interface ToursOperationDetailParams {
  tourId: string,
}

export interface Tab {
  id: string,
  title: string,
  icon: ReactNode,
  pane: ReactNode,
  requiredPermissions?: RequirePermissions,
}

const tabs: Tab[] = [
  {
    id: 'tourGeneral',
    icon: <List size={16} className="me-50" />,
    title: i18n.t('TOURS_OPERATION.TOUR_GENERAL'),
    pane: <ToursOperationGeneralPane />,
  },
  {
    id: 'bookingList',
    icon: <List size={16} className="me-50" />,
    title: i18n.t('TOURS_OPERATION.TOUR_BOOKING_LIST'),
    pane: <ToursOperationBookingPane />,
  },
  {
    id: 'customerList',
    icon: <List size={16} className="me-50" />,
    title: i18n.t('TOURS_OPERATION.TOUR_CUSTOMER_LIST'),
    pane: <ToursOperationCustomerListPane />,
  },
  {
    id: 'tourEstimation',
    icon: <List size={16} className="me-50" />,
    title: i18n.t('TOURS_OPERATION.TOUR_ESTIMATION'),
    pane: <EstimationListPage />,
  },
  {
    id: 'tourReport',
    icon: <List size={16} className="me-50" />,
    title: i18n.t('TOURS_OPERATION.TOUR_REPORT'),
    pane: <CommingSoon />,
  },
  {
    id: 'tourPlan',
    icon: <List size={16} className="me-50" />,
    title: i18n.t('TOURS_OPERATION.TOUR_PLAN'),
    pane: <CommingSoon />,
  },
];

const ToursOperationDetail = () => {
  const { tourId } = useParams<ToursOperationDetailParams>();
  const { data: departureTour } = useQuery(
    ['departureTours', tourId],
    async () => tourPresenter.getDepartureTour(tourId),
  );

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const { canAccess } = useAccessControl();

  const {
    data: bookings,
  } = useQuery(['bookingsWithCustomer'], async () => tourPresenter.getBookingsByDepartureTour(tourId));

  const customers: CustomerWithBookingData[] = useMemo(() => {
    if (!bookings) return [];
    return bookings.map((booking: Booking) => ({
      ...booking.customer,
      sex: generateI18nForCustomer(booking.customer?.sex),
      assigneeName: booking.assigneeName,
      notes: booking.notes,
      services: booking.services,
      totalPax: booking.services.reduce((total, item) => total + item.quantity, 0),
    }) as CustomerWithBookingData);
  }, [bookings]);

  const customerHeaders = [
    { label: 'code', key: 'code' },
    { label: i18n.t('CUSTOMER.NAME'), key: 'name' },
    { label: i18n.t('CUSTOMER.BIRTHDAY'), key: 'birthday' },
    { label: i18n.t('CUSTOMER.SEX'), key: 'sex' },
    { label: i18n.t('CUSTOMER.EMAIL'), key: 'email' },
    { label: i18n.t('CUSTOMER.ADDRESS'), key: 'address' },
    { label: i18n.t('CUSTOMER.LEVEL'), key: 'level' },
    { label: i18n.t('CUSTOMER.PHONE'), key: 'primaryPhoneNumber' },
    { label: i18n.t('CUSTOMER.ASSIGNEE'), key: 'assigneeName' },
    { label: i18n.t('BOOKING.TOTAL_PAX'), key: 'totalPax' },
  ];

  return (
    <div className="to-table-container">
      <Card>
        <CardHeader>
          <span>
            {`${i18n.t('TOURS_OPERATION.TOUR_CODE')}: ${tourId}`}
            {' | '}
            {`${i18n.t('TOURS_OPERATION.TOUR_CREATED_BY')}: ${departureTour ? departureTour.creatorName : ''}`}
            {' | '}
            {`${i18n.t('TOURS_OPERATION.TOUR_OPERATED_BY')}: ${departureTour ? departureTour.creatorName : ''}`}
          </span>
          <span className="align-middle ms-25">
            {`${i18n.t('TOURS_OPERATION.TOUR_OPERATION_CURRENT_STATUS')} : ${departureTour ? generateI18nForTourOperation(departureTour.operationStatus) : ''}`}
          </span>
        </CardHeader>
        <CardBody>
          <Button color="primary" outline>
            <CSVLink data={customers} headers={customerHeaders} filename={`customers_${departureTour?.name}.csv`}>
              {i18n.t('TOURS_OPERATION.EXPORT_EXCEL_PASSENGERS')}
            </CSVLink>
          </Button>
        </CardBody>
      </Card>
      <ToursOperationDetailTabs
        tabs={tabs}
        activeTab={activeTab}
        toggleTab={setActiveTab}
      />
      <TabContent activeTab={activeTab}>
        {
          tabs.map((tab) => (
            <TabPane key={tab.id} tabId={tab.id}>
              {canAccess(tab.requiredPermissions || []) && tab.pane}
            </TabPane>
          ))
        }
      </TabContent>
    </div>
  );
};

export default ToursOperationDetail;
