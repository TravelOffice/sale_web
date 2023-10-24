import React, { useMemo } from 'react';
import {
  Col, FormFeedback, Input, InputGroup, InputGroupText, Label, Row,
} from 'reactstrap';
import FormItemSelect from '@components/Form/FormItemSelect';
import i18n from '@config/i18n';
import { Controller } from 'react-hook-form';
import TourType from '@domain/entities/tour/TourType';
import { tourLocationPresenter, tourPresenter } from '@adapter/presenters';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateTourLocationFormData, TourLocation, UpdateTourTemplateFormData } from '@domain/entities/tour';
import FormItemCreatableSelect from '@components/Form/FormItemCreatableSelect';

const tourTypeOptions = [
  { label: i18n.t(`TOUR_TEMPLATE.${TourType.INLAND}`), value: TourType.INLAND },
  { label: i18n.t(`TOUR_TEMPLATE.${TourType.INBOUND}`), value: TourType.INBOUND },
  { label: i18n.t(`TOUR_TEMPLATE.${TourType.OUTBOUND}`), value: TourType.OUTBOUND },
];

type CommonInformationProps = {
  control: any;
  getValues: () => UpdateTourTemplateFormData;
  reset: (values: UpdateTourTemplateFormData) => void;
  errors: any;
};
const CommonInformation: React.FC<CommonInformationProps> = ({
  control, errors, getValues, reset,
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
        <div className="divider-text text-primary fw-bolder">{i18n.t('TOUR_TEMPLATE.TOUR_TEMPLATE_INFO')}</div>
      </div>
      <Row>
        <Col md={12}>
          <div className="mb-1">
            <Label className="form-label" for="tourName">
              {i18n.t('TOUR_TEMPLATE.NAME')}
              {' '}
              <span className="text-danger">{' *'}</span>
            </Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input {...field} id="tourName" invalid={!!errors.name} />
              )}
            />
            {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
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
              placeholder={i18n.t('TOUR_TEMPLATE.SELECT_TOUR_TYPE')}
            />
          </div>
        </Col>
        <Col md={6}>
          <div className="mb-1">
            <Label className="form-label" for="visitorCount">
              {i18n.t('TOUR_TEMPLATE.VISITOR_COUNT')}
              {' '}
              <span className="text-danger">{' *'}</span>
            </Label>
            <Controller
              name="visitorCount"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  id="visitorCount"
                  className={`${errors.visitorCount && 'is-invalid'}`}
                />
              )}
            />
            {errors.visitorCount
              && <FormFeedback>{errors.visitorCount.message}</FormFeedback>}
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
                <Controller
                  name="durationInDays"
                  control={control}
                  render={({ field }) => (
                    <InputGroup>
                      <InputGroupText>{i18n.t('TOUR_TEMPLATE.DURATION_IN_DAYS')}</InputGroupText>
                      <Input
                        {...field}
                        type="number"
                        id="durationInDays"
                        className={`text-end ${errors.durationInDays && 'is-invalid'}`}
                      />
                      {errors.durationInDays
                        && <FormFeedback>{errors.durationInDays.message}</FormFeedback>}
                    </InputGroup>
                  )}
                />
              </div>
              <div className="w-50">
                <Controller
                  name="durationInNights"
                  control={control}
                  render={({ field }) => (
                    <InputGroup>
                      <InputGroupText>{i18n.t('TOUR_TEMPLATE.DURATION_IN_NIGHTS')}</InputGroupText>
                      <Input
                        {...field}
                        type="number"
                        id="durationInNights"
                        className={`text-end ${errors.durationInNights && 'is-invalid'}`}
                      />
                      {errors.durationInNights
                        && <FormFeedback>{errors.durationInNights.message}</FormFeedback>}
                    </InputGroup>
                  )}
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default CommonInformation;
