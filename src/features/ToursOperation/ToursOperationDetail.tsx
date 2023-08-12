// ** React Imports
import React, {
  ReactNode, useCallback, useMemo, useState,
} from 'react';
import {
  Badge,
  Card, CardHeader, DropdownItem, DropdownMenu, DropdownToggle,
  TabContent, TabPane, UncontrolledButtonDropdown,
} from 'reactstrap';
import i18n from '@config/i18n';
import { CSVLink } from 'react-csv';

import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { tourPresenter } from '@adapter/presenters';
import { useAccessControl } from '@hooks/auth';
import { RequirePermissions } from '@domain/entities/RequirePermissions';
import ToursOperationDetailTabs from '@features/ToursOperation/components/ToursOperationDetailTabs';
import {
  Columns,
  DollarSign,
  Home,
  Navigation, ShoppingCart, Users,
} from 'react-feather';
import ToursOperationGeneralPane from '@features/ToursOperation/components/ToursOperationGeneralPane';
import EstimationPage from '@features/ToursOperation/Estimation/EstimationPage';
import ToursOperationCustomerListPane from '@features/ToursOperation/components/ToursOperationCustomerListPane';
import { CustomerWithBookingData } from '@domain/entities/customer/Customer';
import { Booking } from '@domain/entities/booking/Booking';
import { generateI18nForCustomer } from '@utils/CustomerUtils';
import TourReportPage from '@features/ToursOperation/Summary/TourReportPage';
import ToursOperationPlan from '@features/ToursOperation/TourPlan/ToursOperationPlan';
import TourOperationStatusBadge from '@features/ToursOperation/components/TourOperationStatusBadge';
import TourOperationStatus from '@domain/entities/tour/TourOperationstatus';
import { DepartureTour } from '@domain/entities/tour';
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
    icon: <Home size={16} className="me-50" />,
    title: i18n.t('TOURS_OPERATION.TOUR_GENERAL'),
    pane: <ToursOperationGeneralPane />,
  },
  {
    id: 'bookingList',
    icon: <ShoppingCart size={16} className="me-50" />,
    title: i18n.t('TOURS_OPERATION.TOUR_BOOKING_LIST'),
    pane: <ToursOperationBookingPane />,
  },
  {
    id: 'customerList',
    icon: <Users size={16} className="me-50" />,
    title: i18n.t('TOURS_OPERATION.TOUR_CUSTOMER_LIST'),
    pane: <ToursOperationCustomerListPane />,
  },
  {
    id: 'tourEstimation',
    icon: <DollarSign size={16} className="me-50" />,
    title: i18n.t('TOURS_OPERATION.TOUR_ESTIMATION'),
    pane: <EstimationPage />,
  },
  {
    id: 'tourReport',
    icon: <Columns size={16} className="me-50" />,
    title: i18n.t('TOURS_OPERATION.TOUR_REPORT'),
    pane: <TourReportPage />,
  },
  {
    id: 'tourPlan',
    icon: <Navigation size={16} className="me-50" />,
    title: i18n.t('TOURS_OPERATION.TOUR_PLAN'),
    pane: <ToursOperationPlan />,
  },
];

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

const ToursOperationDetail = () => {
  const { tourId } = useParams<ToursOperationDetailParams>();
  const { data: departureTour } = useQuery(
    ['departureTours', tourId],
    async () => tourPresenter.getDepartureTour(tourId),
  );

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const { canAccess } = useAccessControl();
  const queryClient = useQueryClient();

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

  const handleStatusChanged = useCallback((status: TourOperationStatus) => {
    queryClient.setQueryData(['departureTours', tourId], (oldData: DepartureTour | undefined) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        operationStatus: status,
      };
    });
  }, []);

  return (
    <div className="to-table-container">
      <Card>
        <CardHeader>
          <div className="d-flex flex-row align-items-center">
            <span className="me-1">
              {i18n.t('TOURS_OPERATION.TOUR_CODE')}
              {': '}
              <strong className="font-medium-3">{tourId}</strong>
            </span>
            {
              !!departureTour && (
                <TourOperationStatusBadge
                  tourId={tourId}
                  status={departureTour.operationStatus}
                  onStatusChanged={handleStatusChanged}
                />
              )
            }
            <Badge />
          </div>
          <div className="d-flex flex-row justify-content-end">
            <UncontrolledButtonDropdown>
              <DropdownToggle outline color="primary" caret>
                {i18n.t('COMMON.ACTIONS')}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag="div">{i18n.t('TOURS_OPERATION.SEND_EMAIL_TO_TOUR_GROUP')}</DropdownItem>
                <DropdownItem tag="div">{i18n.t('TOURS_OPERATION.PRINT_TOUR_PLAN')}</DropdownItem>
                <DropdownItem tag="div">{i18n.t('TOURS_OPERATION.PRINT_TOUR_VISITORS_LIST')}</DropdownItem>
                <DropdownItem tag="div">{i18n.t('TOURS_OPERATION.PRINT_TOUR_REPORT')}</DropdownItem>
                <DropdownItem tag="div">{i18n.t('TOURS_OPERATION.PRINT_TOUR_ESTIMATION')}</DropdownItem>
                <DropdownItem tag="div">
                  <CSVLink data={customers} headers={customerHeaders} filename={`customers_${departureTour?.name}.csv`}>
                    {i18n.t('TOURS_OPERATION.EXPORT_EXCEL_PASSENGERS')}
                  </CSVLink>
                </DropdownItem>
                <DropdownItem tag="div">{i18n.t('TOURS_OPERATION.PRINT_INSURANCE')}</DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </div>
        </CardHeader>
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
