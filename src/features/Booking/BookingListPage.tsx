import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { bookingPresenter } from '@adapter/presenters';
import i18n from '@config/i18n';
import { Booking, BookingStatus } from '@domain/entities/booking/Booking';
import Statistics from '@components/Statistics/Statistics';
import { StatisticItemProps } from '@components/Statistics/StatisticItem';
import {
  Check, DollarSign, Loader, Plus, RefreshCw, Star, X,
} from 'react-feather';
import { AvatarColor } from '@components/Avatar/Avatar';
import {
  Button, Card, CardBody, CardHeader, CardTitle, Col, Row,
} from 'reactstrap';
import BookingFilter from '@features/Booking/components/BookingFilter';
// import { Link } from 'react-router-dom';
import bookingColumns from '@features/Booking/components/BookingColumns';
import Table from '@components/Table/Table';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { ExpanderComponentProps } from 'react-data-table-component';
import { formatVND } from '@utils/CommonUtils';
import moment from 'moment';

type BookingStatisticSettings = {
  [key in BookingStatus]: { color: AvatarColor, icon: JSX.Element, hidden?: boolean }
};

const bookingStatisticSettings: BookingStatisticSettings = {
  INITIALIZED: { color: 'light-info', icon: <Plus size={20} />, hidden: true },
  IN_PROCESS: { color: 'light-warning', icon: <Loader size={20} /> },
  CONFIRMED: { color: 'light-info', icon: <Check size={20} />, hidden: true },
  PAYMENT_PENDING: { color: 'light-info', icon: <DollarSign size={20} /> },
  COMPLETED: { color: 'light-success', icon: <Star size={20} /> },
  CANCELED: { color: 'light-danger', icon: <X size={20} /> },
};

function prepareStatisticalItems(bookings: Booking[]): StatisticItemProps[] {
  const total = bookings.length.toString();
  const items: StatisticItemProps[] = [
    {
      color: 'light-primary', icon: <Loader size={20} />, title: total, subtitle: i18n.t('COMMON.TOTAL'),
    },
  ];
  const filteredItems = Object.entries(bookingStatisticSettings)
    .filter(([, setting]) => !setting.hidden)
    .map(([status, setting]) => {
      const { color, icon } = setting;
      const countByStatus = bookings.filter((booking) => booking.bookingStatus === status).length;
      return {
        color,
        icon,
        title: countByStatus.toString(),
        subtitle: i18n.t(`BOOKING.${status.toUpperCase()}`),
      };
    });
  return items.concat(filteredItems);
}

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
              <li>{`${i18n.t('TOUR_TEMPLATE.ADULT_PRICE')}: ${formatVND(tourTemplate.adultPrice)}`}</li>
              {tourTemplate.child8to11Price && <li>{`${i18n.t('TOUR_TEMPLATE.CHILD_8_11_PRICE')}: ${formatVND(tourTemplate.child8to11Price)}`}</li>}
              {tourTemplate.child5to7Price && <li>{`${i18n.t('TOUR_TEMPLATE.CHILD_5_7_PRICE')}: ${formatVND(tourTemplate.child5to7Price)}`}</li>}
              {tourTemplate.childUnder5Price && <li>{`${i18n.t('TOUR_TEMPLATE.CHILD_5_7_PRICE')}: ${formatVND(tourTemplate.childUnder5Price)}`}</li>}
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

export default function BookingListPage() {
  const { data: bookings, isFetching } = useQuery(['bookings'], async () => bookingPresenter.getBookings());

  const filteredBookings = useMemo(() => {
    if (!bookings) return [];
    return bookings;
  }, [bookings]);

  const fetchUsersState = useSelector(
    (state: RootState) => state.user.fetchAllUsersState,
  );

  console.log(isFetching, useState);
  console.log(bookings);

  function resetFilterParams() {
    // Clear all the filtered params
  }

  return (
    <>
      <Statistics items={prepareStatisticalItems(filteredBookings)} />
      <Card className="card-filter">
        <CardHeader>
          <CardTitle tag="h4">{i18n.t('COMMON.FILTER')}</CardTitle>
          <Button color="primary" onClick={() => resetFilterParams()}>
            <RefreshCw size={14} />
            <span className="align-middle ms-25">{i18n.t('COMMON.FILTER_RESET')}</span>
          </Button>
        </CardHeader>
        <CardBody className="card-filter-body">
          <BookingFilter />
        </CardBody>
      </Card>
      <Table<Booking>
        selectableRows={false}
        columns={bookingColumns}
        fetchDataState={fetchUsersState}
        searchableColumns={['email', 'phoneNumber']}
        sortColumnDefault="createdAt"
        data={bookings || []}
        expandableRows
        expandableRowsComponent={BookingExpandableRowComponent}
      />
    </>
  );
}
