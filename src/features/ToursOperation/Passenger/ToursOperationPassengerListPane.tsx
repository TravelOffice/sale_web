import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { tourPresenter } from '@adapter/presenters';
import { ToursOperationDetailParams } from '@features/ToursOperation/ToursOperationDetail';
import { HandleDataState } from '@redux/slices/others/HandleDataState';
import { Booking } from '@domain/entities/booking/Booking';
import { Passenger } from '@domain/entities/booking/Passenger';
import Table from '@components/Table/Table';
import passengerPaneColumns from './PassengerPaneColumns';

export default function ToursOperationPassengerListPane() {
  const { tourId } = useParams<ToursOperationDetailParams>();
  const {
    data: bookings,
    isFetching,
    isFetched,
    isError,
  } = useQuery(['bookingsWithCustomer'], async () => tourPresenter.getBookingsByDepartureTour(tourId));

  const fetchBookingsDataState: HandleDataState = useMemo(() => {
    if (isFetching) return 'loading';
    if (isFetched) return 'finished';
    if (isError) return 'error';
    return 'init';
  }, [isFetching, isFetched, isError]);

  const passengers: Passenger[] = useMemo(() => {
    if (!bookings) return [];
    return bookings.filter((booking) => booking.passengers)
      .flatMap((booking: Booking) => (booking.passengers.map(
        (passenger) => ({ ...passenger, bookingCode: booking.code }),
      )));
  }, [bookings]);

  return (
    <>
      <Table<Passenger>
        selectableRows={false}
        columns={passengerPaneColumns}
        fetchDataState={fetchBookingsDataState}
        searchableColumns={['name', 'birthday', 'phoneNumber', 'email', 'address', 'bookingCode']}
        sortColumnDefault="phoneNumber"
        data={passengers}
      />
    </>
  );
}
