import React from 'react';
import {
  Badge, Card, CardBody, CardHeader, CardTitle,
} from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import i18n from '@config/i18n';
import { Calendar, Phone } from 'react-feather';
import moment from 'moment/moment';
import { BookingStatus } from '@domain/entities/booking/Booking';
import { generateI18nForBooking, isCanceledBooking, isEditableBooking } from '@utils/BookingUtils';
import { formatPhoneNumber } from '@utils/Utils';
import { bookingPresenter } from '@adapter/presenters';
import { useQuery } from '@tanstack/react-query';
import renderSkeleton from '@components/Skeleton/Skeleton';
import CanceledBookingInfoCard from '@features/Booking/components/CanceledBookingInfoCard';
import BookingItemActions from '@features/Booking/components/BookingItemActions';

export interface EditBookingPageParams {
  bookingId: string,
}

const bookingStatusColors: Record<BookingStatus, string> = {
  INITIALIZED: 'light-info',
  IN_PROCESS: 'light-warning',
  CONFIRMED: 'light-info',
  PAYMENT_PENDING: 'light-info',
  COMPLETED: 'light-success',
  CANCELED: 'light-danger',
};

// const color: string = customerLevelColors[row.level! || CustomerLevel.STANDARD];
export default function BookingInfoCard() {
  const { bookingId } = useParams<EditBookingPageParams>();
  const {
    data: booking,
    isLoading,
  } = useQuery(['bookings', bookingId], async () => bookingPresenter.getBooking(bookingId));

  return (
    <div className="to-table-container">
      {
        isLoading ? (
          renderSkeleton()
        ) : (
          <Card>
            <CardHeader className="pb-1">
              <CardTitle tag="h1">{booking?.tourTemplate?.name}</CardTitle>
              {
                isEditableBooking(booking?.bookingStatus!) ? (
                  <BookingItemActions booking={booking!} />
                ) : <></>
              }
            </CardHeader>
            <CardBody>
              <div className="d-flex justify-content-start my-2 pt-75">
                <div className="d-flex align-items-start me-2">
                  <Badge color="light-primary" className="rounded p-75">
                    <Phone className="font-medium-2" />
                  </Badge>
                  <div className="ms-75">
                    <h4 className="mb-0">{}</h4>
                    <h4 className="mb-0">{formatPhoneNumber(booking?.customer?.primaryPhoneNumber!)}</h4>
                    <small>{i18n.t('CUSTOMER.PHONE')}</small>
                  </div>
                </div>
                <div className="d-flex align-items-start">
                  <Badge color="light-primary" className="rounded p-75">
                    <Calendar className="font-medium-2" />
                  </Badge>
                  <div className="ms-75">
                    <h4 className="mb-0">{}</h4>
                    <small>
                      <h4 className="mb-0">
                        {moment(booking?.departureDate).format('DD/MM/YYYY')}
                      </h4>
                      {i18n.t('BOOKING.DEPARTURE_DATE')}
                    </small>
                  </div>
                </div>
              </div>
              <h4 className="fw-bolder border-bottom pb-50 mb-1">{i18n.t('COMMON.DETAILS')}</h4>
              <div className="info-container">
                <ul className="list-unstyled">
                  <li className="mb-75">
                    <span className="fw-bolder me-25">
                      {i18n.t('BOOKING.CODE')}
                      :
                    </span>
                    <span>{booking?.code}</span>
                  </li>
                  <li className="mb-75">
                    <span className="fw-bolder me-25">
                      {i18n.t('BOOKING.STATUS')}
                      :
                    </span>

                    <Badge color={bookingStatusColors[booking?.bookingStatus!]} className="text-capitalize">
                      {generateI18nForBooking(booking?.bookingStatus!)}
                    </Badge>
                  </li>
                  {
                    booking?.departureTourId ? (
                      <li className="mb-75">
                        <span className="fw-bolder me-25">
                          {i18n.t('DEPARTURE_TOUR.DEPARTURE_TOUR')}
                          :
                        </span>
                        <Link
                          to={`/apps/tour/departure/${booking?.departureTourId}`}
                          className="user_name text-truncate text-body"
                        >
                          <span className="fw-bolder text-primary">
                            {booking?.departureTourName}
                          </span>
                        </Link>
                      </li>
                    ) : (
                      <li className="mb-75">
                        <span className="fw-bolder me-25">
                          {i18n.t('BOOKING.TOUR_TEMPLATE')}
                          :
                        </span>
                        <span>{booking?.tourTemplate?.name}</span>
                      </li>
                    )
                  }
                  <li className="mb-75">
                    <span className="fw-bolder me-25">
                      {i18n.t('BOOKING.DEPARTURE_DATE')}
                      :
                    </span>
                    <span>{moment(booking?.departureDate).format('DD/MM/YYYY')}</span>
                  </li>
                  <li className="mb-75">
                    <span className="fw-bolder me-25">
                      {i18n.t('BOOKING.FORM.TOUR_TYPE')}
                      :
                    </span>
                    <span>{generateI18nForBooking(booking?.tourType!)}</span>
                  </li>
                  <li className="mb-75">
                    <span className="fw-bolder me-25">
                      {i18n.t('CUSTOMER.ASSIGNEE')}
                      :
                      {' '}
                    </span>
                    <span className="text-capitalize">
                      <Link
                        to={`/apps/users/${booking?.assigneeId}`}
                        className="user_name text-truncate text-body"
                      >
                        <span className="fw-bolder text-primary">
                          {`${booking?.assigneeName} - ${booking?.assigneeId}`}
                        </span>
                      </Link>
                    </span>
                  </li>
                  <li className="mb-75">
                    <span className="fw-bolder me-25">
                      {i18n.t('CUSTOMER.CREATOR')}
                      :
                      {' '}
                    </span>
                    <span className="text-capitalize">
                      <Link
                        to={`/apps/users/${booking?.creatorId}`}
                        className="user_name text-truncate text-body"
                      >
                        <span className="fw-bolder text-primary">
                          {`${booking?.creatorName} - ${booking?.creatorId}`}
                        </span>
                      </Link>
                    </span>
                  </li>
                  <li className="mb-75">
                    <span className="fw-bolder me-25">
                      {i18n.t('COMMON.CREATED_AT')}
                      :
                      {' '}
                    </span>
                    <span
                      className="text-capitalize"
                    >
                      {moment(booking?.createdAt).format('hh:mm:ss DD/MM/YYYY')}
                    </span>
                  </li>
                  <li className="mb-75">
                    <span className="fw-bolder me-25">
                      {i18n.t('BOOKING.FORM.SOURCE')}
                      :
                    </span>
                    <span>{booking?.sourceName}</span>
                  </li>
                </ul>
              </div>

            </CardBody>
          </Card>
        )
      }
      {
        isCanceledBooking(booking?.bookingStatus!) ? (
          <CanceledBookingInfoCard />
        ) : <></>
      }
    </div>
  );
}
