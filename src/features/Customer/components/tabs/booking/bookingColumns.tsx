import React from 'react';
import i18n from '@config/i18n';
import { TableColumn } from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';
import {
  ArrowUpRight, Calendar, Phone, User, Users,
} from 'react-feather';
import { generateI18nForLead } from '@utils/LeadUtils';
import { Booking, BookingStatus } from '@domain/entities/booking/Booking';
import { generateEditableUrlForBooking, generateI18nForBooking } from '@utils/BookingUtils';
import moment from 'moment';

const bookingStatusColors: Record<BookingStatus, string> = {
  INITIALIZED: 'light-info',
  IN_PROCESS: 'light-warning',
  CONFIRMED: 'light-info',
  PAYMENT_PENDING: 'light-info',
  CANCELED: 'light-danger',
  COMPLETED: 'light-success',
};

const bookingColumns: TableColumn<Booking>[] = [
  {
    name: i18n.t('BOOKING.CODE_TT'),
    width: '220px',
    cell: (booking: Booking) => {
      const { bookingStatus } = booking;
      return (
        <div>
          <Link to={generateEditableUrlForBooking(booking)} className="text-truncate text-body text-center">
            <span className="fw-bolder">{booking.code}</span>
            <ArrowUpRight size={16} />
          </Link>
          {' '}
          <Badge className="text-capitalize" color={bookingStatusColors[bookingStatus]}>
            {generateI18nForBooking(bookingStatus)}
          </Badge>
        </div>
      );
    },
  },
  {
    name: i18n.t('BOOKING.CUSTOMER'),
    minWidth: '80px',
    cell: (booking: Booking) => {
      const { customer } = booking;
      return (
        <div className="d-flex justify-content-left align-items-center">
          <div className="d-flex flex-column">
            <span className="fw-bolder text-primary pb-0">
              <User size={14} className="text-secondary" />
              <small className="text-truncate text-muted">
                {' '}
                {customer?.honorific ? `(${generateI18nForLead(customer.honorific)})` : ''}
              </small>
              {' '}
              {customer?.name}
            </span>
            <span>
              <Phone size={14} className="text-secondary" />
              {' '}
              {customer?.primaryPhoneNumber}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    name: i18n.t('BOOKING.TOUR'),
    minWidth: '150px',
    cell: (booking: Booking) => {
      const { tourTemplate } = booking;
      return (
        <div>
          <Badge className="text-uppercase" color="light-secondary">
            {i18n.t('BOOKING.TOUR_TEMPLATE')}
          </Badge>
          {' '}
          {tourTemplate?.name}
          <br />
          <div className="d-flex align-items-center">
            <Calendar size={14} />
            {' '}
            {moment(booking.departureDate).format('DD/MM/YYYY')}
            {' - '}
            {booking.tourTemplate?.durationInDays
              ? moment(booking.departureDate).add(booking.tourTemplate?.durationInDays, 'days').format('DD/MM/YYYY') : <></>}
          </div>
        </div>
      );
    },
  },
  {
    name: i18n.t('BOOKING.RELATED_INFO'),
    minWidth: '150px',
    cell: (booking: Booking) => {
      const { lead } = booking;
      return (
        <div>
          <Badge className="text-uppercase" color="light-secondary">
            {lead ? lead.sourceName : 'N/A'}
          </Badge>
          <br />
          {lead ? (
            <div className="d-flex align-items-center">
              <Users size={14} />
              {' '}
              {lead.numberOfAdultPassengers}
              {' '}
              {i18n.t('LEAD.ADULT')}
              {' '}
              -
              {' '}
              {lead.numberOfChildrenPassengers}
              {' '}
              {i18n.t('LEAD.CHILDREN')}
            </div>
          ) : <></>}
        </div>
      );
    },
  },
];

export default bookingColumns;
