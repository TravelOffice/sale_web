import React, { useCallback } from 'react';
import {
  Button,
  Form, Label, Modal, ModalBody, ModalFooter, ModalHeader, ModalProps,
} from 'reactstrap';
import { useForm } from 'react-hook-form';
import i18n from 'i18next';
import FormItemSelect from '@components/Form/FormItemSelect';
import { useAllOperatorOptions } from '@hooks/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tourPresenter } from '@adapter/presenters';
import LoadingButton from '@components/LoadingButton/LoadingButton';
import { DepartureTour } from '@domain/entities/tour';
import TourOperationStatus from '@domain/entities/tour/TourOperationstatus';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toasty from '@components/Toasty/Toasty';

export interface SelectTourOperatorModalProps extends ModalProps {
  tourId: string,
  toggle: () => void,
}

interface SelectOperatorFormData {
  operatorId: string,
}

const schema = yup.object().shape({
  operatorId: yup.string().required(),
});

export default function SelectTourOperatorModal(props: SelectTourOperatorModalProps) {
  const { tourId, toggle, ...modalProps } = props;
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SelectOperatorFormData>({ resolver: yupResolver(schema) });
  const operatorOptions = useAllOperatorOptions();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationKey: ['changeTourOperator'],
    mutationFn: (
      formData: SelectOperatorFormData,
    ) => tourPresenter.assignTourOperator(tourId, formData.operatorId),
    onSuccess: (_, formData) => {
      toggle();
      queryClient.setQueryData(['departureTours', tourId], (tour: DepartureTour | undefined) => {
        if (tour) {
          return {
            ...tour,
            operatorId: formData.operatorId,
            operationStatus: TourOperationStatus.PROCESSING,
          };
        }
        return tour;
      });
      toasty.show({
        type: 'success',
        title: i18n.t('COMMON.SUCCESS'),
        message: i18n.t('TOURS_OPERATION.CHANGE_OPERATOR_SUCCESSFULLY'),
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

  const onSubmit = useCallback((data: SelectOperatorFormData) => {
    mutate(data);
  }, []);

  return (
    <Modal {...modalProps} toggle={toggle}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={toggle}>{i18n.t('TOURS_OPERATION.SELECT_TOUR_OPERATOR')}</ModalHeader>
        <ModalBody>
          <Label>
            {i18n.t('TOURS_OPERATION.OPERATOR')}
            {' '}
            <span className="text-danger">*</span>
          </Label>
          <FormItemSelect
            options={operatorOptions}
            control={control}
            name="operatorId"
            errors={errors}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline disabled={isLoading}>
            {i18n.t('COMMON.CANCEL')}
          </Button>
          <LoadingButton color="primary" type="submit" loading={isLoading} disabled={isLoading}>
            {i18n.t('COMMON.SAVE_CHANGES')}
          </LoadingButton>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
