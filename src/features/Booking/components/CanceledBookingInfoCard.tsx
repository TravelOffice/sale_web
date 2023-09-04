import React from 'react';
import { Badge, Card, CardBody } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import i18n from '@config/i18n';
import { BookingStatus } from '@domain/entities/booking/Booking';
import { bookingPresenter } from '@adapter/presenters';
import { useQuery } from '@tanstack/react-query';
import renderSkeleton from '@components/Skeleton/Skeleton';
import moment from 'moment';
import { generateI18nForBooking } from '@utils/BookingUtils';
import { ContentState, Editor, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

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
export default function CanceledBookingInfoCard() {
  const { bookingId } = useParams<EditBookingPageParams>();
  const {
    data: booking,
    isLoading,
  } = useQuery(['bookings', bookingId], async () => bookingPresenter.getBooking(bookingId));

  return (
    <div className="to-table-container">
      <Card>
        <CardBody>
          {
            isLoading ? (
              renderSkeleton()
            ) : (
              <>
                <h4 className="fw-bolder border-bottom pb-50 mb-1 text-danger">{i18n.t('BOOKING.CANCEL_BOOKING')}</h4>
                <div className="info-container">
                  <ul className="list-unstyled">
                    <li className="mb-75">
                      <span className="fw-bolder me-25">
                        {i18n.t('BOOKING.CANCELED_REASON')}
                        :
                      </span>
                      <Editor
                        onChange={() => {
                        }}
                        readOnly
                        editorState={
                          EditorState.createWithContent(
                            ContentState.createFromBlockArray(htmlToDraft(booking?.canceledReason ?? '').contentBlocks),
                          )
                        }
                      />
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">
                        {i18n.t('BOOKING.CANCELED_AT')}
                        :
                      </span>
                      <span>{moment(booking?.updatedAt).format('DD/MM/YYYY HH:mm')}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">
                        {i18n.t('BOOKING.CANCELED_AT_PHASE')}
                        :
                      </span>
                      <Badge
                        color={bookingStatusColors[booking?.canceledAtPhase!]}
                        className="text-capitalize"
                      >
                        {generateI18nForBooking(booking?.canceledAtPhase!)}
                      </Badge>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">
                        {i18n.t('BOOKING.CANCELED_BY')}
                        :
                      </span>
                      <span className="text-capitalize">
                        <Link
                          to={`/apps/user/view/${booking?.canceledBy}`}
                          className="user_name text-truncate text-body"
                        >
                          <span className="fw-bolder text-primary">
                            {booking?.canceledBy}
                          </span>
                        </Link>
                      </span>
                    </li>
                  </ul>
                </div>
              </>
            )
          }
        </CardBody>
      </Card>
    </div>
  );
}
