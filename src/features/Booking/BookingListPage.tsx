import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { bookingPresenter } from '@adapter/presenters';
import i18n from '@config/i18n';
import { Booking, BookingStatus } from '@domain/entities/booking/Booking';
import Statistics from '@components/Statistics/Statistics';
import { StatisticItemProps } from '@components/Statistics/StatisticItem';
import {
  Check, DollarSign, Loader, Plus, Star, X,
} from 'react-feather';
import { AvatarColor } from '@components/Avatar/Avatar';
import {
  ButtonProps,
  Col, Row,
} from 'reactstrap';
import BookingFilter, { BookingFilterParams } from '@features/Booking/components/BookingFilter';
import { useHistory } from 'react-router-dom';
import bookingColumns from '@features/Booking/components/BookingColumns';
import Table from '@components/Table/Table';
import { ExpanderComponentProps } from 'react-data-table-component';
import { formatVND } from '@utils/CommonUtils';
import moment from 'moment';
import { filterBookings, toSearchableContent } from '@utils/BookingUtils';
import { timeDiffAsI18nText } from '@utils/DateUtils';
import { HandleDataState } from '@redux/slices/others/HandleDataState';

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
              {tourTemplate.child8to11Price !== undefined && <li>{`${i18n.t('TOUR_TEMPLATE.CHILD_8_11_PRICE')}: ${formatVND(tourTemplate.child8to11Price)}`}</li>}
              {tourTemplate.child5to7Price !== undefined && <li>{`${i18n.t('TOUR_TEMPLATE.CHILD_5_7_PRICE')}: ${formatVND(tourTemplate.child5to7Price)}`}</li>}
              {tourTemplate.childUnder5Price !== undefined && <li>{`${i18n.t('TOUR_TEMPLATE.CHILD_5_7_PRICE')}: ${formatVND(tourTemplate.childUnder5Price)}`}</li>}
            </ul>
          ) : <span>N/A</span>}
        </Col>

        <Col xl="6">
          <strong>{i18n.t('BOOKING.BOOKING_RELATED_INFORMATION')}</strong>
          <ul>
            <li>{`${i18n.t('BOOKING.CREATED_AT')}: ${moment(data.createdAt).format('DD/MM/YYYY')}`}</li>
            {lead ? (
              <li>{`${i18n.t('BOOKING.LEAD_CREATED_AT')}: ${moment(lead.createdAt).format('DD/MM/YYYY')}`}</li>
            ) : <></>}
            <li>
              {`${i18n.t('BOOKING.MINUTES_FROM_CREATED_AT_TITLE')}: ${timeDiffAsI18nText(new Date(), new Date(data.createdAt))}`}
            </li>
          </ul>
        </Col>
      </Row>

      <strong>{i18n.t('BOOKING.PAYMENT_INFO')}</strong>
      <ul>
        {(data.totalPaid !== undefined && data.totalPayment !== undefined)
          ? <li>{`${i18n.t('BOOKING.PAID')}: ${formatVND(data.totalPaid)} / ${formatVND(data.totalPayment)}`}</li>
          : <></>}
      </ul>
    </div>
  );
};

export default function BookingListPage() {
  const [filterParams, setFilterParams] = useState<BookingFilterParams>();
  const {
    data: bookings,
    isFetching,
    isFetched,
    isError,
  } = useQuery(['bookings'], async () => bookingPresenter.getBookings());
  const fetchBookingsDataState: HandleDataState = useMemo(() => {
    if (isFetching) return 'loading';
    if (isFetched) return 'finished';
    if (isError) return 'error';
    return 'init';
  }, [isFetching, isFetched, isError]);

  const filteredBookings = useMemo(() => {
    if (!bookings) return [];
    if (!filterParams) return bookings;
    return filterBookings(bookings, filterParams);
  }, [bookings, filterParams]);

  const history = useHistory();
  const additionalActionButtons: Array<ButtonProps> = useMemo(() => [
    {
      name: i18n.t('COMMON.ADD'),
      handleOnClick: () => { history.push('/apps/bookings/create'); },
    },
  ], []);

  return (
    <>
      <Statistics items={prepareStatisticalItems(bookings || [])} />
      <BookingFilter onFilter={(params) => setFilterParams(params)} />
      <Table<Booking>
        selectableRows={false}
        columns={bookingColumns}
        fetchDataState={fetchBookingsDataState}
        searchableColumns={[]}
        sortColumnDefault="code"
        onPageChange={() => { }}
        onRefresh={() => { }}
        data={filteredBookings || []}
        expandableRows
        expandableRowsComponent={BookingExpandableRowComponent}
        customSearchHandler={(booking: Booking, searchTerm: string) => {
          const searchableContent = toSearchableContent(booking);
          return searchableContent.includes(searchTerm.toLowerCase());
        }}
        extraButtons={additionalActionButtons}
      />
    </>
  );
}
