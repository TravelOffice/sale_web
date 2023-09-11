// ** React Imports
import React, {
  ReactNode, useCallback, useMemo, useState,
} from 'react';
import {
  Badge,
  Card,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  TabContent,
  TabPane,
  UncontrolledButtonDropdown,
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
  Calendar, Columns, DollarSign, Home, Navigation, Users,
} from 'react-feather';
import ToursOperationGeneralPane from '@features/ToursOperation/General/ToursOperationGeneralPane';
import EstimationPage from '@features/ToursOperation/Estimation/EstimationPage';
import { Booking } from '@domain/entities/booking/Booking';
import TourReportPage from '@features/ToursOperation/Summary/TourReportPage';
import ToursOperationPlan from '@features/ToursOperation/TourPlan/ToursOperationPlan';
import TourOperationStatusBadge from '@features/ToursOperation/components/TourOperationStatusBadge';
import TourOperationStatus from '@domain/entities/tour/TourOperationstatus';
import { DepartureTour } from '@domain/entities/tour';
import { Passenger } from '@domain/entities/booking/Passenger';
import moment from 'moment';
import ToursOperationBookingPane from './Booking/ToursOperationBookingPane';
import ToursOperationPassengerListPane from './Passenger/ToursOperationPassengerListPane';

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
    icon: <Calendar size={16} className="me-50" />,
    title: i18n.t('TOURS_OPERATION.TOUR_BOOKING_LIST'),
    pane: <ToursOperationBookingPane />,
  },
  {
    id: 'passengerList',
    icon: <Users size={16} className="me-50" />,
    title: i18n.t('BOOKING.PASSENGER.PASSENGER_LIST'),
    pane: <ToursOperationPassengerListPane />,
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

const passengerHeaders = [
  { label: i18n.t('BOOKING.PASSENGER.NAME'), key: 'name' },
  { label: i18n.t('BOOKING.PASSENGER.BIRTHDAY'), key: 'birthday' },
  { label: i18n.t('BOOKING.PASSENGER.PHONE_NUMBER'), key: 'phoneNumber' },
  { label: i18n.t('BOOKING.PASSENGER.EMAIL'), key: 'email' },
  { label: i18n.t('BOOKING.PASSENGER.ADDRESS'), key: 'address' },
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

  const passengers: Passenger[] = useMemo(() => {
    if (!bookings) return [];
    return bookings.filter((booking) => booking.passengers)
      .flatMap((booking: Booking) => (booking.passengers.map(
        (passenger) => ({ ...passenger, bookingCode: booking.code, birthday: passenger.birthday ? moment(passenger.birthday).format('DD/MM/YYYY') : '' }),
      )));
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
                  <CSVLink data={passengers} headers={passengerHeaders} filename={`passengers_${departureTour?.name}.csv`}>
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
