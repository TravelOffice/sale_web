import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toasty from '@components/Toasty/Toasty';
import i18n from '@config/i18n';
import {
  Button, Form, Label, Modal, ModalBody, ModalFooter, ModalHeader, ModalProps,
} from 'reactstrap';
import FormItemInput from '@components/Form/FormItemInput';
import LoadingButton from '@components/LoadingButton/LoadingButton';
import { CreateTourLocationFormData, TourLocation, TourLocationType } from '@domain/entities/tour';
import * as yup from 'yup';
import { tourLocationPresenter } from '@adapter/presenters';
import FormItemSelect from '@components/Form/FormItemSelect';

export interface AddTourLocationModalProps extends ModalProps {
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

export default function AddTourLocationModal(props: AddTourLocationModalProps) {
  const { toggle, ...modalProps } = props;
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTourLocationFormData>({ resolver: yupResolver(schema) });
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (formData: CreateTourLocationFormData) => tourLocationPresenter.create(formData),
    onSuccess: (newTourLocation) => {
      toggle();
      toasty.show({
        type: 'success',
        title: i18n.t('COMMON.SUCCESS'),
        message: i18n.t('TOUR_LOCATION.ADD_TOUR_LOCATION_SUCCESSFULLY', { name: newTourLocation.name }),
      });
      reset({ name: '' });
      queryClient.setQueryData(['tourLocations'], (currentTourLocations: TourLocation[] | undefined) => {
        if (!currentTourLocations) return [];
        return currentTourLocations.concat(newTourLocation);
      });
    },
  });

  const onSubmit = useCallback((data: CreateTourLocationFormData) => {
    mutate(data);
  }, []);

  return (
    <Modal {...modalProps} toggle={toggle}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={toggle}>{i18n.t('TOUR_LOCATION.ADD')}</ModalHeader>
        <ModalBody>
          <div className="mb-1">
            <Label>
              {i18n.t('TOUR_LOCATION.NAME')}
              {' '}
              <span className="text-danger">*</span>
            </Label>
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
          <Button
            color="primary"
            outline
            disabled={isLoading}
            onClick={toggle}
          >
            {i18n.t('COMMON.CANCEL')}
          </Button>
          <LoadingButton
            color="primary"
            type="submit"
            loading={isLoading}
            disabled={isLoading}
          >
            {i18n.t('COMMON.SUBMIT')}
          </LoadingButton>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
