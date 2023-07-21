import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { bookingPresenter } from '@adapter/presenters';
import i18n from '@config/i18n';
import { Booking } from '@domain/entities/booking/Booking';
import {
  Card, CardBody, CardHeader, CardTitle, Col, Row,
} from 'reactstrap';
import BookingFilter from '@features/Booking/components/BookingFilter';
import bookingColumns from '@features/Booking/components/BookingColumns';
import Table from '@components/Table/Table';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { ExpanderComponentProps } from 'react-data-table-component';
import { formatVND } from '@utils/CommonUtils';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { EditCustomerTabParams } from '@features/Customer/components/tabs/information/CustomerDetailTab';

const BookingExpandableRowComponent: React.FC<ExpanderComponentProps<Booking>> = (
  { data }: ExpanderComponentProps<Booking>,
) => {
  const { tourTemplate, lead } = data;
  return (
    <div className="container py-xxl-1">
      <Row>
        <Col xl="6">
          <strong>{i18n.t('TOUR_TEMPLATE.PRICE')}</strong>
          {tourTemplate ? (
            <ul>
              {
                tourTemplate.services.map((service) => (
                  <li>
                    {service.name}
                    :
                    {' '}
                    {formatVND(service.price)}
                  </li>
                ))
              }
            </ul>
          ) : <span>N/A</span>}
        </Col>

        <Col xl="6">
          <strong>{i18n.t('BOOKING.BOOKING_RELATED_INFORMATION')}</strong>
          <ul>
            <li>{`${i18n.t('BOOKING.ASSIGNEE')}: ${data.assigneeId ?? i18n.t('BOOKING.NO_ASSIGNEE')}`}</li>
            <li>{`${i18n.t('BOOKING.CREATED_AT')}: ${moment(data.createdAt).format('DD/MM/YYYY')}`}</li>
            {lead ? (
              <li>{`${i18n.t('BOOKING.LEAD_CREATED_AT')}: ${moment(lead.createdAt).format('DD/MM/YYYY')}`}</li>
            ) : <></>}
          </ul>
        </Col>
      </Row>

      <strong>{i18n.t('TOUR_TEMPLATE.CREATOR')}</strong>
    </div>
  );
};

export default function BookingsTab() {
  const { customerId } = useParams<EditCustomerTabParams>();

  const { data: bookings } = useQuery(['bookings', customerId], async () => bookingPresenter.getBookingsByCustomer(customerId));

  const fetchUsersState = useSelector(
    (state: RootState) => state.user.fetchAllUsersState,
  );

  return (
    <>
      <Card className="card-filter">
        <CardHeader>
          <CardTitle tag="h4">{i18n.t('COMMON.FILTER')}</CardTitle>
        </CardHeader>
        <CardBody className="card-filter-body">
          <BookingFilter />
        </CardBody>
      </Card>
      <Table<Booking>
        selectableRows={false}
        columns={bookingColumns}
        fetchDataState={fetchUsersState}
        searchableColumns={[]}
        sortColumnDefault="createdAt"
        data={bookings || []}
        expandableRows
        expandableRowsComponent={BookingExpandableRowComponent}
      />
    </>
  );
}
