import React, { useEffect, useState } from 'react';
import {
  Card, CardBody, CardHeader, CardTitle, Col, Form, Row,
} from 'reactstrap';
import i18n from '@config/i18n';
import LoadingButton from '@components/LoadingButton/LoadingButton';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { bookingPresenter } from '@adapter/presenters';
import { useParams } from 'react-router-dom';
import { EditBookingTabParams } from '@features/Booking/components/tabs/information/BookingDetailTab';
import renderSkeleton from '@components/Skeleton/Skeleton';
import { useAccessControl } from '@hooks/auth';
import PERMISSIONS from '@utils/PermissionUtils';
import PassengerList from '@features/Booking/components/PassengerList';
import { Passenger } from '@domain/entities/booking/Passenger';
import { UpdateBookingFormData } from '@domain/entities/booking/UpdateBookingFormData';
import toasty from '@components/Toasty/Toasty';

export default function PassengerTab() {
  const { can } = useAccessControl();
  const queryClient = useQueryClient();
  const { bookingId } = useParams<EditBookingTabParams>();
  const [passengers, setPassengers] = useState<Array<Passenger>>([]);

  const {
    data: booking,
    isLoading,
  } = useQuery(['bookings', bookingId], async () => bookingPresenter.getBooking(bookingId));

  useEffect(() => {
    if (booking && booking.passengers) setPassengers(booking.passengers);
  }, [booking]);

  const updateBookingMutation = useMutation({
    mutationFn: async (
      formData: UpdateBookingFormData,
    ) => bookingPresenter.updateBooking(bookingId, formData),
    onSuccess: (updatedBooking) => {
      queryClient.setQueryData(['bookings', bookingId], updatedBooking);
      toasty.show({
        type: 'success',
        title: i18n.t('COMMON.SUCCESS'),
        message: i18n.t('BOOKING.PASSENGER.EDIT_PASSENGER_SUCCESSFULLY', { bookingCode: booking?.code }),
      });
    },
    onError: (error: Error) => {
      toasty.show({
        type: 'error',
        message: error.message,
        title: i18n.t('COMMON.ERROR'),
      });
    },
  });

  const handleAddPassengers = (newPassengers: Array<Passenger>) => {
    setPassengers(newPassengers);
  };

  return (
    <div className="to-table-container">
      <Form>
        <Row>
          <Col sm={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">{i18n.t('BOOKING.PASSENGER.EDIT_PASSENGER')}</CardTitle>
              </CardHeader>
              <CardBody>
                {
                  isLoading ? (
                    renderSkeleton()
                  ) : (
                    <>
                      <PassengerList
                        passengers={passengers}
                        handleAddPassengers={handleAddPassengers}
                      />
                      {
                        can(PERMISSIONS.update_booking) ? (
                          <Row>
                            <Col className="d-flex mt-2">
                              <LoadingButton
                                loading={updateBookingMutation.isLoading}
                                className="me-1"
                                color="primary"
                                type="submit"
                                disabled={updateBookingMutation.isLoading}
                                onClick={(e) => {
                                  e.preventDefault();
                                  updateBookingMutation.mutate({
                                    ...booking,
                                    passengers,
                                  } as UpdateBookingFormData);
                                }}
                              >
                                {i18n.t('COMMON.SUBMIT')}
                              </LoadingButton>
                            </Col>
                          </Row>
                        ) : <></>
                      }
                    </>
                  )
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
