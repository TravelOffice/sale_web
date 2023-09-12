import {
  Button,
  Col,
  Form,
  FormFeedback,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
} from 'reactstrap';
import React, { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import i18n from '@config/i18n';
import FormItemInput from '@components/Form/FormItemInput';
import FormItemSelect from '@components/Form/FormItemSelect';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Estimation, UpdateEstimationFormData } from '@domain/entities/tour/Estimation';
import { tourPresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';
import { useParams } from 'react-router-dom';
import { convertCurrencyToNumber } from '@utils/CurrencyUtils';
import CurrencyInput from 'react-currency-input-field';

interface EstimationEditPageProps {
  updateFormModal: boolean,
  toggleUpdateFormModal: () => void,
  updatingEstimation: Estimation,
}

const payerOptions = [
  { label: i18n.t('TOURS_OPERATION.ESTIMATION.ORGANIZATION'), value: 'ORGANIZATION' },
  { label: i18n.t('TOURS_OPERATION.ESTIMATION.TOUR_GUIDE'), value: 'TOUR_GUIDE' },
];

const schema = yup.object().shape({
  name: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOURS_OPERATION.ESTIMATION.SERVICE_NAME') })),
  estimatedPrice: yup
    .number()
    .integer(i18n.t('MESSAGE.REQUIRED_INTEGER_MESSAGE', { field: i18n.t('TOURS_OPERATION.ESTIMATION.PRICE') }))
    .min(1000, i18n.t('MESSAGE.MIN_VALUE_MESSAGE', {
      field: i18n.t('TOURS_OPERATION.ESTIMATION.PRICE'),
      value: 1000,
    })),
  estimatedQuantity: yup
    .number()
    .integer(i18n.t('MESSAGE.REQUIRED_INTEGER_MESSAGE', { field: i18n.t('TOURS_OPERATION.ESTIMATION.QUANTITY') }))
    .min(1, i18n.t('MESSAGE.MIN_VALUE_MESSAGE', {
      field: i18n.t('TOURS_OPERATION.ESTIMATION.QUANTITY'),
      value: 1,
    })),
  vatStatus: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOURS_OPERATION.ESTIMATION.VAT_STATUS') })),
  vat: yup
    .number()
    .integer(i18n.t('MESSAGE.REQUIRED_INTEGER_MESSAGE', { field: i18n.t('TOURS_OPERATION.ESTIMATION.VAT') }))
    .min(0, i18n.t('MESSAGE.MIN_VALUE_MESSAGE', {
      field: i18n.t('TOURS_OPERATION.ESTIMATION.VAT'),
      value: 0,
    })),
});

export interface EditEstimationParams {
  tourId: string,
}

const EstimationUpdatePage = (props: EstimationEditPageProps) => {
  const { tourId } = useParams<EditEstimationParams>();

  const { updateFormModal, toggleUpdateFormModal, updatingEstimation } = props;

  const queryClient = useQueryClient();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UpdateEstimationFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...updatingEstimation,
    },
  });

  useEffect(() => {
    if (updatingEstimation) reset(updatingEstimation);
  }, [updatingEstimation]);

  const handleReset = () => {
    toggleUpdateFormModal();
    reset();
  };
  const { mutate, isLoading } = useMutation({
    mutationKey: ['updateEstimation'],
    mutationFn: async (
      formData: UpdateEstimationFormData,
    ) => tourPresenter.updateEstimation(tourId, updatingEstimation.code, formData),
    onSuccess: (updatedEstimation: Estimation) => {
      toasty.show({
        title: i18n.t('COMMON.SUCCESS'),
        type: 'success',
        message: i18n.t('TOURS_OPERATION.ESTIMATION.UPDATE_ESTIMATION_SUCCESSFULLY'),
      });
      queryClient.setQueryData(['estimations', tourId], (allEstimations: Estimation[] | undefined) => allEstimations?.map((estimation) => {
        if (estimation.code === updatingEstimation.code) {
          return {
            ...estimation,
            ...updatedEstimation,
          };
        }
        return estimation;
      }));
      toggleUpdateFormModal();
      reset();
    },
    onError: (error) => {
      toasty.show({
        title: i18n.t('COMMON.ERROR'),
        type: 'error',
        message: `${error}`,
      });
    },
  });

  const onSubmit = (data: UpdateEstimationFormData) => {
    mutate(data);
  };

  return (
    <div className="demo-inline-spacing">
      <div>
        <Modal isOpen={updateFormModal} toggle={() => toggleUpdateFormModal()} className="modal-dialog-centered">
          <Form onSubmit={handleSubmit(onSubmit)}>

            <ModalHeader toggle={() => toggleUpdateFormModal()}>
              {i18n.t('TOURS_OPERATION.ESTIMATION.EDIT')}
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col>
                  <div className="mb-2">
                    <Label className="form-label" for="name">
                      {i18n.t('TOURS_OPERATION.ESTIMATION.SERVICE_NAME')}
                      {' '}
                      <span className="text-danger">{' *'}</span>
                    </Label>
                    <FormItemInput
                      control={control}
                      errors={errors}
                      name="name"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <div className="mb-2">
                    <Label className="form-label" for="estimatedPrice">
                      {i18n.t('TOURS_OPERATION.ESTIMATION.PRICE')}
                      {' '}
                      <span className="text-danger">{' *'}</span>
                    </Label>
                    <Controller
                      name="estimatedPrice"
                      control={control}
                      render={({ field: { onChange, ...rest } }) => (
                        <CurrencyInput
                          {...rest}
                          className={`form-control text-end ${errors.estimatedPrice && 'is-invalid'}`}
                          onValueChange={(newValue) => {
                            const numericValue = convertCurrencyToNumber(newValue);
                            onChange(numericValue);
                          }}
                          decimalSeparator="."
                          groupSeparator=","
                        />
                      )}
                    />
                    {errors.estimatedPrice
                      && <FormFeedback>{errors.estimatedPrice.message}</FormFeedback>}
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-2">
                    <Label className="form-label" for="estimatedQuantity">
                      {i18n.t('TOURS_OPERATION.ESTIMATION.QUANTITY')}
                      {' '}
                      <span className="text-danger">{' *'}</span>
                    </Label>
                    <FormItemInput
                      control={control}
                      errors={errors}
                      name="estimatedQuantity"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <div className="mb-2">
                    <Label className="form-label" for="vat">
                      {i18n.t('TOURS_OPERATION.ESTIMATION.VAT')}
                      {' '}
                      <span className="text-danger">{' *'}</span>
                    </Label>
                    <FormItemInput
                      control={control}
                      errors={errors}
                      name="vat"
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-2">
                    <Label className="form-label" for="payer">
                      {i18n.t('TOURS_OPERATION.ESTIMATION.PAYER')}
                      {' '}
                      <span className="text-danger">{' *'}</span>
                    </Label>
                    <FormItemSelect
                      control={control}
                      name="payer"
                      options={payerOptions}
                      isClearable
                      errors={errors}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <div className="mb-2">
                  <Label className="form-label" for="note">
                    {i18n.t('COMMON.NOTE')}
                  </Label>
                  <FormItemInput
                    control={control}
                    errors={errors}
                    name="note"
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
      </div>
    </div>
  );
};

export default EstimationUpdatePage;
