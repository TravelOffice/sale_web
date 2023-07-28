import {
  Button, Form, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner,
} from 'reactstrap';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import i18n from '@config/i18n';
import toasty from '@components/Toasty/Toasty';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useParams } from 'react-router-dom';
import { EditBookingPageParams } from '@features/Booking/components/BookingInfoCard';
import { bookingPresenter } from '@adapter/presenters';
import { paymentPendingSchema } from '@utils/BookingUtils';
import { PaymentPendingFormData } from '@domain/entities/booking/PaymentPendingFormData';
import FormItemDatePicker from '@components/Form/FormItemDatePicker';
import moment from 'moment';
import { UpdateBookingFormData } from '@domain/entities/booking/UpdateBookingFormData';
import { Booking, BookingStatusEnum } from '@domain/entities/booking/Booking';

interface PaymentPendingModalProps {
  paymentPendingFormModal: boolean,
  togglePaymentPendingFormModal: () => void,
}

const PaymentPendingModal = (props: PaymentPendingModalProps) => {
  const { bookingId } = useParams<EditBookingPageParams>();
  const { paymentPendingFormModal, togglePaymentPendingFormModal } = props;
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (
      formValue: PaymentPendingFormData,
    ) => bookingPresenter.updateBooking(bookingId, formValue as UpdateBookingFormData),
    // TODO: Call payment Pending API
    onSuccess: () => {
      toasty.show({
        title: i18n.t('COMMON.SUCCESS'),
        type: 'success',
        message: i18n.t('BOOKING.PAYMENT_PENDING_SUCCESSFULLY'),
      });
      queryClient.setQueryData(['bookings', bookingId], (input) => ({
        ...input as Booking,
        bookingStatus: BookingStatusEnum.PAYMENT_PENDING,
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
  } = useForm<PaymentPendingFormData>({
    resolver: yupResolver(paymentPendingSchema),
    defaultValues: {
      waitingExpiredAt: undefined,
    },
  });

  const handleReset = () => {
    togglePaymentPendingFormModal();
    reset();
  };

  const onSubmit = (data: PaymentPendingFormData) => {
    mutate(data);
    handleReset();
  };

  return (
    <Modal
      isOpen={paymentPendingFormModal}
      toggle={() => togglePaymentPendingFormModal()}
      className="modal-dialog-centered"
    >
      <Form onSubmit={handleSubmit(onSubmit)}>

        <ModalHeader toggle={() => togglePaymentPendingFormModal()}>
          {i18n.t('BOOKING.PAYMENT_PENDING')}
        </ModalHeader>
        <ModalBody>
          <Row>
            <div className="mb-1">
              <Label className="form-label" for="departureDate">
                {i18n.t('BOOKING.FORM.PAYMENT_EXPIRED_AT')}
                {' '}
                <span className="text-danger">{' *'}</span>
              </Label>
              <FormItemDatePicker
                name="waitingExpiredAt"
                control={control}
                errors={errors}
                placeholder={i18n.t('BOOKING.PAYMENT_EXPIRED_AT')}
                options={{
                  formatDate: (date) => moment(date).format('DD/MM/YYYY HH:mm').valueOf(),
                  minDate: 'today',
                  enableTime: true,
                  time_24hr: true,
                  minTime: moment().add(1, 'hours').valueOf(),
                }}
              />
            </div>
          </Row>
        </ModalBody>
        <ModalFooter>
          <div className="d-flex justify-content-end">
            <Button type="reset" color="danger" className="me-1" outline onClick={handleReset}>
              {i18n.t('COMMON.CANCEL')}
            </Button>
            <Button type="submit" className="me-1" color="primary">
              {!isLoading ? i18n.t('COMMON.SUBMIT') : i18n.t('COMMON.LOADING')}
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

export default PaymentPendingModal;
