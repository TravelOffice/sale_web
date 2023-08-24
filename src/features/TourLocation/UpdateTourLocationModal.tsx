import React, { useCallback, useEffect } from 'react';
import {
  Button, Form, Label, Modal, ModalBody, ModalFooter, ModalHeader, ModalProps,
} from 'reactstrap';
import { TourLocation, TourLocationType, UpdateTourLocationFormData } from '@domain/entities/tour';
import i18n from '@config/i18n';
import FormItemInput from '@components/Form/FormItemInput';
import LoadingButton from '@components/LoadingButton/LoadingButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tourLocationPresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';
import * as yup from 'yup';
import FormItemSelect from '@components/Form/FormItemSelect';

export interface UpdateTourLocationModalProps extends ModalProps {
  tourLocation?: TourLocation,
  toggle: () => void,
}

const schema = yup.object().shape({
  name: yup.string().required(),
  status: yup.string().oneOf(['ENABLE', 'DISABLE']).required(),
});

const statusOptions: Array<{ label: string, value: TourLocationType }> = [
  { value: 'ENABLE', label: i18n.t('TOUR_LOCATION.ENABLE') },
  { value: 'DISABLE', label: i18n.t('TOUR_LOCATION.DISABLE') },
];

export default function UpdateTourLocationModal(props: UpdateTourLocationModalProps) {
  const { tourLocation, toggle, ...rest } = props;
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateTourLocationFormData>({ resolver: yupResolver(schema) });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (tourLocation) {
      reset(tourLocation);
    }
  }, [tourLocation]);

  const { mutate, isLoading } = useMutation({
    mutationFn: (
      formData: UpdateTourLocationFormData,
    ) => tourLocationPresenter.update(tourLocation?.code!, formData),
    onSuccess: (newTourLocation) => {
      toggle();
      toasty.show({
        type: 'success',
        title: i18n.t('COMMON.SUCCESS'),
        message: i18n.t('TOUR_LOCATION.UPDATE_TOUR_LOCATION_SUCCESSFULLY', { name: newTourLocation.name }),
      });
      queryClient.setQueryData(['tourLocations'], (current: TourLocation[] | undefined) => {
        const oldLocation = current?.find((s) => s.code === tourLocation?.code);
        if (!oldLocation) return current;
        return current?.map((s) => {
          if (s.code === oldLocation.code) {
            return {
              ...s,
              ...newTourLocation,
            };
          }
          return s;
        });
      });
    },
    onError: (error: Error) => {
      toasty.show({
        type: 'error',
        title: i18n.t('COMMON.ERROR'),
        message: error.message,
      });
    },
  });

  const onSubmit = useCallback((formData: UpdateTourLocationFormData) => {
    mutate(formData);
  }, []);
  return (
    <Modal {...rest} toggle={toggle}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={toggle}>{i18n.t('TOUR_LOCATION.UPDATE')}</ModalHeader>
        <ModalBody>
          <div className="mb-1">
            <Label>{i18n.t('TOUR_LOCATION.NAME')}</Label>
            <FormItemInput
              control={control}
              name="name"
              errors={errors}
            />
          </div>
          <div className="mb-1">
            <Label>{i18n.t('TOUR_LOCATION.STATUS')}</Label>
            <FormItemSelect
              options={statusOptions}
              control={control}
              name="status"
              errors={errors}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline disabled={isLoading} onClick={toggle}>
            {i18n.t('COMMON.CANCEL')}
          </Button>
          <LoadingButton loading={isLoading} color="primary" type="submit" disabled={isLoading}>
            {i18n.t('COMMON.SAVE_CHANGES')}
          </LoadingButton>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
