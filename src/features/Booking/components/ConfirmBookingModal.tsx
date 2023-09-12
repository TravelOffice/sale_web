import {
  Button, Col, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner,
} from 'reactstrap';
import React, { useMemo } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import i18n from '@config/i18n';
import toasty from '@components/Toasty/Toasty';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useParams } from 'react-router-dom';
import { EditBookingPageParams } from '@features/Booking/components/BookingInfoCard';
import { ConfirmBookingFormData } from '@domain/entities/booking/ConfirmBookingFormData';
import { bookingPresenter, tourPresenter } from '@adapter/presenters';
import FormItemSelect from '@components/Form/FormItemSelect';
import { confirmBookingSchema } from '@utils/BookingUtils';
import moment from 'moment';
import { Booking } from '@domain/entities/booking/Booking';
import FormItemInput from '@components/Form/FormItemInput';

interface ConfirmBookingModalProps {
  booking: Booking,
  confirmFormModal: boolean,
  toggleConfirmFormModal: () => void,
}

const ConfirmBookingModal = (props: ConfirmBookingModalProps) => {
  const { bookingId } = useParams<EditBookingPageParams>();
  const { confirmFormModal, toggleConfirmFormModal, booking } = props;
  const queryClient = useQueryClient();

  const {
    data: departureToursData,
  } = useQuery(['departure-tours'], async () => tourPresenter.getAllDepartureTours());

  const departureTourOptions = useMemo(() => departureToursData?.map((departureTour) => ({
    label: `${departureTour.name} (${departureTour.code})`,
    value: departureTour.code,
  })), [departureToursData]);

  const { mutate, isLoading } = useMutation({
    mutationFn: (
      formValue: ConfirmBookingFormData,
    ) => bookingPresenter.confirmBooking(bookingId, formValue),
    onSuccess: (data: Partial<Booking>) => {
      toasty.show({
        title: i18n.t('COMMON.SUCCESS'),
        type: 'success',
        message: i18n.t('BOOKING.CONFIRM_BOOKING_SUCCESSFULLY'),
      });
      queryClient.setQueryData(['bookings', bookingId], (input) => ({
        ...input as Booking,
        ...data,
      }));
    },
    onError: (error) => {
      toasty.show({
        title: i18n.t('COMMON.ERROR'),
        type: 'error',
        message: `${error}`,
      });
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ConfirmBookingFormData>({
    resolver: yupResolver(confirmBookingSchema),
  });

  const handleReset = () => {
    toggleConfirmFormModal();
    reset();
  };

  const onSubmit = (data: ConfirmBookingFormData) => {
    mutate(data);
    handleReset();
  };

  const selectedDepartureTourId = useWatch({
    control,
    name: 'departureTourId',
  });

  const selectedDepartureTour = departureToursData?.find(
    (item) => item.code === selectedDepartureTourId,
  );

  return (
    <Modal isOpen={confirmFormModal} toggle={() => toggleConfirmFormModal()} className="modal-dialog-centered">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={() => toggleConfirmFormModal()}>
          {i18n.t('BOOKING.CONFIRM_BOOKING')}
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col lg={6}>
              <div className="mb-1">
                <Label className="form-label" for="departureTourId">
                  {i18n.t('DEPARTURE_TOUR.DEPARTURE_TOUR')}
                  {' '}
                  <span className="text-danger">{' *'}</span>
                </Label>
                <FormItemSelect
                  control={control}
                  name="departureTourId"
                  errors={errors}
                  selectClassName="flex-fill"
                  options={departureTourOptions || []}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-1">
                <Label className="form-label">
                  {i18n.t('DEPARTURE_TOUR.DEPARTURE_DATE')}
                </Label>
                <Input
                  value={selectedDepartureTourId ? moment(selectedDepartureTour?.startDate).format('DD/MM/YYYY') : ''}
                  disabled
                />
              </div>
            </Col>
          </Row>
          <Row>
            {
              booking.departureDate
              && selectedDepartureTourId
              && selectedDepartureTour?.startDate !== booking.departureDate && (
                <Label className="text-danger">{i18n.t('BOOKING.MISMATCH_DEPARTURE_DATE')}</Label>
              )
            }
          </Row>
          <Row>
            <Col lg={6}>
              <div className="mb-1">
                <Label className="form-label" for="totalPaid">
                  {`${i18n.t('BOOKING.TOTAL_PAID')} (VND)`}
                  {' '}
                  <span className="text-danger">{' *'}</span>
                </Label>
                <FormItemInput
                  name="totalPaid"
                  control={control}
                  errors={errors}
                  inputType="number"
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-1">
                <Label className="form-label">
                  {`${i18n.t('BOOKING.TOTAL_PAYMENT')} (VND)`}
                </Label>
                <Controller
                  name="totalPayment"
                  control={control}
                  render={({ field }) => <Input {...field} type="number" disabled />}
                />
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <div className="d-flex justify-content-end">
            <Button type="reset" color="danger" className="me-1" outline onClick={handleReset}>
              {i18n.t('COMMON.CANCEL')}
            </Button>
            <Button type="submit" className="me-1" color="primary">
              {!isLoading ? i18n.t('BOOKING.CONFIRM_BOOKING') : i18n.t('COMMON.LOADING')}
              {isLoading ? (
                <Spinner
                  style={{ width: '0.7rem', height: '0.7rem' }}
                  type="grow"
                  color="light"
                />
              ) : null}
            </Button>
          </div>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default ConfirmBookingModal;
