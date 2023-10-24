import React, { useMemo } from 'react';
import { Col, Label, Row } from 'reactstrap';
import FormItemSelect from '@components/Form/FormItemSelect';
import i18n from '@config/i18n';
import { Control, FieldErrors } from 'react-hook-form';
import TourType from '@domain/entities/tour/TourType';
import {
  CreateDepartureTourFormData,
  CreateTourLocationFormData,
  TourLocation,
  TourTemplate,
  UpdateTourTemplateFormData,
} from '@domain/entities/tour';
import FormItemInput from '@components/Form/FormItemInput';
import FormItemDatePicker from '@components/Form/FormItemDatePicker';
import FormItemInputGroup from '@components/Form/FormItemInputGroup';
import TourOperationStatus from '@domain/entities/tour/TourOperationstatus';
import TourCategory from '@domain/entities/tour/TourCategory';
import FormItemCreatableSelect from '@components/Form/FormItemCreatableSelect';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { tourLocationPresenter, tourPresenter } from '@adapter/presenters';

const tourTypeOptions = [
  { label: i18n.t(`DEPARTURE_TOUR.${TourType.INLAND}`), value: TourType.INLAND },
  { label: i18n.t(`DEPARTURE_TOUR.${TourType.INBOUND}`), value: TourType.INBOUND },
  { label: i18n.t(`DEPARTURE_TOUR.${TourType.OUTBOUND}`), value: TourType.OUTBOUND },
];

const tourCategoryOptions = [
  { label: i18n.t(`DEPARTURE_TOUR.${TourCategory.GROUP_TOUR}`), value: TourCategory.GROUP_TOUR },
  { label: i18n.t(`DEPARTURE_TOUR.${TourCategory.INDIVIDUAL_TOUR}`), value: TourCategory.INDIVIDUAL_TOUR },
  { label: i18n.t(`DEPARTURE_TOUR.${TourCategory.SHARED_TOUR}`), value: TourCategory.SHARED_TOUR },
];

const tourOperationStatusOptions = [
  { label: i18n.t('TOURS_OPERATION.WAITING_FOR_OPERATION'), value: TourOperationStatus.WAITING_FOR_OPERATION },
  { label: i18n.t('TOURS_OPERATION.PROCESSING'), value: TourOperationStatus.PROCESSING },
  { label: i18n.t('TOURS_OPERATION.TRANSFERRED'), value: TourOperationStatus.TRANSFERRED },
  { label: i18n.t('TOURS_OPERATION.COMPLETED'), value: TourOperationStatus.COMPLETED },
];

type CommonInformationProps = {
  control: Control<CreateDepartureTourFormData>;
  errors: FieldErrors<CreateDepartureTourFormData>;
  getValues: () => UpdateTourTemplateFormData;
  reset: (values: UpdateTourTemplateFormData) => void;
  toursTemplate: TourTemplate[],
  isDisabled?: boolean,
  onToursTemplateChange?: (value: string) => void
};
const CommonInformation: React.FC<CommonInformationProps> = ({
  control,
  errors,
  getValues,
  reset,
  toursTemplate,
  isDisabled,
  onToursTemplateChange,
}) => {
  const queryClient = useQueryClient();
  // Fetch location data
  const { data: toursLocationData } = useQuery(['tourLocations'], async () => tourPresenter.getAllToursLocation());
  const toursLocation = useMemo(() => toursLocationData || [], [toursLocationData]);

  const {
    mutateAsync: CreateTourLocationMutate,
    isLoading: isCreateLocationLoading,
  } = useMutation({
    mutationFn: (formData: CreateTourLocationFormData) => tourLocationPresenter.create(formData),
    onSuccess: (newTourLocation) => {
      queryClient.setQueryData(['tourLocations'], (currentTourLocations: TourLocation[] | undefined) => {
        if (!currentTourLocations) return [];
        return currentTourLocations.concat(newTourLocation);
      });
    },
  });
  return (
    <>
      <div className="divider divider-start divider-primary">
        <div className="divider-text text-primary fw-bolder">{i18n.t('DEPARTURE_TOUR.DEPARTURE_TOUR')}</div>
      </div>
      <div className="mb-1">
        <Label className="form-label">
          {i18n.t('DEPARTURE_TOUR.TOUR_TEMPLATE')}
          {' '}
          <span className="text-danger">{' *'}</span>
        </Label>
        <FormItemSelect
          control={control}
          name="tourTemplateCode"
          errors={errors}
          options={toursTemplate.map((template) => ({
            label: template.name,
            value: template.code,
          }))}
          placeholder={i18n.t('DEPARTURE_TOUR.SELECT_TOUR_TEMPLATE')}
          disabled={isDisabled}
          onSelected={onToursTemplateChange}
        />
      </div>
      <Row>
        <Col md={6}>
          <div className="mb-1">
            <Label className="form-label" for="tourName">
              {i18n.t('DEPARTURE_TOUR.NAME')}
              {' '}
              <span className="text-danger">{' *'}</span>
            </Label>
            <FormItemInput control={control} name="name" errors={errors} />
          </div>
        </Col>
        <Col md={6}>
          <div className="mb-1">
            <Label className="form-label" for="startDate">
              {i18n.t('DEPARTURE_TOUR.DEPARTURE_DATE')}
              {' '}
              <span className="text-danger">{' *'}</span>
            </Label>
            <FormItemDatePicker control={control} name="startDate" errors={errors} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className="mb-1">
            <Label className="form-label" for="type">
              {i18n.t('DEPARTURE_TOUR.TOUR_CATEGORY')}
              {' '}
              <span className="text-danger">{' *'}</span>
            </Label>
            <FormItemSelect
              control={control}
              name="category"
              errors={errors}
              options={tourCategoryOptions}
              placeholder={i18n.t('DEPARTURE_TOUR.TOUR_CATEGORY')}
            />
          </div>
          <div className="mb-1">
            <Label className="form-label" for="type">
              {i18n.t('TOUR_TEMPLATE.TYPE')}
              {' '}
              <span className="text-danger">{' *'}</span>
            </Label>
            <FormItemSelect
              control={control}
              name="type"
              errors={errors}
              options={tourTypeOptions}
              placeholder="Select Tour Type"
            />
          </div>
          {
            isDisabled && (
              <div className="mb-1">
                <Label className="form-label" for="operationStatus">
                  {i18n.t('TOURS_OPERATION.FILTER.OPERATION_STATUS')}
                  {' '}
                  <span className="text-danger">{' *'}</span>
                </Label>
                <FormItemSelect
                  control={control}
                  name="operationStatus"
                  errors={errors}
                  options={tourOperationStatusOptions}
                  placeholder={i18n.t('TOURS_OPERATION.FILTER.OPERATION_STATUS')}
                />
              </div>
            )
          }
        </Col>
        <Col md={6}>
          <div className="mb-1">
            <Label className="form-label" for="visitorCount">
              {i18n.t('DEPARTURE_TOUR.VISITOR_COUNT')}
              {' '}
              <span className="text-danger">{' *'}</span>
            </Label>
            <FormItemInput control={control} name="visitorCount" errors={errors} inputType="number" />
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className="mb-1">
            <Label className="form-label">
              {i18n.t('TOUR_TEMPLATE.STARTING_LOCATION')}
              {' '}
              <span className="text-danger">{' *'}</span>
            </Label>
            <FormItemCreatableSelect
              name="startingLocation"
              options={
                toursLocation.map((location) => ({
                  label: location.name,
                  value: location.code,
                }))
              }
              control={control}
              errors={errors}
              isLoading={isCreateLocationLoading}
              isDisabled={isCreateLocationLoading}
              onCreateOption={(inputValue) => CreateTourLocationMutate({
                name: inputValue,
                status: 'ENABLE',
              }).then((data) => reset({
                ...getValues(),
                startingLocation: data.code,
              }))}
            />
          </div>
        </Col>
        <Col md={6}>
          <div className="mb-1">
            <Label className="form-label">
              {i18n.t('TOUR_TEMPLATE.ENDING_LOCATION')}
              {' '}
              <span className="text-danger">{' *'}</span>
            </Label>
            <FormItemCreatableSelect
              name="endingLocation"
              options={
                toursLocation.map((location) => ({
                  label: location.name,
                  value: location.code,
                }))
              }
              control={control}
              errors={errors}
              isLoading={isCreateLocationLoading}
              isDisabled={isCreateLocationLoading}
              onCreateOption={(inputValue) => CreateTourLocationMutate({
                name: inputValue,
                status: 'ENABLE',
              }).then((data) => reset({
                ...getValues(),
                endingLocation: data.code,
              }))}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className="mb-1">
            <Label className="form-label">
              {i18n.t('TOUR_TEMPLATE.DURATION')}
              {' '}
              <span className="text-danger">{' *'}</span>
            </Label>
            <div className="d-flex">
              <div className="w-50 me-1">
                <FormItemInputGroup
                  label={i18n.t('TOUR_TEMPLATE.DURATION_IN_DAYS')}
                  control={control}
                  name="durationInDays"
                  errors={errors}
                  inputType="number"
                  inputClassName="text-end"
                />
              </div>
              <div className="w-50">
                <FormItemInputGroup
                  label={i18n.t('TOUR_TEMPLATE.DURATION_IN_NIGHTS')}
                  control={control}
                  name="durationInNights"
                  errors={errors}
                  inputType="number"
                  inputClassName="text-end"
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

CommonInformation.defaultProps = {
  isDisabled: false,
  onToursTemplateChange: () => {
  },
};

export default CommonInformation;
