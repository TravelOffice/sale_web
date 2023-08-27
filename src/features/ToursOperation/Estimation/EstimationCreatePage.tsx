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
import React, { useMemo } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import i18n from '@config/i18n';
import FormItemInput from '@components/Form/FormItemInput';
import FormItemSelect from '@components/Form/FormItemSelect';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateEstimationFormData, Estimation } from '@domain/entities/tour/Estimation';
import { tourPresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';
import { useParams } from 'react-router-dom';
import { SupplierServiceType } from '@domain/entities/supplier';
import { convertCurrencyToNumber } from '@utils/CurrencyUtils';
import CurrencyInput from 'react-currency-input-field';
import { DailyKey, TourPlan, UpdateTourPlanActivityFormData } from '@domain/entities/tour/TourPlan';
import { useSupplier } from '@hooks/supplier';

interface EstimationCreatePageProps {
  createFormModal: boolean,
  toggleCreateFormModal: () => void,
  tourPlanDay?: string;
  currentTourPlan?: TourPlan;
  activityId?: string;
}

const payerOptions = [
  { label: i18n.t('TOURS_OPERATION.ESTIMATION.ORGANIZATION'), value: 'ORGANIZATION' },
  { label: i18n.t('TOURS_OPERATION.ESTIMATION.TOUR_GUIDE'), value: 'TOUR_GUIDE' },
];

const serviceTypeOptions = [
  { label: i18n.t('TOURS_OPERATION.ESTIMATION.ACCOMMODATION'), value: 'ACCOMMODATION' },
  { label: i18n.t('TOURS_OPERATION.ESTIMATION.RESTAURANT'), value: 'RESTAURANT' },
  { label: i18n.t('TOURS_OPERATION.ESTIMATION.VEHICLE'), value: 'VEHICLE' },
  { label: i18n.t('TOURS_OPERATION.ESTIMATION.TOUR_GUIDE'), value: 'TOUR_GUIDE' },
  { label: i18n.t('TOURS_OPERATION.ESTIMATION.TEAM_BUILDING'), value: 'TEAM_BUILDING' },
  { label: i18n.t('TOURS_OPERATION.ESTIMATION.SIGHT_SEEING_TICKET'), value: 'SIGHT_SEEING_TICKET' },
  { label: i18n.t('TOURS_OPERATION.ESTIMATION.FLIGHT_TICKET'), value: 'FLIGHT_TICKET' },
  { label: i18n.t('TOURS_OPERATION.ESTIMATION.OTHER'), value: 'OTHER' },
];

const vatOptions = [
  { label: i18n.t('TOURS_OPERATION.ESTIMATION.VAT_INCLUDED'), value: 'VAT_INCLUDED' },
  { label: i18n.t('TOURS_OPERATION.ESTIMATION.VAT_NONE'), value: 'VAT_NONE' },
  { label: i18n.t('TOURS_OPERATION.ESTIMATION.NO_INVOICE'), value: 'NO_INVOICE' },
];

const schema = yup.object().shape({
  serviceType: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOURS_OPERATION.ESTIMATION.SERVICE_TYPE') })),
  supplierId: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('TOURS_OPERATION.ESTIMATION.SUPPLIER') })),
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

export interface CreateEstimationParams {
  tourId: string,
}

const EstimationCreatePage = (props: EstimationCreatePageProps) => {
  const { tourId } = useParams<CreateEstimationParams>();

  const {
    createFormModal, toggleCreateFormModal, tourPlanDay = '', currentTourPlan = undefined,
    activityId = '',
  } = props;

  const {
    data: allSuppliers,
  } = useSupplier();

  const queryClient = useQueryClient();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateEstimationFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      serviceType: undefined,
      supplierId: undefined,
      estimatedPrice: 1000,
      estimatedQuantity: 1,
      vatStatus: undefined,
      vat: 0,
    },
  });

  const selectedServiceType = useWatch({
    control,
    name: 'serviceType',
  });

  const selectedVatType = useWatch({
    control,
    name: 'vatStatus',
  });

  const filteredSuppliers = useMemo(() => {
    if (!allSuppliers) return [];
    if (!selectedServiceType) return allSuppliers;
    return allSuppliers.filter(
      (supplier) => supplier.services.includes(selectedServiceType as SupplierServiceType),
    );
  }, [allSuppliers, selectedServiceType]);

  const supplierOptions = useMemo(
    () => filteredSuppliers?.map((supplier) => ({
      label: supplier.name,
      value: supplier.code,
    })),
    [filteredSuppliers],
  );

  const handleReset = () => {
    toggleCreateFormModal();
    reset();
  };
  const { mutate, isLoading } = useMutation({
    mutationKey: ['createEstimation'],
    mutationFn: async (
      formData: CreateEstimationFormData,
    ) => tourPresenter.createEstimation(tourId, formData),
    onSuccess: (newEstimation: Estimation) => {
      // If create estimation from tour plan page then add estimationId to activity
      if (tourPlanDay && currentTourPlan && activityId) {
        const activity = currentTourPlan[tourPlanDay as DailyKey].find(
          (item) => item.id === activityId,
        );
        // Deep copy activity of currentTourPlan
        const updatedActivity = JSON.parse(JSON.stringify(
          activity,
        ));
        // if activity has estimationId then push new estimationId to it
        if (updatedActivity.estimationId) {
          updatedActivity.estimationId.push(newEstimation.code);
        } else {
          // if activity has no estimationId then create new estimationId array
          updatedActivity.estimationId = [newEstimation.code];
        }
        updatedActivity.day = tourPlanDay;
        tourPresenter.updateTourPlanActivity(
          tourId,
          currentTourPlan,
          updatedActivity as UpdateTourPlanActivityFormData,
        );
      }
      toasty.show({
        title: i18n.t('COMMON.SUCCESS'),
        type: 'success',
        message: i18n.t('TOURS_OPERATION.ESTIMATION.CREATE_ESTIMATION_SUCCESSFULLY'),
      });
      queryClient.setQueryData(['estimations', tourId], (allEstimations: Estimation[] | undefined) => allEstimations?.concat(newEstimation));
      toggleCreateFormModal();
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

  const onSubmit = (data: CreateEstimationFormData) => {
    mutate({
      ...data,
      tourId,
    });
  };

  const onClosed = () => {
    reset();
  };

  return (
    <div className="demo-inline-spacing">
      <div>
        <Modal
          isOpen={createFormModal}
          toggle={() => toggleCreateFormModal()}
          className="modal-dialog-centered"
          onClosed={onClosed}
        >
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader toggle={() => toggleCreateFormModal()}>
              {i18n.t('TOURS_OPERATION.ESTIMATION.CREATE')}
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col md={6}>
                  <div className="mb-2">
                    <Label className="form-label" for="serviceType">
                      {i18n.t('TOURS_OPERATION.ESTIMATION.SERVICE_TYPE')}
                      {' '}
                      <span className="text-danger">{' *'}</span>
                    </Label>
                    <FormItemSelect
                      control={control}
                      name="serviceType"
                      options={serviceTypeOptions}
                      isClearable
                      errors={errors}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-2">
                    <Label className="form-label" for="supplierId">
                      {i18n.t('TOURS_OPERATION.ESTIMATION.SUPPLIER')}
                      {' '}
                      <span className="text-danger">{' *'}</span>
                    </Label>
                    <FormItemSelect
                      control={control}
                      name="supplierId"
                      options={supplierOptions}
                      isClearable
                      errors={errors}
                    />
                  </div>
                </Col>
              </Row>
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
                    <Label className="form-label" for="vatStatus">
                      {i18n.t('TOURS_OPERATION.ESTIMATION.VAT_STATUS')}
                      {' '}
                      <span className="text-danger">{' *'}</span>
                    </Label>
                    <FormItemSelect
                      control={control}
                      name="vatStatus"
                      options={vatOptions}
                      isClearable
                      errors={errors}
                    />
                  </div>
                </Col>
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
                      disabled={selectedVatType !== 'VAT_NONE'}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
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

export default EstimationCreatePage;
