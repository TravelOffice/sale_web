import i18n from '@config/i18n';
import { TableColumn } from 'react-data-table-component';
import { Passenger } from '@domain/entities/booking/Passenger';
import { File } from 'react-feather';
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const passengerPaneColumns: TableColumn<Passenger>[] = [
  {
    name: i18n.t('BOOKING.PASSENGER.NAME'),
    minWidth: '200px',
    cell: (passenger: Passenger) => passenger.name,
  },
  {
    name: i18n.t('BOOKING.PASSENGER.BIRTHDAY'),
    minWidth: '150px',
    cell: (passenger: Passenger) => (passenger.birthday ? moment(passenger.birthday).format('DD/MM/YYYY') : ''),
  },
  {
    name: i18n.t('BOOKING.PASSENGER.PHONE_NUMBER'),
    minWidth: '150px',
    cell: (passenger: Passenger) => passenger?.phoneNumber,
  },
  {
    name: i18n.t('BOOKING.PASSENGER.EMAIL'),
    minWidth: '150px',
    cell: (passenger: Passenger) => passenger?.email,
  },
  {
    name: i18n.t('BOOKING.PASSENGER.ADDRESS'),
    minWidth: '150px',
    cell: (passenger: Passenger) => passenger?.address,
  },
  {
    name: i18n.t('BOOKING.PASSENGER.ATTACHED_DOCUMENT'),
    minWidth: '200px',
    cell: (passenger: Passenger) => {
      if (passenger.attachedDoc) {
        return (
          passenger?.attachedDoc.map((item: string) => (
            <a key={item} href={item} target="_blank" rel="noreferrer">
              <File size={30} />
            </a>
          ))
        );
      }
      return (
        <>
          {i18n.t('BOOKING.PASSENGER.NO_ATTACHED_DOCUMENT')}
        </>
      );
    },
  },
  {
    name: i18n.t('BOOKING.PASSENGER.BOOKING_CODE'),
    minWidth: '200px',
    cell: (passenger: Passenger) => <Link to={`/apps/bookings/${passenger.bookingCode}/edit`}>{passenger.bookingCode}</Link>,
  },
];

export default passengerPaneColumns;
