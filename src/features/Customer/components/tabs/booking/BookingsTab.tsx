import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { bookingPresenter } from '@adapter/presenters';
import i18n from '@config/i18n';
import { Booking } from '@domain/entities/booking/Booking';
import { ButtonProps, Col, Row } from 'reactstrap';
import Table from '@components/Table/Table';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { ExpanderComponentProps } from 'react-data-table-component';
import { formatVND } from '@utils/CommonUtils';
import moment from 'moment';
import { Link, useHistory, useParams } from 'react-router-dom';
import { EditCustomerTabParams } from '@features/Customer/components/tabs/information/CustomerDetailTab';
import bookingColumns from '@features/Customer/components/tabs/booking/bookingColumns';

const BookingExpandableRowComponent: React.FC<ExpanderComponentProps<Booking>> = (
  { data }: ExpanderComponentProps<Booking>,
) => {
  const { lead } = data;
  return (
    <div className="container py-xxl-1">
      <Row>
        <Col xl="6">
          <strong>{i18n.t('TOUR_TEMPLATE.PRICE')}</strong>
          {data.services ? (
            <ul>
              {
                data.services.map((service) => (
                  <li>
                    {service.serviceName}
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
            <li>
              {i18n.t('BOOKING.ASSIGNEE')}
              :
              {' '}
              <Link
                to={`/apps/user/view/${data.assigneeId}`}
                className="user_name text-truncate text-body"
              >
                <span className="fw-bolder text-primary">
                  {`${data.assigneeName} - ${data.assigneeId}`}
                </span>
              </Link>
            </li>
            <li>
              {i18n.t('CUSTOMER.CREATOR')}
              :
              {' '}
              <Link
                to={`/apps/user/view/${data.creatorId}`}
                className="user_name text-truncate text-body"
              >
                <span className="fw-bolder text-primary">
                  {`${data.creatorName} - ${data.creatorId}`}
                </span>
              </Link>
            </li>
            <li>{`${i18n.t('BOOKING.CREATED_AT')}: ${moment(data.createdAt).format('DD/MM/YYYY')}`}</li>
            {lead ? (
              <li>{`${i18n.t('BOOKING.LEAD_CREATED_AT')}: ${moment(lead.createdAt).format('DD/MM/YYYY')}`}</li>
            ) : <></>}
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default function BookingsTab() {
  const { customerId } = useParams<EditCustomerTabParams>();

  const { data: bookings } = useQuery(['bookings', customerId], async () => bookingPresenter.getBookingsByCustomer(customerId));

  const history = useHistory();

  const additionalActionButtons: Array<ButtonProps> = useMemo(() => [
    {
      name: i18n.t('COMMON.ADD'),
      handleOnClick: () => {
        history.push('/apps/bookings/create');
      },
    },
  ], []);

  const fetchUsersState = useSelector(
    (state: RootState) => state.user.fetchAllUsersState,
  );

  return (
    <>
      <Table<Booking>
        selectableRows={false}
        columns={bookingColumns}
        fetchDataState={fetchUsersState}
        searchableColumns={[]}
        sortColumnDefault="createdAt"
        data={bookings || []}
        expandableRows
        expandableRowsComponent={BookingExpandableRowComponent}
        extraButtons={additionalActionButtons}
      />
    </>
  );
}
