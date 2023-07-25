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
import { cancelBookingSchema } from '@utils/BookingUtils';
import { CancelBookingFormData } from '@domain/entities/booking/CancelBookingFormData';
import FormItemInput from '@components/Form/FormItemInput';
import { Booking } from '@domain/entities/booking/Booking';

interface CancelBookingModalProps {
  cancelFormModal: boolean,
  toggleCancelFormModal: () => void,
}

const CancelBookingModal = (props: CancelBookingModalProps) => {
  const { bookingId } = useParams<EditBookingPageParams>();
  const { cancelFormModal, toggleCancelFormModal } = props;
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (
      formValue: CancelBookingFormData,
    ) => bookingPresenter.cancelBooking(bookingId, formValue.canceledReason!),
    onSuccess: (data: Partial<Booking>) => {
      toasty.show({
        title: i18n.t('COMMON.SUCCESS'),
        type: 'success',
        message: i18n.t('BOOKING.CANCEL_BOOKING_SUCCESSFULLY'),
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
  } = useForm<CancelBookingFormData>({
    resolver: yupResolver(cancelBookingSchema),
    defaultValues: {
      canceledReason: '',
    },
  });

  const handleReset = () => {
    toggleCancelFormModal();
    reset();
  };

  const onSubmit = (data: CancelBookingFormData) => {
    mutate(data);
    handleReset();
  };

  return (
    <Modal
      isOpen={cancelFormModal}
      toggle={() => toggleCancelFormModal()}
      className="modal-dialog-centered"
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={() => toggleCancelFormModal()}>
          {i18n.t('BOOKING.CANCEL_BOOKING')}
        </ModalHeader>
        <ModalBody>
          <Row>
            <div className="mb-1">
              <Label className="form-label" for="canceledReason">
                {i18n.t('BOOKING.CANCELED_REASON')}
                {' '}
                <span className="text-danger">{' *'}</span>
              </Label>
              <FormItemInput
                control={control}
                name="canceledReason"
                errors={errors}
                inputType="textarea"
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

export default CancelBookingModal;
