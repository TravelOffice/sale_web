import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { tourPresenter } from '@adapter/presenters';
import { Booking } from '@domain/entities/booking/Booking';
import BookingFilter, { BookingFilterParams } from '@features/Booking/components/BookingFilter';
import bookingColumns from '@features/Booking/components/BookingColumns';
import Table from '@components/Table/Table';
import { filterBookings, toSearchableContent } from '@utils/BookingUtils';
import { HandleDataState } from '@redux/slices/others/HandleDataState';
import { BookingExpandableRowComponent } from '@features/Booking/BookingListPage';
import { useParams } from 'react-router-dom';
import { ToursOperationDetailParams } from '@features/ToursOperation/ToursOperationDetail';

export default function ToursOperationBookingPane() {
  const { tourId } = useParams<ToursOperationDetailParams>();
  const [filterParams, setFilterParams] = useState<BookingFilterParams>();
  const {
    data: bookings,
    isFetching,
    isFetched,
    isError,
  } = useQuery(['bookingsByDepartureTour'], async () => tourPresenter.getBookingsByDepartureTour(tourId));

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

  return (
    <>
      <BookingFilter onFilter={(params) => setFilterParams(params)} />
      <Table<Booking>
        selectableRows={false}
        columns={bookingColumns}
        fetchDataState={fetchBookingsDataState}
        searchableColumns={[]}
        sortColumnDefault="code"
        onPageChange={() => {
        }}
        onRefresh={() => {
        }}
        data={filteredBookings || []}
        expandableRows
        expandableRowsComponent={BookingExpandableRowComponent}
        customSearchHandler={(booking: Booking, searchTerm: string) => {
          const searchableContent = toSearchableContent(booking);
          return searchableContent.includes(searchTerm.toLowerCase());
        }}
      />
    </>
  );
}
