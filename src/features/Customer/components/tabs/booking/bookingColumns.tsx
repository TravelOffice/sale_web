import React from 'react';
import i18n from '@config/i18n';
import { TableColumn } from 'react-data-table-component';
import { Link } from 'react-router-dom';
import {
  Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';
import {
  ArrowDown, ArrowUpRight, Calendar, Circle, Edit, MoreVertical, Users,
} from 'react-feather';
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

const BookingColumns: TableColumn<Booking>[] = [
  {
    name: i18n.t('BOOKING.CODE_TT'),
    width: '150px',
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
    name: i18n.t('BOOKING.TOUR'),
    minWidth: '200px',
    sortField: 'tourRelatedInfo',
    cell: (booking: Booking) => {
      const { tourTemplate } = booking;
      return (
        <div>
          <div className="text-primary">
            <Badge className="text-uppercase" color="light-primary">
              {i18n.t('BOOKING.TOUR_TEMPLATE')}
            </Badge>
            {' '}
            {tourTemplate?.name}
          </div>
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
    sortField: 'bookingRelatedInfo',
    cell: (booking: Booking) => {
      const { lead } = booking;
      let passengersText = '';
      if (lead) {
        passengersText += `${lead?.numberOfAdultPassengers + lead?.numberOfChildrenPassengers} `;
        passengersText += `(${lead.numberOfAdultPassengers} ${i18n.t('LEAD.ADULT')} `;
        passengersText += `- ${lead.numberOfChildrenPassengers} ${i18n.t('LEAD.CHILDREN')})`;
      }
      return (
        <div>
          {lead ? (
            <Badge className="text-uppercase" color="light-primary">
              {lead.sourceName}
            </Badge>
          ) : <></>}
          {' '}
          {`${i18n.t('BOOKING.ASSIGNEE')}: ${booking.assigneeId ?? i18n.t('COMMON.NO_ASSIGNEE')}`}
          <br />
          {lead ? (
            <div className="d-flex align-items-center">
              <Users size={14} />
              {' '}
              {i18n.t('BOOKING.TOTAL_PASSENGERS')}
              {' '}
              {passengersText}
            </div>
          ) : <></>}
        </div>
      );
    },
  },
  {
    name: i18n.t('BOOKING.LAST_NOTE'),
    maxWidth: '200px',
    sortable: true,
    sortField: 'note',
    selector: (booking) => {
      const { notes } = booking;
      if (notes && notes.length) {
        return notes.pop()!.description;
      }
      return i18n.t('BOOKING.NO_NOTE').toString();
    },
  },
  {
    name: i18n.t('COMMON.ACTIONS'),
    maxWidth: '120px',
    cell: (booking: Booking) => (
      <div className="column-action">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu container="body">
            <DropdownItem tag={Link} className="w-100" to={generateEditableUrlForBooking(booking)}>
              <Edit size={14} className="me-50" />
              <span className="align-middle">{i18n.t('COMMON.EDIT')}</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Circle size={14} className="me-50" />
              <span className="align-middle">{i18n.t('BOOKING.CHANGE_STATUS')}</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <ArrowDown size={14} className="me-50" />
              <span className="align-middle">{i18n.t('COMMON.EXPORT')}</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];

export default BookingColumns;
