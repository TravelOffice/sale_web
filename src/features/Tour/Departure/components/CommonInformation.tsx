import React, { useState } from 'react';
import {
  Col, FormFeedback, Input, InputGroup, InputGroupText, Label, Row,
} from 'reactstrap';
import Flatpickr from 'react-flatpickr';
import FormItemSelect from '@components/Form/FormItemSelect';
import i18n from '@config/i18n';
import { Controller } from 'react-hook-form';
import TourType from '@domain/entities/tour/TourType';
import TourCategory from '@domain/entities/tour/TourCategory';
import { TourLocation, TourTemplate } from '@domain/entities/tour';

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

type CommonInformationProps = {
  control: any;
  errors: any;
  toursLocation: TourLocation[],
  toursTemplate: TourTemplate[],
  onToursTemplateChange: (value: string) => void
};
const CommonInformation: React.FC<CommonInformationProps> = ({
  control, errors, toursLocation, toursTemplate, onToursTemplateChange,
}) => {
  const [startDate, setStartDate] = useState<Date[]>([new Date()]);

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
        <Col md={6}>
          <div className="mb-1">
            <Label className="form-label" for="startDate">
              {i18n.t('DEPARTURE_TOUR.DEPARTURE_DATE')}
              {' '}
              <span className="text-danger">{' *'}</span>
            </Label>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <Flatpickr
                  value={startDate}
                  options={{ dateFormat: 'Y-m-d' }}
                  id="date-time-picker"
                  className={`form-control ${errors.startDate && 'is-invalid'}`}
                  onChange={(date) => {
                    setStartDate(date);
                    field.onChange(date[0]?.toISOString()); // Update the form value
                  }}
                />
              )}
            />
            {errors.startDate && (
            <FormFeedback>{errors.startDate.message}</FormFeedback>
            )}
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
              placeholder={i18n.t('DEPARTURE_TOUR.SELECT_TOUR_TEMPLATE')}
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
        </Col>
        <Col md={6}>
          <div className="mb-1">
            <Label className="form-label" for="visitorCount">
              {i18n.t('DEPARTURE_TOUR.VISITOR_COUNT')}
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
            <div className="d-flex">
              <InputGroup>
                <InputGroupText>Starting Location</InputGroupText>
                <FormItemSelect
                  control={control}
                  name="startingLocation"
                  errors={errors}
                  selectClassName="flex-fill"
                  options={toursLocation.map((template) => ({
                    label: template.name,
                    value: template.code,
                  }))}
                />
              </InputGroup>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="mb-1">
            <Label className="form-label">
              {i18n.t('TOUR_TEMPLATE.ENDING_LOCATION')}
              {' '}
              <span className="text-danger">{' *'}</span>
            </Label>
            <div className="d-flex">
              <InputGroup>
                <InputGroupText>Ending Location</InputGroupText>
                <FormItemSelect
                  control={control}
                  name="endingLocation"
                  errors={errors}
                  selectClassName="flex-fill"
                  options={toursLocation.map((template) => ({
                    label: template.name,
                    value: template.code,
                  }))}
                />
              </InputGroup>
            </div>
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
      <Row>
        <Col>
          <div className="mb-1 form-check form-switch">
            <Controller
              name="isOpen"
              control={control}
              render={({ field }) => (
                <Input {...field} type="switch" id="isOpen" value={field.value ? 'true' : 'false'} invalid={!!errors.isOpen} />
              )}
            />
            <Label className="form-check-label" for="isOpen">
              {i18n.t('DEPARTURE_TOUR.OPEN_STATUS')}
            </Label>
            {errors.status && <FormFeedback>{errors.status.message}</FormFeedback>}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default CommonInformation;
