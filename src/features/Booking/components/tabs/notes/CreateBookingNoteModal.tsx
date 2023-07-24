import React, { useCallback } from 'react';
import {
  Button, Form,
  Label, Modal, ModalBody, ModalFooter, ModalHeader, ModalProps,
} from 'reactstrap';
import {
  CreateNoteFormData, Note, NoteType, noteTypes,
} from '@domain/entities/note/Note';
import i18n from '@config/i18n';
import FormItemInput from '@components/Form/FormItemInput';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingPresenter } from '@adapter/presenters';
import LoadingButton from '@components/LoadingButton/LoadingButton';
import toasty from '@components/Toasty/Toasty';
import FormItemSelect from '@components/Form/FormItemSelect';
import { Booking } from '@domain/entities/booking/Booking';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export interface CreateBookingNoteModalProps extends ModalProps {
  toggle: () => void,
  bookingId: string,
}

const options: { label: string, value: NoteType }[] = [
  { label: i18n.t('BOOKING.NOTE_TYPE_CALL'), value: 'CALL' },
  { label: i18n.t('BOOKING.NOTE_TYPE_EMAIL'), value: 'EMAIL' },
  { label: i18n.t('BOOKING.NOTE_TYPE_SMS'), value: 'SMS' },
  { label: i18n.t('BOOKING.NOTE_TYPE_ZALO'), value: 'ZALO' },
  { label: i18n.t('BOOKING.NOTE_TYPE_OTHERS'), value: 'OTHERS' },
];

const schema = yup.object().shape({
  title: yup.string().required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('BOOKING.NOTE_TITLE') })),
  type: yup.string().oneOf([...noteTypes]).required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('BOOKING.NOTE_TYPE') })),
  description: yup.string().required(i18n.t('MESSAGE.REQUIRED_FIELD_MESSAGE', { field: i18n.t('BOOKING.NOTE_DESCRIPTION') })),
});

export default function CreateBookingNoteModal(props: CreateBookingNoteModalProps) {
  const { toggle, bookingId, ...rest } = props;
  const {
    control, handleSubmit, reset, formState: { errors },
  } = useForm<CreateNoteFormData>({ resolver: yupResolver(schema) });
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: (
      formData: CreateNoteFormData,
    ) => bookingPresenter.addNoteToBooking(bookingId, formData),
    onSuccess: (newNote: Note) => {
      toasty.show({
        type: 'success',
        title: i18n.t('COMMON.SUCCESS'),
        message: i18n.t('BOOKING.CREATE_NOTE_SUCCESSFULLY'),
      });
      queryClient.setQueryData(['bookings', bookingId], (currentBooking: Booking | undefined) => {
        if (!currentBooking) return undefined;
        const notes = currentBooking.notes || [];
        const newBooking: Booking = {
          ...currentBooking,
          notes: [...notes, newNote],
        };
        return newBooking;
      });
      reset();
      toggle();
    },
    onError: () => {
      toasty.show({
        type: 'error',
        title: i18n.t('COMMON.ERROR'),
        message: i18n.t('BOOKING.CREATE_NOTE_FAILED'),
      });
    },
  });

  const onSubmit = useCallback((formData: CreateNoteFormData) => {
    mutate(formData);
  }, [mutate]);

  return (
    <Modal toggle={toggle} {...rest} onClosed={() => reset()}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={toggle}>
          {i18n.t('BOOKING.CREATE_NOTE')}
        </ModalHeader>
        <ModalBody>
          <div className="mb-1">
            <Label className="form-label" for="title">
              {i18n.t('BOOKING.NOTE_TITLE')}
              {' '}
              <span className="text-danger">*</span>
            </Label>
            <FormItemInput control={control} name="title" errors={errors} />
          </div>
          <div className="mb-1">
            <Label className="form-label" for="content">
              {i18n.t('BOOKING.NOTE_TYPE')}
              {' '}
              <span className="text-danger">*</span>
            </Label>
            <FormItemSelect
              options={options}
              control={control}
              name="type"
              errors={errors}
              placeholder={i18n.t('BOOKING.NOTE_TYPE')}
            />
          </div>
          <div className="mb-1">
            <Label className="form-label" for="description">
              {i18n.t('BOOKING.NOTE_DESCRIPTION')}
              {' '}
              <span className="text-danger">*</span>
            </Label>
            <FormItemInput control={control} name="description" errors={errors} inputType="textarea" />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={toggle} disabled={isLoading}>
            {i18n.t('COMMON.CANCEL')}
          </Button>
          <LoadingButton
            loading={isLoading}
            disabled={isLoading}
            color="primary"
            type="submit"
          >
            {i18n.t('COMMON.CREATE')}
          </LoadingButton>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
